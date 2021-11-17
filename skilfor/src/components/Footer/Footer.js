import styled from "styled-components";
import { IconDiv } from "../Icon/IconDiv";
import Icons from "../Icon/Icons";
import { MEDIA_QUERY_SM } from "../constants/breakpoints";

const Container = styled.div`
  border-bottom: 20px solid ${(props) => props.theme.colors.green_dark};
  padding: 30px;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0px;
  background-color: ${(props) => props.theme.colors.grey_dark};
  color: ${(props) => props.theme.colors.white_pure};
  text-align: center;

  ${MEDIA_QUERY_SM} {
    font-size: 8px;
    min-width: 768px;
    width: 100%;
  }
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
              <IconDiv>
                <Icons.SocialMediaIcons.Twitter />
              </IconDiv>
            </a>
          </li>
          <li>
            <a href="./youtube">
              <IconDiv>
                <Icons.SocialMediaIcons.Youtube />
              </IconDiv>
            </a>
          </li>
          <li>
            <a href="./telegram">
              <IconDiv>
                <Icons.SocialMediaIcons.Telegram />
              </IconDiv>
            </a>
          </li>
          <li>
            <a href="./instagram">
              <IconDiv>
                <Icons.SocialMediaIcons.Instagram />
              </IconDiv>
            </a>
          </li>
          <li>
            <a href="./facebook">
              <IconDiv>
                <Icons.SocialMediaIcons.Facebook />
              </IconDiv>
            </a>
          </li>
        </FooterList>
      </div>
      <p>Copyright © {new Date().getFullYear()} SkilFor All Rights Reserved.</p>
    </Container>
  );
}

export default Footer;
