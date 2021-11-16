import styled from "styled-components";
import { ReactComponent as BurgerIcon } from "../img/icons/burger-icon.svg";
import { ReactComponent as QuestionIcon } from "../img/icons/question-icon.svg";
import LogoSrc from "../img/logo/logo.png";
import { IconBtn } from "../IconBtn/IconBtn";

const Container = styled.div`
  border-top: 20px solid ${(props) => props.theme.colors.green_dark};
  padding: 30px;
  margin: 0 auto;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  border-bottom: black 1px solid;
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

  & li {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 8px;
    padding: 6px;
    cursor: pointer;

    & a {
      text-decoration: none;
      color: ${(props) => props.theme.colors.grey_dark};
      border-bottom: 3px solid transparent;
      opacity: 1;
      font-weight: bold;

      &:hover {
        opacity: 0.7;
      }
    }
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
              <a href="./filter">找老師</a>
            </li>
            <li>
              <a href="./login">登入</a>
            </li>
            <li>
              <a href="./register">註冊</a>
            </li>
            <li>
              <a href="./question_and_answer">
                <IconBtn>
                  <QuestionIcon />
                </IconBtn>
              </a>
            </li>
            <li>
              <a href="burger_list_showup">
                <IconBtn>
                  <BurgerIcon />
                </IconBtn>
              </a>
            </li>
          </NavbarList>
        </div>
      </Navbar>
    </Container>
  );
}

export default Nav;
