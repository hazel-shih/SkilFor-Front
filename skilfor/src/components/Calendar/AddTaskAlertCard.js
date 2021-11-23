import { useState } from "react";
import styled from "styled-components";
import close from "../../img/close.png";
import { nanoid } from "nanoid";
import { TIME_OPTIONS, COURSE_NAME_LIST } from "./constants";
import {
  createTimeOptions,
  getDay,
  getTimeNumber,
  checkEventsConflict,
} from "./utils";

//styled component
export const RowContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: end;
`;

export const ColumnContainer = styled(RowContainer)`
  flex-direction: column;
  align-items: center;
`;

export const AlertContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  background: white;
  border-top: 8px solid ${(props) => props.color};
  padding: 30px;
  text-align: center;
  box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.2);
  z-index: 5;
`;

export const AlertTitle = styled.h1`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.grey_dark};
  margin: 0 auto;
  width: fit-content;
  :last-of-type {
    margin-bottom: 10px;
  }
`;

export const AlertContent = styled.p`
  font-size: 1.1rem;
  margin-top: 10px;
  color: ${(props) => props.theme.colors.grey_dark};
`;

const SelectContainer = styled.select`
  height: 25px;
  font-size: 1rem;
  width: fit-content;
`;

const SelectOption = styled.option``;

const ColorOption = styled.div`
  width: 20px;
  height: 20px;
  background: ${(props) => props.colorHex};
  border-radius: 50%;
  margin: 10px 10px 0 0;
  cursor: pointer;
`;

export const AlertButton = styled.button`
  border: none;
  border-radius: 5px;
  width: 90px;
  color: white;
  background: ${(props) => props.color};
  margin: 0 auto;
  margin-top: 25px;
  padding: 6px 10px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export const CloseButton = styled.img`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 18px;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

const ErrorMessage = styled.p`
  font-weight: bold;
  color: #b61919;
  margin-top: 10px;
`;

function AddTaskAlertCard({
  setAlertShow,
  newEvent,
  setNewEvent,
  setAllEvents,
  allEvents,
  courseName,
}) {
  const [error, setError] = useState(null);
  const handleCourseTimeChange = (e) => {
    setError(false);
    const { id: timeType, value } = e.target;
    if (timeType === "start") {
      let endTime = TIME_OPTIONS[TIME_OPTIONS.indexOf(value) + 1];
      setNewEvent({
        ...newEvent,
        start: value,
        end: endTime,
      });
    } else {
      setNewEvent({
        ...newEvent,
        [timeType]: value,
      });
    }
  };
  const handleCloseClick = () => {
    setAlertShow(null);
    setError(false);
  };
  const handleAddNewEvent = () => {
    const { year, month, date } = newEvent.dateData;
    const { start, end } = newEvent;
    let startTimeNumArr = getTimeNumber(start);
    let endTimeNumArr = getTimeNumber(end);
    let formatedStartTime = new Date(
      year,
      month,
      date,
      startTimeNumArr[0],
      startTimeNumArr[1]
    );
    let formatedEndTime = new Date(
      year,
      month,
      date,
      endTimeNumArr[0],
      endTimeNumArr[1]
    );
    if (checkEventsConflict(allEvents, formatedStartTime, formatedEndTime)) {
      setError("此時段與當天其他時段重疊！");
      return;
    }
    setAllEvents([
      ...allEvents,
      {
        id: nanoid(),
        title: `${newEvent.start} - ${newEvent.end}`,
        start: formatedStartTime,
        end: formatedEndTime,
        resource: {
          courseName,
        },
      },
    ]);
    setAlertShow(null);
  };

  return (
    <AlertContainer color="#75A29E">
      <CloseButton src={close} onClick={handleCloseClick} />
      <AlertTitle>新增一個上課時段</AlertTitle>
      <AlertTitle>{`${newEvent.dateData.month + 1}月${
        newEvent.dateData.date
      }日 星期${getDay(newEvent.dateData.day)}`}</AlertTitle>
      <RowContainer>
        <AlertContent>課程名稱：</AlertContent>
        <SelectContainer id="courseName">
          {COURSE_NAME_LIST.map((item) => {
            return <SelectOption key={nanoid()}>{item}</SelectOption>;
          })}
        </SelectContainer>
      </RowContainer>
      <RowContainer>
        <AlertContent>開始時間：</AlertContent>
        <SelectContainer
          id="start"
          onChange={handleCourseTimeChange}
          value={newEvent.start}
        >
          {createTimeOptions("start").map((item) => {
            return <SelectOption key={nanoid()}>{item}</SelectOption>;
          })}
        </SelectContainer>
      </RowContainer>
      <RowContainer>
        <AlertContent>結束時間：</AlertContent>
        <SelectContainer
          id="end"
          onChange={handleCourseTimeChange}
          value={newEvent.end}
        >
          {createTimeOptions("end", newEvent.start).map((item) => {
            return <SelectOption key={nanoid()}>{item}</SelectOption>;
          })}
        </SelectContainer>
      </RowContainer>
      <ColumnContainer>
        <AlertContent>設定活動顏色：</AlertContent>
        <RowContainer>
          <ColorOption colorHex="#d50001" />
          <ColorOption colorHex="#f4511e" />
          <ColorOption colorHex="#f6be25" />
          <ColorOption colorHex="#34b579" />
          <ColorOption colorHex="#009ce5" />
          <ColorOption colorHex="#3f50b5" />
          <ColorOption colorHex="#8e24aa" />
        </RowContainer>
      </ColumnContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AlertButton onClick={handleAddNewEvent} color="#75A29E">
        確定新增
      </AlertButton>
    </AlertContainer>
  );
}

export default AddTaskAlertCard;
