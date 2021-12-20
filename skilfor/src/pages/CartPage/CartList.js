import { useState, useEffect } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import close from "../../img/close.png";

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
  resize: none;
  :focus {
    border: 2px solid ${(props) => props.theme.colors.green_light};
  }
  ${MEDIA_QUERY_SM} {
    height: 120px;
    margin: 10px 0px;
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
  color: #00bfa5;
  font-weight: bold;
  > td {
    border-bottom: none;
    padding-top: 5px;
    background-color: #fff59d;
    ${MEDIA_QUERY_SM} {
      padding: 15px 5px 5px;
      justify-content: center;
      :before {
        width: 0%;
      }
    }
  }
`;
const ExpiredCover = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  border-bottom: 1px solid #e6e6e6;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5;
`;

const getDisplayDate = (dateObj) => {
  let dateStr = dateObj.toLocaleString();
  return dateStr.slice(0, dateStr.length - 10);
};

export default function CartList({
  item,
  onChangeCheck,
  onClickCheck,
  onDeleteItem,
  onChangeNote,
  overlapTimeArr,
}) {
  const [expired, setExpired] = useState(false);
  const [errorNotice, setErrorNotice] = useState("");
  const [errorStyle, setErrorStyle] = useState({});

  useEffect(() => {
    function checkError() {
      setErrorNotice("");
      setErrorStyle({});
      if (new Date(item.start).getTime() < new Date().getTime()) {
        setExpired(true);
        setErrorStyle({
          backgroundColor: "#fafafa",
          color: "#AAAAAA",
        });
      }

      if (overlapTimeArr.length === 0) return;
      overlapTimeArr.forEach((e) => {
        if (e === item.scheduleId) {
          setErrorNotice("課程時段重複了，請擇一購買喔");
          setErrorStyle({
            backgroundColor: "#fff59d",
          });
        }
      });
    }
    checkError();
  }, [item, expired, overlapTimeArr]);

  return (
    <>
      {errorNotice && (
        <ErrorTr>
          <td colSpan="7">{errorNotice}</td>
        </ErrorTr>
      )}
      <tr>
        <td data-title="購買" style={errorStyle}>
          <ExpiredCover show={expired} />
          <label>
            <CheckBox
              type="checkbox"
              onChange={onChangeCheck}
              onClick={onClickCheck}
              checked={!!item.checked}
              id={item.scheduleId}
              disabled={expired}
            />
          </label>
        </td>
        <td data-title="刪除" style={errorStyle}>
          <ExpiredCover show={expired} />
          <DeleteButton
            src={close}
            onClick={onDeleteItem}
            id={item.scheduleId}
          />
        </td>
        <td data-title="課程名稱" style={errorStyle}>
          <ExpiredCover show={expired} />
          {item.courseName}
        </td>
        <td data-title="老師" style={errorStyle}>
          <ExpiredCover show={expired} />
          {item.teacherName}
        </td>
        <td data-title="上課時間" style={errorStyle}>
          <ExpiredCover show={expired} />
          {getDisplayDate(new Date(item.start))}
          <br /> {item.timePeriod}
        </td>
        <td data-title="點數" style={errorStyle}>
          <ExpiredCover show={expired} />
          {item.price} 點
        </td>
        <td data-title="備註" style={errorStyle}>
          <ExpiredCover show={expired} />
          <label>
            <NoteTextArea
              placeholder="我想對老師說..."
              onChange={onChangeNote}
              id={item.scheduleId}
              value={item.note || ""}
              disabled={expired}
            />
          </label>
        </td>
      </tr>
    </>
  );
}
