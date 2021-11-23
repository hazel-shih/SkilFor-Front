import React, { useState } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddTaskAlertCard from "./AddTaskAlertCard";
import DeleteTaskAlertCard from "./DeleteTaskAlertCard";

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
  const [alertShow, setAlertShow] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [newEvent, setNewEvent] = useState(newEventInit);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (e) => {
    setNewEvent(newEventInit);
    let dateDataObj = e.slots[0];
    setAlertShow("add");
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
    setAlertShow("delete");
    setSelectedEvent(e);
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
      {alertShow && alertShow === "add" && (
        <AddTaskAlertCard
          alertShow={alertShow}
          setAlertShow={setAlertShow}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          setAllEvents={setAllEvents}
          allEvents={allEvents}
          courseName={courseName}
        />
      )}
      {alertShow && alertShow === "delete" && (
        <DeleteTaskAlertCard
          alertShow={alertShow}
          setAlertShow={setAlertShow}
          setAllEvents={setAllEvents}
          allEvents={allEvents}
          courseName={courseName}
          selectedEvent={selectedEvent}
        />
      )}
      <MyCalendar />
    </CalendarContainer>
  );
}

export default CourseCalendar;
