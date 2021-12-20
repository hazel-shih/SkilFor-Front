import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../../components/constants/breakpoints";
import CartList from "../CartPage/CartList";
import { sleep } from "../../utils";
//import { CART_LIST } from "./Constant";
import { getCartItems, deleteCartItem } from "../../WebAPI";
import { checkEventsConflict } from "../../components/Calendar/utils";

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
  //判斷新checked的item是否有跟其他item時間衝突
  const [overlapTimeArr, setOverlapTimeArr] = useState([]);
  const handleAddItemCheck = (e) => {
    const { id } = e.target;
    let targetItem = cartItems.find((item) => item.scheduleId === id);
    if (targetItem.checked) return setOverlapTimeArr([]);
    let existedCheckItems = cartItems.filter((item) => item.checked === true);
    const { start, end } = targetItem;
    let overlapItemResult = checkEventsConflict(
      existedCheckItems,
      new Date(start),
      new Date(end)
    );
    if (overlapItemResult !== false) {
      setOverlapTimeArr([overlapItemResult[1], targetItem.scheduleId]);
      return (targetItem.checked = !targetItem.checked);
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

  const handleItemDelete = (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("確認從購物車刪除此課程嗎?");
    if (!confirmDelete) return;
    const { id } = e.target;
    deleteCartItem(id, setApiError);
    setCartItems(cartItems.filter((item) => item.scheduleId !== id));
  };

  const handleExpiredItemDelete = (e) => {
    e.preventDefault();
    setCartItems(
      cartItems.filter(
        (item) => new Date(item.start).getTime() >= new Date().getTime()
      )
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

  const handleConfirmPaymentClick = (e) => {
    e.preventDefault();
    const checkedItem = cartItems.find((item) => item.checked === true);
    if (!checkedItem) return alert("尚未選擇要確認購買的課程");

    const confirmPayment = window.confirm(
      "按下確認購買後，將會於您的帳戶扣除點數"
    );
    if (!confirmPayment) return;
    setCartItems(
      cartItems.filter((item) => {
        return !item.checked;
      })
    );
    // 打一個 Post API: 紀錄課程已被買走、學生的 note 要傳給老師
    // 扣點過程背景進入 loading 讓使用者不能亂點
    // 加入判斷 此堂課是否已被其他人訂走
    // 加入判斷 此時段是否跟學生其他上課時間衝突
    alert("成功扣點 !");
  };

  return (
    <CartWrapper>
      <PageTitle>購物車</PageTitle>
      {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
      {!apiError && (
        <CartContainer>
          <WrapDiv>
            <DeleteExpiredItemBtn onClick={handleExpiredItemDelete}>
              清除過期課程
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
                <th>購買</th>
                <th>刪除</th>
                <th>課程名稱</th>
                <th>老師</th>
                <th>上課時間</th>
                <th>點數</th>
                <th>備註</th>
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
                  overlapTimeArr={overlapTimeArr}
                />
              ))}
            </CartBody>
          </CartTable>
          <WrapDiv>
            <RemainingPoints>剩餘點數 1000 點</RemainingPoints>
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
