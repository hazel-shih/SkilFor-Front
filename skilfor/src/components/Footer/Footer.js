import styled from "styled-components";

import { ReactComponent as TwitterIcon } from "../img/icons/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "../img/icons/youtube-icon.svg";
import { ReactComponent as TelegramIcon } from "../img/icons/telegram-icon.svg";
import { ReactComponent as InstagramIcon } from "../img/icons/instagram-icon.svg";
import { ReactComponent as FacebookIcon } from "../img/icons/facebook-icon.svg";
import { IconBtn } from "../IconBtn/IconBtn";

const Container = styled.div`
  border-bottom: 20px solid ${(props) => props.theme.colors.green_dark};
  padding: 30px;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0px;
  background-color: ${(props) => props.theme.colors.grey_dark};
  color: ${(props) => props.theme.colors.white_pure};
  text-align: center;
`;

const FooterList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  height: 50px;

  li {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 8px;
    padding: 6px;
    cursor: pointer;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.colors.white_pure};
      border-bottom: 3px solid transparent;
      opacity: 1;
      font-weight: bold;

      :hover {
        opacity: 0.7;
      }
    }
  }
`;

function Footer() {
  return (
    <Container>
      <div>
        <FooterList>
          <li>
            <a href="./twitter">
              <IconBtn>
                <TwitterIcon />
              </IconBtn>
            </a>
          </li>
          <li>
            <a href="./youtube">
              <IconBtn>
                <YoutubeIcon />
              </IconBtn>
            </a>
          </li>
          <li>
            <a href="./telegram">
              <IconBtn>
                <TelegramIcon />
              </IconBtn>
            </a>
          </li>
          <li>
            <a href="./instagram">
              <IconBtn>
                <InstagramIcon />
              </IconBtn>
            </a>
          </li>
          <li>
            <a href="./facebook">
              <IconBtn>
                <FacebookIcon />
              </IconBtn>
            </a>
          </li>
        </FooterList>
      </div>
      <p>Copyright © 2021 SkilFor All Rights Reserved.</p>
    </Container>
  );
}

export default Footer;
