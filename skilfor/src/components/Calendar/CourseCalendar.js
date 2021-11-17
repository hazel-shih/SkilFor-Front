import React, { useState } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "./event";

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;

const AddNewContainer = styled.div`
  width: 300px;
  background: white;
  border: 1px solid grey;
  border-top: 8px solid ${(props) => props.theme.colors.green_dark};
  padding: 20px;
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
`;

const SelectOption = styled.option``;

const createTimeOptions = (startTime) => {
  let arr = [];
  if (!startTime) {
    for (let i = 0; i < 24; i++) {
      arr.push(`${i}:00`);
      arr.push(`${i}:30`);
    }
    return arr;
  }
  if (startTime) {
    let temp = startTime.split(":");
    let hour = Number(temp[0]);
    let min = Number(temp[1]);
    if (min === 0) {
      for (let i = hour + 1; i < 24; i++) {
        arr.push(`${i}:30`);
        arr.push(`${i}:30`);
      }
    }
  }
};

function CourseCalendar({ className }) {
  const localizer = momentLocalizer(moment);
  const [allEvents, setAllEvents] = useState(events);
  const [newEvent, setNewEvent] = useState({
    title: className,
    start: "",
    end: "",
  });
  const [startTime, setStartTime] = useState("");

  const handleDateClick = (e) => {
    console.log(e.slots);
  };

  const handleEventClick = (e) => {
    console.log(e);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const MyCalendar = (props) => (
    <>
      <AddNewContainer>
        <AddNewTitle>新增一個上課時段</AddNewTitle>
        <AddNewTitle>11月17日(星期三)</AddNewTitle>
        <RowContainer>
          <AddNewContent>開始時間：</AddNewContent>
          <SelectContainer onChange={handleStartTimeChange} value={startTime}>
            {createTimeOptions().map((item) => (
              <SelectOption>{item}</SelectOption>
            ))}
          </SelectContainer>
        </RowContainer>
        <RowContainer>
          <AddNewContent>結束時間：</AddNewContent>
          <SelectContainer>
            {createTimeOptions(startTime).map((item) => (
              <SelectOption>{item}</SelectOption>
            ))}
          </SelectContainer>
        </RowContainer>
      </AddNewContainer>
      <Calendar
        onSelectEvent={handleEventClick}
        onSelectSlot={handleDateClick}
        selectable
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        events={allEvents}
      />
    </>
  );
  return <MyCalendar />;
}

export default CourseCalendar;
