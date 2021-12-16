import React, { useRef } from "react";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import { TeacherManageWrapper } from "../TeacherManagePage/TeacherManagePage";

const PointPageWrapper = styled(TeacherManageWrapper)``;
const PriceCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const PriceContainer = styled.div`
  position: relative;
  width: 250px;
  height: 300px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: ${(props) => props.theme.colors.grey_dark};
  margin-right: 50px;
  margin-top: 35px;
  padding: 20px 0 0 0;
  :hover {
    transform: translate(10px, -10px);
    transition: all 0.1s;
  }
`;
const PriceTitle = styled.h1`
  font-size: 1.4rem;
`;
const PriceBar = styled.div`
  width: 100%;
  height: 60px;
  color: white;
  background: ${(props) => props.theme.colors.orange};
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 2rem;
`;
const PriceIntro = styled.p``;
const ChooseButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%);
  width: fit-content;
  color: white;
  background: ${(props) => props.theme.colors.orange};
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  padding: 7px 20px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const PriceCard = ({ title, price, points, courseCount, handleClick }) => {
  return (
    <PriceContainer>
      <PriceTitle>{title}</PriceTitle>
      <PriceBar>${price}</PriceBar>
      <PriceIntro>{points} points</PriceIntro>
      <PriceIntro>此方案大概可以上 {courseCount} 堂課</PriceIntro>
      <ChooseButton onClick={() => handleClick(price, points)}>
        選擇此方案
      </ChooseButton>
    </PriceContainer>
  );
};
const SectionTitle = styled.h1`
  color: ${(props) => props.theme.colors.green_dark};
  font-size: 1.3rem;
  margin: 50px 0 25px 0;
  &.first {
    margin-bottom: 0px;
    margin-top: 40px;
  }
`;
const StorePointInput = styled.input`
  padding: 5px;
  height: 41px;
  border: 2px solid ${(props) => props.theme.colors.grey_dark};
`;
const StorePointButton = styled.button`
  border: none;
  background: ${(props) => props.theme.colors.green_dark};
  color: white;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.green_dark};
  cursor: pointer;
`;

function PointPage() {
  const pointInput = useRef(null);
  const handleStorePointClick = () => {
    //將儲值金額發 API 給後端
    console.log(pointInput.current.value);
  };
  const handleChooseClick = (price, points) => {
    //將儲值金額發 API 給後端
    console.log(price, points);
  };
  return (
    <PointPageWrapper>
      <PageTitle>點數儲值</PageTitle>
      <SectionTitle className="first">優惠方案</SectionTitle>
      <PriceCardContainer>
        <PriceCard
          title="初體驗"
          price={250}
          points={300}
          courseCount="1"
          handleClick={handleChooseClick}
        />
        <PriceCard
          title="小資族"
          price={3000}
          points={3500}
          courseCount="10"
          handleClick={handleChooseClick}
        />
        <PriceCard
          title="好划算"
          price={6000}
          points={7000}
          courseCount="20"
          handleClick={handleChooseClick}
        />
        <PriceCard
          title="超優惠"
          price={10000}
          points={12000}
          courseCount="35"
          handleClick={handleChooseClick}
        />
      </PriceCardContainer>
      <SectionTitle>自行選擇儲值金額 (一元兌換 1 point)</SectionTitle>
      <StorePointInput
        type="number"
        placeholder="請輸入儲值金額"
        min="1"
        ref={pointInput}
      ></StorePointInput>
      <StorePointButton onClick={handleStorePointClick}>儲值</StorePointButton>
    </PointPageWrapper>
  );
}

export default PointPage;
