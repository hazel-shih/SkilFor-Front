import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReserveAlertCard from "./ReserveAlertCard";
import { COURSE_EVENT_LIST } from "../constants";
import { sleep } from "../../../utils";

const CalendarContainer = styled.div`
  position: relative;
`;
function FrontCourseCalendar({ courseId }) {
  const localizer = momentLocalizer(moment);
  const [alertShow, setAlertShow] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(false);
  const [currentPage, setCurrentPage] = useState(new Date());
  useEffect(() => {
    async function fetchData() {
      await sleep(100);
      COURSE_EVENT_LIST.map((event) => {
        event.resource.courseName = event.title;
        event.title = event.resource.timePeriod;
        return event;
      });
      setAllEvents(COURSE_EVENT_LIST);
    }
    fetchData();
  }, []);

  const handleEventClick = (e) => {
    setAlertShow("read");
    console.log(e);
    setSelectedEvent(e);
  };

  const eventStyleGetter = (event) => {
    var eventColor = event.resource.eventColor;

    var style = {
      border: `2px solid ${eventColor}`,
      backgroundColor: "white",
      color: "black",
      fontSize: "14px",
    };
    return {
      style: style,
    };
  };

  const handlePageChange = (currentMonthPage) => {
    setCurrentPage(currentMonthPage);
  };

  return (
    <CalendarContainer>
      <Calendar
        onSelectEvent={handleEventClick}
        selectable
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ width: "1000px", height: "500px" }}
        events={allEvents}
        views={["month"]}
        onNavigate={handlePageChange}
        date={currentPage}
        eventPropGetter={eventStyleGetter}
      />
      {alertShow === "read" && (
        <ReserveAlertCard
          setAllEvents={setAllEvents}
          allEvents={allEvents}
          alertShow={alertShow}
          setAlertShow={setAlertShow}
          selectedEvent={selectedEvent}
        />
      )}
    </CalendarContainer>
  );
}

export default FrontCourseCalendar;
