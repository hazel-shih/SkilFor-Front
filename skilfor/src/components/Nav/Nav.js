import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Icons from "../Icon/Icons";
import LogoSrc from "../../img/logo/logo.png";
import { IconDiv } from "../Icon/IconDiv";
import { MEDIA_QUERY_SM, MEDIA_QUERY_MD } from "../constants/breakpoints";
import BurgerMenu from "../BurgerMenu";
import { AuthContext, AuthLoadingContext } from "../../contexts";
import { setAuthToken } from "../../utils";

const Container = styled.div`
  border-top: 20px solid ${(props) => props.theme.colors.green_dark};
  background: white;
  padding: 10px 30px;
  margin: 0 auto;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 100%;
  ${MEDIA_QUERY_SM} {
    max-width: 768px;
    width: 100%;
    padding: 10px 20px;
  }
`;

const Logo = styled.img`
  height: 60px;
  width: 60px;
  cursor: pointer;
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavbarList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  list-style: none;
  height: 50px;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.grey_dark};
  opacity: 1;
  font-weight: bold;
  cursor: pointer;
  margin: 8px;
  padding: 6px;
  &:hover {
    opacity: 0.7;
  }
  ${MEDIA_QUERY_MD} {
    padding: 2px;
    margin: 4px;
  }
  ${MEDIA_QUERY_SM} {
    margin: 1px;
  }
`;

function Nav() {
  const { user, setUser } = useContext(AuthContext);
  const { isLoading } = useContext(AuthLoadingContext);
  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
  };
  return (
    <Container>
      <Navbar>
        <div>
          <Logo src={LogoSrc} />
        </div>
        <div>
          {!isLoading && (
            <NavbarList>
              <NavItem to="./filter">找老師</NavItem>

              {!user && (
                <>
                  <NavItem to="./login">登入</NavItem>
                  <NavItem to="./register">註冊</NavItem>
                </>
              )}
              {user && (
                <NavItem to="./" onClick={handleLogout}>
                  登出
                </NavItem>
              )}
              <NavItem to="./question_and_answer">
                <IconDiv>
                  <Icons.NavIcons.Question />
                </IconDiv>
              </NavItem>
              {user && <BurgerMenu />}
            </NavbarList>
          )}
        </div>
      </Navbar>
    </Container>
  );
}

export default Nav;
