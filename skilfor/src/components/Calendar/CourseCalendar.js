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
  const [alertShow, setAlertShow] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [newEvent, setNewEvent] = useState(newEventInit);
  const [selectedEvent, setSelectedEvent] = useState(false);
  const [currentPage, setCurrentPage] = useState(new Date());

  const handleDateClick = (e) => {
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

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event);
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
    };
    return {
      style: style,
    };
  };

  // //點擊month week day
  // const handleViewChange = (e) => {
  //   console.log("handleViewChange: ", e);
  // };
  // //點擊上下個月 or month、week 時觸發
  // const handleRangeChange = (e) => {
  //   console.log(e);
  // };

  const handlePageChange = (currentMonthPage) => {
    console.log(currentMonthPage);
    setCurrentPage(currentMonthPage);
  };

  return (
    <CalendarContainer>
      <Calendar
        onSelectEvent={handleEventClick}
        onSelectSlot={handleDateClick}
        selectable
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        events={allEvents}
        // onView={handleViewChange}
        // onRangeChange={handleRangeChange}
        views={["month", "day", "week"]}
        onNavigate={handlePageChange}
        date={currentPage}
        // eventPropGetter={() => ({
        //   style: { backgroundColor: "green" },
        // })}
        eventPropGetter={eventStyleGetter}
      />
      {alertShow === "add" && (
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
      {alertShow === "delete" && (
        <DeleteTaskAlertCard
          alertShow={alertShow}
          setAlertShow={setAlertShow}
          setAllEvents={setAllEvents}
          allEvents={allEvents}
          courseName={courseName}
          selectedEvent={selectedEvent}
        />
      )}
    </CalendarContainer>
  );
}

export default CourseCalendar;
