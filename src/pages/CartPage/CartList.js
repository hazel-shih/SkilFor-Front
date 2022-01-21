import { useState, useEffect } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import deleteBtn from "../../img/close.png";
import { useTranslation } from "react-i18next";

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
    background-color: #fafafa;
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
  position: absolute;
  border-bottom: 1px solid #e6e6e6;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5;
`;

export default function CartList({
  item,
  onChangeCheck,
  onClickCheck,
  onDeleteItem,
  onChangeNote,
  overlapTimeItems,
  orderError,
}) {
  const { t } = useTranslation();
  const [errorNotice, setErrorNotice] = useState("");
  const [errorStyle, setErrorStyle] = useState({});
  const [disabled, setDisable] = useState(false);
  useEffect(() => {
    function checkError() {
      setErrorNotice("");
      setErrorStyle({});
      if (
        item.scheduleStatus ||
        new Date(item.start).getTime() < new Date().getTime()
      ) {
        setDisable(true);
        setErrorStyle({
          backgroundColor: "#fafafa",
          color: "#AAAAAA",
        });
      }

      if (overlapTimeItems) {
        overlapTimeItems.forEach((element) => {
          if (element === item.scheduleId) {
            setErrorStyle({
              backgroundColor: "#fff59d",
            });
          }
        });
      }
      if (orderError) {
        for (const [errorId, errorMessage] of Object.entries(orderError)) {
          if (errorId === item.scheduleId) {
            setDisable(true);
            setErrorStyle({
              backgroundColor: "#fff59d",
            });
            setErrorNotice(errorMessage);
          }
        }
      }
    }
    checkError();
  }, [item, disabled, overlapTimeItems, orderError]);

  return (
    <>
      {item.scheduleStatus || errorNotice ? (
        <ErrorTr>
          <td colSpan="7">
            {item.scheduleStatus && <ExpiredCover />}
            {item.scheduleStatus ? t(item.scheduleStatus) : errorNotice}
          </td>
        </ErrorTr>
      ) : null}
      <tr>
        <td data-title={t("購買")} style={errorStyle}>
          {item.scheduleStatus && <ExpiredCover />}
          <label>
            <CheckBox
              type="checkbox"
              onChange={onChangeCheck}
              onClick={onClickCheck}
              checked={!!item.checked}
              id={item.scheduleId}
              disabled={disabled}
            />
          </label>
        </td>
        <td data-title={t("刪除")} style={errorStyle}>
          {item.scheduleStatus && <ExpiredCover />}
          <DeleteButton
            src={deleteBtn}
            onClick={onDeleteItem}
            id={item.scheduleId}
          />
        </td>
        <td data-title={t("課程名稱")} style={errorStyle}>
          {item.scheduleStatus && <ExpiredCover />}
          {item.courseName}
        </td>
        <td data-title={t("老師")} style={errorStyle}>
          {item.scheduleStatus && <ExpiredCover />}
          {item.teacherName}
        </td>
        <td data-title={t("上課時間")} style={errorStyle}>
          {item.scheduleStatus && <ExpiredCover />}
          {new Date(item.start).toLocaleDateString()}
          <br />
          {new Date(item.start).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          ~{" "}
          {new Date(item.end).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </td>
        <td data-title={t("點數")} style={errorStyle}>
          {item.scheduleStatus && <ExpiredCover />}
          {item.price} {t("點")}
        </td>
        <td data-title={t("備註")} style={errorStyle}>
          {item.scheduleStatus && <ExpiredCover />}
          <label>
            <NoteTextArea
              placeholder={t("我想對老師說...")}
              onChange={onChangeNote}
              id={item.scheduleId}
              value={item.note || ""}
              disabled={disabled}
            />
          </label>
        </td>
      </tr>
    </>
  );
}
