import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../../components/constants/breakpoints";
import PageTitle from "../../components/PageTitle";
import close from "../../img/close.png";
import { sleep } from "../../utils";
import { CART_LIST } from "./Constant";

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
const CartContainer = styled.div`
  align-self: center;
  min-height: 300px;
  max-width: 780px;
  ${MEDIA_QUERY_MD} {
    max-width: 600px;
  }
  ${MEDIA_QUERY_SM} {
    max-width: 320px;
  }
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
    ${MEDIA_QUERY_SM} {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      text-align: right !important;
      width: 290px;
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
        width: 50%;
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
const CheckBox = styled.input`
  width: 18px;
  height: 16px;
  cursor: pointer;
`;
const NoteTextArea = styled.textarea`
  height: 75px;
  width: 100%;
  border: 2px dashed ${(props) => props.theme.colors.green_dark};
  border-radius: 5px;
  padding: 2px 10px;
  opacity: 0.8;
  text-align: left;
  :focus {
    border: 2px solid ${(props) => props.theme.colors.green_light};
  }
  ${MEDIA_QUERY_SM} {
    height: 120px;
    margin: 10px 0px;
  }
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 730px;
  height: 65px;
  margin-top: 5px;
  ${MEDIA_QUERY_MD} {
    max-width: 560px;
  }
  ${MEDIA_QUERY_SM} {
    max-width: 295px;
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
const DeleteButton = styled.img`
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

const ErrorTr = styled.tr`
  color: #cc0033;
  font-weight: bold;
  > td {
    border-bottom: none;
    padding: 15px 0px 5px;
    background-color: #fce4e4;
    ${MEDIA_QUERY_SM} {
      padding: 15px 5px 5px;
      justify-content: center;
      :before {
        width: 0%;
      }
    }
  }
`;
function CartList({ item, onChangeCheck, onDeleteItem, onChangeNote }) {
  const [error, setError] = useState(null);
  const [expired, setExpired] = useState(false);
  const [expiredStyle, setExpiredStyle] = useState({});

  useEffect(() => {
    function checkExpired() {
      if (item.start.getTime() < new Date().getTime()) {
        setError("課程時間過期了，無法再購買囉");
        setExpired(true);
        setExpiredStyle({
          backgroundColor: "#fce4e4",
          color: "#AAAAAA",
        });
      }
    }
    checkExpired();
  }, [item, expired]);

  return (
    <>
      {error && (
        <ErrorTr>
          <td colSpan="7">{error}</td>
        </ErrorTr>
      )}
      <tr>
        <td data-title="購買" style={expiredStyle}>
          <label>
            <CheckBox
              type="checkbox"
              onChange={onChangeCheck}
              checked={!!item.checked}
              id={item.courseId}
              disabled={expired}
            />
          </label>
        </td>
        <td data-title="刪除" style={expiredStyle}>
          <DeleteButton src={close} onClick={onDeleteItem} id={item.courseId} />
        </td>
        <td data-title="課程名稱" style={expiredStyle}>
          {item.courseName}
        </td>
        <td data-title="老師" style={expiredStyle}>
          {item.teacherName}
        </td>
        <td data-title="上課時間" style={expiredStyle}>
          {`${item.start.getFullYear()}/${
            item.start.getMonth() + 1
          }/${item.start.getDate()}`}
          <br /> {item.timePeriod}
        </td>
        <td data-title="點數" style={expiredStyle}>
          {item.price} 點
        </td>
        <td data-title="備註" style={expiredStyle}>
          <label>
            <NoteTextArea
              placeholder="我想對老師說..."
              onChange={onChangeNote}
              id={item.courseId}
              value={item.note}
              disabled={expired}
            />
          </label>
        </td>
      </tr>
    </>
  );
}

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPoints, setTotalPoints] = useState("0");

  useEffect(() => {
    //API: get user cart data
    async function fetchData() {
      await sleep(100);
      setCartItems(CART_LIST);
    }
    fetchData();
  }, []);

  const handleItemCheckChange = (e) => {
    const { id } = e.target;
    setCartItems(
      cartItems.map((item) => {
        if (item.courseId !== id) return item;
        return {
          ...item,
          checked: !item.checked,
        };
      })
    );
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
    setCartItems(cartItems.filter((item) => item.courseId !== id));
  };

  const handleItemNoteChange = (e) => {
    const { id, value } = e.target;
    setCartItems(
      cartItems.map((item) => {
        if (item.courseId !== id) return item;
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
    // 多增加區塊顯示學生目前剩餘點數
    // 加入判斷 此堂課是否已被其他人訂走
    // 加入判斷 此時段是否跟學生其他上課時間衝突
    // 加入判斷 此時斷跟其他要結帳的上課時間是否衝突
    alert("成功扣點 !");
  };
  return (
    <CartWrapper>
      <PageTitle>購物車</PageTitle>
      <CartContainer>
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
                key={item.courseId}
                onDeleteItem={handleItemDelete}
                onChangeCheck={handleItemCheckChange}
                onChangeNote={handleItemNoteChange}
                id={item.courseId}
                checked={item.checked}
              />
            ))}
          </CartBody>
        </CartTable>
        <BtnDiv>
          <TotalPoints>共計 {totalPoints} 點</TotalPoints>
          <Btn onClick={handleConfirmPaymentClick}>確認購買</Btn>
        </BtnDiv>
      </CartContainer>
    </CartWrapper>
  );
}

export default CartPage;
