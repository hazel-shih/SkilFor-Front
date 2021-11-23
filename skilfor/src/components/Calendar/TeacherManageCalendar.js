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

function TeacherManageCalendar({ teacherId }) {
  const localizer = momentLocalizer(moment);
  const [alertShow, setAlertShow] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(false);
  const [currentPage, setCurrentPage] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState({
    month: "",
    date: "",
    day: "",
  });
  const handleDateClick = (e) => {
    let dateDataObj = e.slots[0];
    setAlertShow("add");
    setSelectedDate({
      year: dateDataObj.getFullYear(),
      month: dateDataObj.getMonth(),
      date: dateDataObj.getDate(),
      day: dateDataObj.getDay(),
    });
  };

  const handleEventClick = (e) => {
    setAlertShow("delete");
    setSelectedEvent(e);
  };

  const eventStyleGetter = (event) => {
    var backgroundColor = event.resource.eventColor;
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
          selectedDate={selectedDate}
          setAllEvents={setAllEvents}
          allEvents={allEvents}
          teacherId={teacherId}
        />
      )}
      {alertShow === "delete" && (
        <DeleteTaskAlertCard
          alertShow={alertShow}
          setAlertShow={setAlertShow}
          setAllEvents={setAllEvents}
          allEvents={allEvents}
          teacherId={teacherId}
          selectedEvent={selectedEvent}
        />
      )}
    </CalendarContainer>
  );
}

export default TeacherManageCalendar;
