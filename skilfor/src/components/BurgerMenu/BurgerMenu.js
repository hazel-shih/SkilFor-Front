import styled from "styled-components";
import Icons from "../Icon/Icons";
import { IconDiv } from "../Icon/IconDiv";
import { useState } from "react";
import student from "../../img/student.jpg";

const Burger = styled.div`
  position: relative;
  display: inline-block;
`;

const BurgerBtn = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const BurgerContent = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  right: 0;
  background-color: ${(props) => props.theme.colors.white_pure};
  min-width: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  color: white;

  & > a {
    background-color: ${(props) => props.theme.colors.orange};
    color: ${(props) => props.theme.colors.white_pure};
    border-radius: 40px;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    margin: 12px;
    text-align: center;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    font-size: 1.2rem;
    :hover {
      opacity: 0.8;
      font-weight: bold;
    }
  }
`;

// styles from TeacherManagePage
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvatarContainer = styled(ColumnContainer)`
  height: 200px;
  background: ${(props) => props.theme.colors.green_dark};
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: white;
  background-image: url(${(props) => props.imgSrc});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const AvatarName = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-top: 12px;
`;

const AvatarStatus = styled.p`
  color: white;
  font-size: 0.8rem;
  border-radius: 40px;
  background-color: ${(props) => props.theme.colors.white_pure};
  color: ${(props) => props.theme.colors.grey_dark};
  padding: 0px 8px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
`;

function BurgerMenu() {
  const [burgerContent, setBurgerContent] = useState(false);

  const handleBurgerToggle = () => {
    burgerContent ? setBurgerContent(false) : setBurgerContent(true);
  };

  // 還沒研究出來handleBurgerBlur這邊怎麼做，我想要使用者點選burger上的東西時burger會顯示，但只要點選頁面上其他地方，burger會自動不見。e.currentTarget可以找到監聽的元素，但點擊頁面的其他地方e.target都是BurgerBtn這個元素，就算點Navbar也還是BurgerBtn這個元素，所以setBurgerContent一直是true。
  const handleBurgerBlur = (e) => {
    console.log(e.target);
    if (e.currentTarget.contains(e.target)) {
      console.log("should show burger");
      setBurgerContent(true);
    } else {
      console.log("should not show burger");
      setBurgerContent(false);
    }
  };

  return (
    <Burger onBlur={handleBurgerBlur}>
      <BurgerBtn onClick={handleBurgerToggle}>
        <IconDiv>
          <Icons.NavIcons.Burger />
        </IconDiv>
      </BurgerBtn>
      <BurgerContent show={burgerContent}>
        <AvatarContainer>
          <Avatar imgSrc={student} />
          <AvatarName>Ben</AvatarName>
          <AvatarStatus>上課點數：120</AvatarStatus>
        </AvatarContainer>
        <a href="./cart">購物車</a>
        <a href="./calendar">行事曆</a>
        <a href="./charge_points">儲值點數</a>
        <a href="./identity/manage">管理個人資料</a>
      </BurgerContent>
    </Burger>
  );
}

export default BurgerMenu;
