import React, { useState } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddTaskAlertCard from "./AddTaskAlertCard";

const CalendarContainer = styled.div`
  position: relative;
`;

let newEventInit = {
  title: "",
  dateData: {
    month: "",
    date: "",
    day: "",
  },
  start: "0:00",
  end: "0:30",
};

function CourseCalendar({ courseName }) {
  const localizer = momentLocalizer(moment);
  const [addAlertShow, setAddAlertShow] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [newEvent, setNewEvent] = useState(newEventInit);

  const handleDateClick = (e) => {
    setNewEvent(newEventInit);
    let dateDataObj = e.slots[0];
    setAddAlertShow(true);
    setNewEvent({
      ...newEvent,
      dateData: {
        year: dateDataObj.getFullYear(),
        month: dateDataObj.getMonth(),
        date: dateDataObj.getDate(),
        day: dateDataObj.getDay(),
      },
    });
  };

  const handleEventClick = (e) => {
    console.log(e);
  };

  const MyCalendar = () => (
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
        setAllEvents={setAllEvents}
        allEvents={allEvents}
      />
      <MyCalendar />
    </CalendarContainer>
  );
}

export default CourseCalendar;
