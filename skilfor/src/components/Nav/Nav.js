import styled from "styled-components";
import { Link } from "react-router-dom";
import Icons from "../Icon/Icons";
import LogoSrc from "../../img/logo/logo.png";
import { IconDiv } from "../Icon/IconDiv";
import { MEDIA_QUERY_SM } from "../constants/breakpoints";
import BurgerMenu from "../BurgerMenu";

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
  list-style: none;
  height: 50px;

  & > li {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 8px;
    padding: 6px;
    cursor: pointer;
    ${MEDIA_QUERY_SM} {
      padding: 2px;
      margin: 4px;
    }
  }
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.grey_dark};
  border-bottom: 3px solid transparent;
  opacity: 1;
  font-weight: bold;

  &:hover {
    opacity: 0.7;
  }
`;

function Nav() {
  return (
    <Container>
      <Navbar>
        <div>
          <Logo src={LogoSrc} />
        </div>
        <div>
          <NavbarList>
            <li>
              <NavItem to="./filter">找老師</NavItem>
            </li>
            <li>
              <NavItem to="./login">登入</NavItem>
            </li>
            <li>
              <NavItem to="./register">註冊</NavItem>
            </li>
            <li>
              <NavItem to="./question_and_answer">
                <IconDiv>
                  <Icons.NavIcons.Question />
                </IconDiv>
              </NavItem>
            </li>
            <li>
              <BurgerMenu />
            </li>
          </NavbarList>
        </div>
      </Navbar>
    </Container>
  );
}

export default Nav;
