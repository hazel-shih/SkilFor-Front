import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReserveAlertCard from "./ReserveAlertCard";
import { COURSE_EVENT_LIST } from "../constants";
import { sleep } from "../../../utils";
import { getFrontCalendarMonthEvents } from "../../../WebAPI";

const CalendarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
function FrontCourseCalendar({ courseId, setApiError }) {
  const localizer = momentLocalizer(moment);
  const [alertShow, setAlertShow] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(false);
  const [currentPage, setCurrentPage] = useState(new Date());
  //拿課程行事曆資料
  useEffect(() => {
    async function fetchData() {
      let json = await getFrontCalendarMonthEvents(courseId, setApiError);
      if (!json || !json.success) {
        return setApiError("發生了一點錯誤，請稍後再試");
      }
      setAllEvents(json.data);
    }
    fetchData();
  }, [courseId, setApiError]);

  const handleEventClick = (e) => {
    setAlertShow("read");
    setSelectedEvent(e);
  };

  const eventStyleGetter = (event) => {
    var eventColor = event.resource.eventColor;
    var style = {
      border: `2px solid ${eventColor}`,
      backgroundColor: "white",
      color: "black",
      fontSize: "12px",
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
        style={{ width: "100vw", height: "600px" }}
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
