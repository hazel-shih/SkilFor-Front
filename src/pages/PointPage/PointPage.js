import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import { TeacherManageWrapper } from "../TeacherManagePage/TeacherManagePage";
import {
  createMerchantTradeNo,
  generateCheckMacValue,
  getCurrentTime,
} from "./utils";

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
  height: 40px;
  border: 2px solid ${(props) => props.theme.colors.grey_dark};
`;
const StorePointButton = styled.button`
  border: none;
  height: 40px;
  background: ${(props) => props.theme.colors.green_dark};
  color: white;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.green_dark};
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const StorePointContainer = styled.div`
  display: flex;
  align-items: center;
`;

function PointPage() {
  const [orderData, setOrderData] = useState({
    MerchantID: "2000132",
    MerchantTradeNo: createMerchantTradeNo(),
    MerchantTradeDate: "",
    PaymentType: "aio",
    TotalAmount: 0,
    TradeDesc: "SkilFor課程點數儲值",
    ItemName: "",
    ReturnURL: "https://skilforapi.bocyun.tw/ecpay/callback",
    ChoosePayment: "Credit",
    EncryptType: "1",
    ClientBackURL: "http://localhost:3000/SkilFor-Front/manage",
  });
  const pointInput = useRef(null);
  const checkout = useRef(null);
  const handleStorePointClick = () => {
    let value = Number(pointInput.current.value);
    if (value === "" || !(value > 0)) return;
    let confirm = window.confirm(
      `這是你的選購資訊：自選儲值額度${value}點，需支付${value} 元，若確認無誤將導向刷卡頁面`
    );
    if (confirm) {
      let newPointOrder = {
        ...orderData,
        MerchantTradeDate: getCurrentTime(),
        TotalAmount: value,
        ItemName: `自選儲值額度${value}點 ${value} 元 X1`,
      };
      setOrderData(newPointOrder);
    }
  };
  const handleChooseClick = (title, price, points) => {
    let confirm = window.confirm(
      `這是你的選購資訊：${title}${points}點，需支付${price} 元，若確認無誤將導向刷卡頁面`
    );
    if (confirm) {
      let newPointOrder = {
        ...orderData,
        MerchantTradeDate: getCurrentTime(),
        TotalAmount: price,
        ItemName: `${title}${points}點 ${price} 元 X1`,
      };
      setOrderData(newPointOrder);
    }
  };
  useEffect(() => {
    if (!orderData || orderData.ItemName === "") return;
    checkout.current.submit();
  }, [orderData]);
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
          handleClick={() => handleChooseClick("初體驗方案", 250, 300)}
        />
        <PriceCard
          title="小資族"
          price={3000}
          points={3500}
          courseCount="10"
          handleClick={() => handleChooseClick("小資族方案", 3000, 3500)}
        />
        <PriceCard
          title="好划算"
          price={6000}
          points={7000}
          courseCount="20"
          handleClick={() => handleChooseClick("好划算方案", 6000, 7000)}
        />
        <PriceCard
          title="超優惠"
          price={10000}
          points={12000}
          courseCount="35"
          handleClick={() => handleChooseClick("超優惠方案", 10000, 12000)}
        />
      </PriceCardContainer>
      <SectionTitle>自行選擇儲值金額 (一元兌換 1 point)</SectionTitle>
      <StorePointContainer>
        <StorePointInput
          type="number"
          placeholder="請輸入儲值金額"
          min="1"
          ref={pointInput}
        />
        <StorePointButton onClick={handleStorePointClick}>
          儲值
        </StorePointButton>
      </StorePointContainer>
      {orderData && (
        <form
          ref={checkout}
          id="_form_aiochk"
          action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
          method="post"
        >
          <input
            type="hidden"
            name="MerchantTradeDate"
            id="MerchantTradeDate"
            value={orderData.MerchantTradeDate}
          />
          <input
            type="hidden"
            name="TotalAmount"
            id="TotalAmount"
            value={orderData.TotalAmount}
          />
          <input
            type="hidden"
            name="TradeDesc"
            id="TradeDesc"
            value={orderData.TradeDesc}
          />
          <input
            type="hidden"
            name="ItemName"
            id="ItemName"
            value={orderData.ItemName}
          />
          <input
            type="hidden"
            name="ReturnURL"
            id="ReturnURL"
            value={orderData.ReturnURL}
          />
          <input
            type="hidden"
            name="ChoosePayment"
            id="ChoosePayment"
            value={orderData.ChoosePayment}
          />
          <input
            type="hidden"
            name="MerchantTradeNo"
            id="MerchantTradeNo"
            value={orderData.MerchantTradeNo}
          />
          <input
            type="hidden"
            name="MerchantID"
            id="MerchantID"
            value={orderData.MerchantID}
          />
          <input
            type="hidden"
            name="EncryptType"
            id="EncryptType"
            value={orderData.EncryptType}
          />
          <input
            type="hidden"
            name="PaymentType"
            id="PaymentType"
            value={orderData.PaymentType}
          />
          <input
            type="hidden"
            name="ClientBackURL"
            id="ClientBackURL"
            value="http://localhost:3000/SkilFor-Front/manage"
          />
          <input
            type="hidden"
            name="CheckMacValue"
            id="CheckMacValue"
            value={generateCheckMacValue(orderData)}
          />
        </form>
      )}
    </PointPageWrapper>
  );
}

export default PointPage;
