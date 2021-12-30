import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../../components/constants/breakpoints";
import CartList from "../CartPage/CartList";
//import { sleep } from "../../utils";
//import { CART_LIST } from "./Constant";
import {
  getCartItems,
  deleteCartItem,
  getUserInfos,
  addOrder,
} from "../../WebAPI";
import { checkEventsConflict } from "../../components/Calendar/utils";
import { titles } from "./CartTableTitles";

const CartWrapper = styled.section`
  padding: 156px 80px 232px 80px;
  display: flex;
  flex-direction: column;
  ${MEDIA_QUERY_MD} {
    padding: 156px 10px 182px 10px;
  }
  ${MEDIA_QUERY_SM} {
    padding: 135px 10px 182px 10px;
    text-align: center;
  }
`;
const PageTitle = styled.h1`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1.8rem;
`;
const CartContainer = styled.div`
  align-self: center;
  min-height: 300px;
  max-width: 1200px;
  margin: 0 auto;
`;
const CartTable = styled.table`
  width: 100%;
  border-spacing: 0;
  font-size: 1.2rem;
  table-layout: fixed;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  ${MEDIA_QUERY_MD} {
    font-size: 1rem;
  }
  ${MEDIA_QUERY_SM} {
    box-shadow: none;
    display: flex;
    justify-content: center;
  }
  td:nth-of-type(3) {
    text-align: left;
  }
  th,
  td {
    padding: 10px 4px;
    border-bottom: 1px dotted ${(props) => props.theme.colors.orange};
    vertical-align: middle;
    text-align: center;
    position: relative;
    white-space: pre-line;
    word-break: break-word;
    ${MEDIA_QUERY_SM} {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      text-align: right !important;
      max-width: 400px;
      border-bottom: 2px dotted ${(props) => props.theme.colors.orange};
      :nth-of-type(7) {
        border-bottom: 3px double ${(props) => props.theme.colors.grey_dark};
        margin-bottom: 10px;
      }
      :before {
        content: attr(data-title);
        align-items: center;
        text-align: left;
        font-weight: bold;
        padding: 6px 0;
        width: 30%;
      }
    }
  }
`;
const CartHead = styled.thead`
  width: 100%;
  background-color: ${(props) => props.theme.colors.grey_light};
  ${MEDIA_QUERY_SM} {
    display: none;
  }
`;
const CartBody = styled.tbody`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.grey_dark};
`;
const WrapDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
`;
const NoWrapDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  ${MEDIA_QUERY_SM} {
    height: 55px;
    justify-content: space-between;
  }
`;
const TotalPoints = styled.div`
  font-weight: bold;
  padding: 10px 30px;
  color: ${(props) => props.theme.colors.orange};
  ${MEDIA_QUERY_SM} {
    padding: 6px 0px;
    font-size: 1rem;
  }
`;
const Btn = styled.button`
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.green_dark};
  color: white;
  width: 95px;
  padding: 10px 0px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.2rem;
  text-decoration: none;
  :hover {
    opacity: 0.9;
    font-weight: bold;
  }
  ${MEDIA_QUERY_SM} {
    padding: 6px 0px;
    width: 100px;
    font-size: 1rem;
  }
`;
const DeleteExpiredItemBtn = styled(Btn)`
  width: 150px;
  margin: 10px 0px;
  background-color: white;
  color: ${(props) => props.theme.colors.green_dark};
  border: 1px solid ${(props) => props.theme.colors.green_dark};
  :hover {
    background-color: ${(props) => props.theme.colors.green_dark};
    color: white;
  }
  padding: 5px 0px;
`;
const ErrorMessage = styled.div`
  color: #cc0033;
  font-weight: bold;
  font-size: 1.3rem;
  width: 560px;
  background-color: #fce4e4;
  border: 1px solid #fcc2c3;
  border-radius: 20px;
  padding: 40px 30px 30px;
  line-height: 30px;
  text-shadow: 1px 1px rgba(250, 250, 250, 0.3);
  min-width: 300px;
  margin: 50px 0px;
  text-align: center;
  align-self: center;
  ${MEDIA_QUERY_MD} {
    max-width: 375px;
  }
  ${MEDIA_QUERY_SM} {
    max-width: 300px;
  }
`;
const RemainingPoints = styled(TotalPoints)`
  padding-right: 0px;
  color: ${(props) => props.theme.colors.green_dark};
`;

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPoints, setTotalPoints] = useState("0");
  const [apiError, setApiError] = useState(false);
  useEffect(() => {
    const getUserCartItems = async (setApiError) => {
      let json = await getCartItems(setApiError);
      if (!json || !json.success)
        return setApiError("發生了一點錯誤，請稍後再試");
      if (json.data.length === 0) {
        return setApiError("目前未有課程加入購物車");
      }
      setCartItems(json.data);
    };
    getUserCartItems(setApiError);
    /*async function fetchData() {
      await sleep(100);
      setCartItems(CART_LIST);
    }
    fetchData();*/
  }, []);

  const handleItemCheckChange = (e) => {
    const { id } = e.target;
    setCartItems(
      cartItems.map((item) => {
        if (item.scheduleId !== id) return item;
        return {
          ...item,
          checked: !item.checked,
        };
      })
    );
  };

  const [overlapTimeItems, setOverlapTimeItems] = useState([]);
  const handleAddItemCheck = (e) => {
    setOverlapTimeItems([]);
    const { id } = e.target;
    let targetItem = cartItems.find((item) => item.scheduleId === id);
    if (targetItem.checked) return;
    let existedCheckItems = cartItems.filter((item) => item.checked === true);
    const { start, end } = targetItem;
    let overlapItemResult = checkEventsConflict(
      existedCheckItems,
      new Date(start),
      new Date(end)
    );
    if (overlapItemResult !== false) {
      alert("課程時段重複了，請擇一購買喔");
      setOverlapTimeItems([
        overlapItemResult[1].scheduleId,
        targetItem.scheduleId,
      ]);
      overlapItemResult[1].checked = !overlapItemResult[1].checked;
      targetItem.checked = !targetItem.checked;
      return;
    }
  };

  useEffect(() => {
    function sumUpPoints() {
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].checked === true) {
          total += cartItems[i].price;
        }
      }
      return setTotalPoints(total);
    }
    sumUpPoints();
  }, [cartItems]);

  const deleteUserCartItem = async (scheduleId, setApiError) => {
    let json = await deleteCartItem(scheduleId, setApiError);
    if (!json || !json.success) {
      return setApiError("發生了一點錯誤，請稍後再試");
    }
  };

  const handleItemDelete = (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("確認從購物車刪除此課程嗎?");
    if (!confirmDelete) return;
    const { id } = e.target;
    deleteUserCartItem(id, setApiError);
    setCartItems(cartItems.filter((item) => item.scheduleId !== id));
  };

  const handleExpiredItemDelete = (e) => {
    e.preventDefault();
    setCartItems(
      cartItems.filter((item, setApiError) => {
        if (
          item.scheduleStatus ||
          new Date(item.start).getTime() < new Date().getTime()
        ) {
          deleteUserCartItem(item.scheduleId, setApiError);
          return false;
        }
        return true;
      })
    );
  };

  const handleItemNoteChange = (e) => {
    const { id, value } = e.target;
    setCartItems(
      cartItems.map((item) => {
        if (item.scheduleId !== id) return item;
        return {
          ...item,
          note: value,
        };
      })
    );
  };

  const [remainingPoints, setRemainingPoints] = useState("0");
  useEffect(() => {
    const getData = async (setApiError) => {
      let json = await getUserInfos(setApiError);
      if (!json || !json.success) {
        return setApiError("發生了一點錯誤，請稍後再試");
      }
      if (!json.data.points) return setRemainingPoints("0");
      return setRemainingPoints(json.data.points);
    };
    getData(setApiError);
  }, [setRemainingPoints]);

  const navigate = useNavigate();
  const [orderError, setOrderError] = useState([]);
  const handleConfirmPaymentClick = (e) => {
    e.preventDefault();
    if (orderError.length !== 0) return;
    const checkedItem = cartItems.find((item) => item.checked);
    if (!checkedItem) return alert("尚未選擇要確認購買的課程");

    if (remainingPoints < totalPoints) {
      alert("剩餘點數不足，請先去儲值點數喔!");
      return navigate("/point");
    }

    const confirmPayment = window.confirm(
      "按下確認購買後，將會於您的帳戶扣除點數"
    );
    if (!confirmPayment) return;

    // 確認購買 Post API
    let orderData = {
      scheduleId: [],
      studentNote: [],
      reservedPrice: [],
      totalPrice: "",
    };
    setCartItems(
      cartItems.map((item) => {
        if (item.checked === true) {
          orderData.scheduleId.push(item.scheduleId);
          orderData.studentNote.push(item.note);
          orderData.reservedPrice.push(item.price);
        }
        return item;
      })
    );
    orderData.totalPrice = totalPoints;

    addOrder(orderData, setApiError).then((json) => {
      if (!json) return setApiError("發生了一點錯誤，請稍後再試");
      if (!json.success) {
        return setOrderError(json.errMessage);
      }
      for (let i = 0; i < orderData.scheduleId.length; i++) {
        deleteUserCartItem(orderData.scheduleId[i], setApiError);
      }
      alert("成功扣點 ! 可在行事曆上看到已購買成功的課程喔");
      navigate("/calendar");
    });
  };
  return (
    <CartWrapper>
      <PageTitle>購物車</PageTitle>
      {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
      {!apiError && (
        <CartContainer>
          <WrapDiv>
            <DeleteExpiredItemBtn onClick={handleExpiredItemDelete}>
              清除失效課程
            </DeleteExpiredItemBtn>
          </WrapDiv>
          <CartTable>
            <colgroup>
              <col span="2" style={{ width: "5%" }} />
              <col span="1" style={{ width: "20%" }} />
              <col span="1" style={{ width: "8%" }} />
              <col span="1" style={{ width: "17%" }} />
              <col span="1" style={{ width: "15%" }} />
              <col span="1" style={{ width: "30%" }} />
            </colgroup>
            <CartHead>
              <tr>
                {titles.map((title, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </CartHead>
            <CartBody>
              {cartItems.map((item) => (
                <CartList
                  item={item}
                  key={item.scheduleId}
                  onDeleteItem={handleItemDelete}
                  onChangeCheck={handleItemCheckChange}
                  onClickCheck={handleAddItemCheck}
                  onChangeNote={handleItemNoteChange}
                  id={item.scheduleId}
                  checked={item.checked}
                  start={item.start}
                  end={item.end}
                  overlapTimeItems={overlapTimeItems}
                  orderError={orderError}
                />
              ))}
            </CartBody>
          </CartTable>
          <WrapDiv>
            <RemainingPoints>我的點數 {remainingPoints} 點</RemainingPoints>
            <NoWrapDiv>
              <TotalPoints>共計 {totalPoints} 點</TotalPoints>
              <Btn onClick={handleConfirmPaymentClick}>確認購買</Btn>
            </NoWrapDiv>
          </WrapDiv>
        </CartContainer>
      )}
    </CartWrapper>
  );
}
