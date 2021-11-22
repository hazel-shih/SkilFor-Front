import { useState } from "react";
import styled from "styled-components";
import close from "../../img/close.png";
import { nanoid } from "nanoid";

//styled component
const RowContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: end;
`;

const AddNewContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background: white;
  border-top: 8px solid ${(props) => props.theme.colors.green_dark};
  padding: 30px;
  text-align: center;
  box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: ${(props) => (props.addAlertShow ? "block" : "none")};
`;

const AddNewTitle = styled.h1`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.grey_dark};
  margin: 0 auto;
  width: fit-content;
`;

const AddNewContent = styled.p`
  font-size: 1.1rem;
  margin-top: 10px;
  color: ${(props) => props.theme.colors.grey_dark};
`;

const SelectContainer = styled.select`
  height: 25px;
  font-size: 1rem;
  width: 65px;
`;

const SelectOption = styled.option``;

const AddButton = styled.button`
  border: none;
  border-radius: 5px;
  width: 90px;
  color: white;
  background: ${(props) => props.theme.colors.green_dark};
  margin: 0 auto;
  margin-top: 15px;
  padding: 6px 10px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const CloseButton = styled.img`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 18px;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

//產出初始化下拉式選單課程時間選項
const createTimeOptionsList = () => {
  let arr = [];
  for (let i = 0; i < 24; i++) {
    arr.push(`${i}:00`);
    arr.push(`${i}:30`);
  }
  arr.push("24:00");
  return arr;
};
//使用者選定開始的選項後，產出結束的選項
const createTimeOptions = (timeType, time) => {
  let list = createTimeOptionsList();
  //沒給定開始時間的結束時間選單
  if (!time && timeType === "end") {
    return list.slice(1, list.length);
  }
  //給定開始時間的結束時間選單
  if (time && timeType === "end") {
    return list.slice(list.indexOf(time) + 1, list.length);
  }
  //開始時間選單
  if (timeType === "start") {
    return list.slice(0, list.length - 1);
  }
};

//處理星期格式
let dayArr = ["日", "一", "二", "三", "四", "五", "六"];
const getDay = (dayNum) => {
  return dayArr[dayNum];
};
//處理文字時間轉數字時間格式
const getTimeNumber = (timeStr) => {
  let timeArr = timeStr.split(":").map((item) => Number(item));
  return timeArr;
};

function AddTaskAlertCard({
  addAlertShow,
  setAddAlertShow,
  newEvent,
  setNewEvent,
  setAllEvents,
  allEvents,
}) {
  const [courseTime, setCourseTime] = useState({
    start: {
      time: "0:00",
    },
    end: {
      time: "0:30",
    },
  });
  const handleCourseTimeChange = (e) => {
    const { id, value } = e.target;
    setCourseTime({
      ...courseTime,
      [id]: {
        time: value,
      },
    });
    setNewEvent({
      ...newEvent,
      [id]: value,
    });
  };
  const handleCloseClick = () => {
    setAddAlertShow(false);
  };
  const handleAddNewEvent = () => {
    const { year, month, date } = newEvent.dateData;
    const { start, end } = newEvent;
    let startTimeNumArr = getTimeNumber(start);
    let endTimeNumArr = getTimeNumber(end);
    setAllEvents([
      ...allEvents,
      {
        id: nanoid(),
        title: `${newEvent.start} - ${newEvent.end}`,
        start: new Date(
          year,
          month,
          date,
          startTimeNumArr[0],
          startTimeNumArr[1]
        ),
        end: new Date(year, month, date, endTimeNumArr[0], endTimeNumArr[1]),
      },
    ]);
    setAddAlertShow(false);
  };

  console.log("allEvents: ", allEvents);
  return (
    <AddNewContainer addAlertShow={addAlertShow}>
      <CloseButton src={close} onClick={handleCloseClick} />
      <AddNewTitle>新增一個上課時段</AddNewTitle>
      <AddNewTitle>{`${newEvent.dateData.month + 1}月${
        newEvent.dateData.date
      }日 星期${getDay(newEvent.dateData.day)}`}</AddNewTitle>
      <RowContainer>
        <AddNewContent>開始時間：</AddNewContent>
        <SelectContainer
          id="start"
          onChange={handleCourseTimeChange}
          value={courseTime.start.time}
        >
          {createTimeOptions("start", courseTime.end.time).map((item) => (
            <SelectOption>{item}</SelectOption>
          ))}
        </SelectContainer>
      </RowContainer>
      <RowContainer>
        <AddNewContent>結束時間：</AddNewContent>
        <SelectContainer
          id="end"
          onChange={handleCourseTimeChange}
          value={courseTime.end.time}
        >
          {createTimeOptions("end", courseTime.start.time).map((item) => (
            <SelectOption>{item}</SelectOption>
          ))}
        </SelectContainer>
      </RowContainer>
      <AddButton onClick={handleAddNewEvent}>確定新增</AddButton>
    </AddNewContainer>
  );
}

export default AddTaskAlertCard;
