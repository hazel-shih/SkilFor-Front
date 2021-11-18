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
  const [allEvents, setAllEvents] = useState(events);
  const [newEvent, setNewEvent] = useState({
    title: courseName,
    start: "",
    end: "",
  });

  const handleDateClick = (e) => {
    console.log(e.slots);
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
      <AddTaskAlertCard />
      <MyCalendar />
    </CalendarContainer>
  );
}

export default CourseCalendar;
