import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReserveAlertCard from "./ReserveAlertCard";
// import { sleep } from "../../../utils";
import { getFrontCalendarMonthEvents } from "../../../WebAPI";
import { AuthContext } from "../../../contexts";

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
  const { user } = useContext(AuthContext);
  console.log(user);

  //拿課程行事曆資料
  useEffect(() => {
    async function fetchData() {
      let json = await getFrontCalendarMonthEvents(
        courseId,
        currentPage.getMonth() + 1,
        setApiError
      );
      if (!json || !json.success) {
        return setApiError("發生了一點錯誤，請稍後再試");
      }
      setAllEvents(json.data);
    }
    fetchData();
  }, [courseId, setApiError, currentPage]);
  const handleEventClick = (e) => {
    if (user && user.identity !== "student") {
      return alert(
        "學生身份才能使用課程預約功能！請以學生身份登入系統再試一次。"
      );
    }
    if (
      e.resource.reserved ||
      new Date(e.start).getTime() < new Date().getTime()
    ) {
      return;
    }
    setAlertShow("read");
    setSelectedEvent(e);
  };
  const eventStyleGetter = (event) => {
    let style;
    let eventColor = event.resource.eventColor;
    if (
      event.resource.reserved ||
      new Date(event.start).getTime() < new Date().getTime()
    ) {
      style = {
        border: `2px solid #e6e6e6`,
        backgroundColor: "#e6e6e6",
        color: "#AAAAAA",
        fontSize: "12px",
      };
    } else {
      style = {
        border: `2px solid ${eventColor}`,
        backgroundColor: "white",
        color: "black",
        fontSize: "12px",
      };
    }

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
