import React, { useState } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "./event";
import AddTaskAlertCard from "./AddTaskAlertCard";

const CalendarContainer = styled.div`
  position: relative;
`;

function CourseCalendar({ courseName }) {
  const localizer = momentLocalizer(moment);
  const [addAlertShow, setAddAlertShow] = useState(false);
  const [allEvents, setAllEvents] = useState(events);
  const [newEvent, setNewEvent] = useState({
    title: courseName,
    dateData: {
      month: "",
      date: "",
      day: "",
    },
    start: "",
    end: "",
  });

  const handleDateClick = (e) => {
    let dateDataObj = e.slots[0];
    setAddAlertShow(true);
    setNewEvent({
      ...newEvent,
      dateData: {
        month: dateDataObj.getMonth() + 1,
        date: dateDataObj.getDate(),
        day: dateDataObj.getDay(),
      },
    });
  };

  const handleEventClick = (e) => {
    console.log(e);
  };

  const MyCalendar = (props) => (
    <>
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
  return (
    <CalendarContainer>
      <AddTaskAlertCard
        addAlertShow={addAlertShow}
        setAddAlertShow={setAddAlertShow}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
      />
      <MyCalendar />
    </CalendarContainer>
  );
}

export default CourseCalendar;
