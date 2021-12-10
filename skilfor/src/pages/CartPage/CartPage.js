import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    padding: 156px 30px 182px 30px;
  }
  ${MEDIA_QUERY_SM} {
    padding: 135px 10px 182px 10px;
    text-align: center;
  }
`;
const CartContainer = styled.div`
  align-self: center;
  margin-bottom: 10px;
  min-height: 300px;
  border: 1px solid ${(props) => props.theme.colors.grey_dark};
  border-radius: 10px;
  padding: 20px;
  width: 800px;
  ${MEDIA_QUERY_MD} {
    max-width: 700px;
  }
  ${MEDIA_QUERY_SM} {
    padding: 5px 10px;
    max-width: 320px;
  }
`;
const CartTable = styled.table`
  width: 100%;
  text-align: center;
  border-spacing: 0;
  font-size: 1.2rem;
  table-layout: fixed;
  td:nth-of-type(3) {
    text-align: left;
    ${MEDIA_QUERY_SM} {
      text-align: right;
    }
  }
  th,
  td {
    padding: 6px 4px;
    :nth-of-type(3) {
      padding-left: 8px;
    }
    border-bottom: 1px dotted ${(props) => props.theme.colors.grey_light};
    vertical-align: middle;
    ${MEDIA_QUERY_SM} {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      text-align: right;
      width: 290px;
      :nth-of-type(7) {
        border-bottom: 3px solid ${(props) => props.theme.colors.grey_dark};
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
  padding: 10px;
  width: 100%;
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
  border: 1px solid ${(props) => props.theme.colors.grey_light};
  border-radius: 5px;
  padding: 2px 10px;
  opacity: 0.8;
  text-align: left;
  ${MEDIA_QUERY_SM} {
    height: 120px;
    margin: 10px 0px;
  }
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 760px;
  height: 65px;
  margin-top: 5px;
  ${MEDIA_QUERY_MD} {
    max-width: 650px;
  }
  ${MEDIA_QUERY_SM} {
    max-width: 295px;
    height: 55px;
    justify-content: space-between;
  }
`;
const TotalPrice = styled.div`
  font-weight: bold;
  padding: 10px 30px;
  color: ${(props) => props.theme.colors.orange};
  ${MEDIA_QUERY_SM} {
    padding: 6px 0px;
    font-size: 1rem;
  }
`;
const Btn = styled(Link)`
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

function CartList({ item, onChange, onDelete }) {
  return (
    <tr>
      <td data-title="購買">
        <label>
          <CheckBox
            type="checkbox"
            onChange={onChange}
            checked={item.checked}
            id={item.courseId}
          />
        </label>
      </td>
      <td data-title="刪除">
        <DeleteButton src={close} onClick={onDelete} id={item.courseId} />
      </td>
      <td data-title="課程名稱">{item.courseName}</td>
      <td data-title="老師名稱">{item.teacherName}</td>
      <td data-title="上課時間">
        {`${item.start.getFullYear()}/${
          item.start.getMonth() + 1
        }/${item.start.getDate()}`}
        <br /> {item.timePeriod}
      </td>
      <td data-title="價格">NT${item.price}</td>
      <td data-title="備註">
        <label>
          <NoteTextArea placeholder="我想對老師說..." />
        </label>
      </td>
    </tr>
  );
}

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");

  useEffect(() => {
    //API: get user cart data
    async function fetchData() {
      await sleep(100);
      setCartItems(CART_LIST);
    }
    fetchData();
  }, []);

  const handleChangeItem = (e) => {
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
    console.log(cartItems);
  };

  useEffect(() => {
    function sumUpPrice() {
      let total = 0;
      console.log(cartItems);
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].checked === true) {
          total += cartItems[i].price;
        }
      }
      return setTotalPrice(total);
    }
    sumUpPrice();
  }, [cartItems]);

  const handleDeleteItem = (e) => {
    e.preventDefault();
    const { id } = e.target;
    setCartItems(cartItems.filter((item) => item.courseId !== id));
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
              <th>老師名稱</th>
              <th>上課時間</th>
              <th>價格</th>
              <th>備註</th>
            </tr>
          </CartHead>
          <CartBody>
            {cartItems.map((item) => (
              <CartList
                item={item}
                key={item.courseId}
                onDelete={handleDeleteItem}
                onChange={handleChangeItem}
                id={item.id}
                checked={item.checked}
              />
            ))}
          </CartBody>
        </CartTable>
        <BtnDiv>
          <TotalPrice>共計 NT$ {totalPrice}</TotalPrice>
          <Btn to="./payment">確認購買</Btn>
        </BtnDiv>
      </CartContainer>
    </CartWrapper>
  );
}

export default CartPage;
