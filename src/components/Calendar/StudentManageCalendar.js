import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import StudentReadTaskCard from "./StudentReadTaskCard";
import AlertCard from "../AlertCard";
import {
  getStudentCalendarMonthEvents,
  cancelStudentCalendarEvent,
  deleteStudentCalendarEvent,
} from "../../WebAPI";
import LoaderSpining from "../../components/LoaderSpining";
import { CalendarContainer, LoadingSquare } from "./TeacherManageCalendar";

function StudentManageCalendar() {
  const localizer = momentLocalizer(moment);
  const [alertShow, setAlertShow] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(false);
  const [currentPage, setCurrentPage] = useState(new Date());
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  //拿當月的行程資料
  useEffect(() => {
    setLoading(true);
    getStudentCalendarMonthEvents(setApiError, currentPage.getMonth() + 1).then(
      (json) => {
        if (!json || !json.success) {
          setLoading(false);
          return setApiError("發生了一點錯誤，請稍後再試");
        }
        let data = json.data.map((event) => {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
          return event;
        });
        setAllEvents(data);
        setLoading(false);
      }
    );
  }, [currentPage]);
  const handleEventClick = (e) => {
    setAlertShow("read");
    setSelectedEvent(e);
  };
  const handlePageChange = (currentMonthPage) => {
    setCurrentPage(currentMonthPage);
  };
  const handleAlertOkClick = () => {
    return setApiError(false);
  };
  const eventStyleGetter = (event) => {
    var eventColor = event.resource.eventColor;
    let style;
    if (new Date(event.end).getTime() < new Date().getTime() || !event.exist) {
      style = {
        border: `2px solid #e6e6e6`,
        backgroundColor: "#e6e6e6",
        color: "#AAAAAA",
        fontSize: "12px",
      };
    } else {
      style = {
        border: `2px solid ${eventColor}`,
        backgroundColor: eventColor,
        color: "white",
        fontSize: "14px",
      };
    }
    return {
      style: style,
    };
  };
  const handleCancelEvent = (eventId) => {
    let confirm = window.confirm("確認要取消這堂課嗎？");
    if (!confirm) return;
    cancelStudentCalendarEvent(setApiError, eventId).then((json) => {
      if (!json || !json.success) {
        setLoading(false);
        return setApiError("目前無法取消課程，請稍後再試");
      }
      setAlertShow(false);
      setAllEvents(allEvents.filter((event) => event.id !== eventId));
      alert("課程取消成功！我們已經將此堂課的課程點數退還給你囉！");
    });
  };
  const handleDeleteEvent = (eventId) => {
    let confirm = window.confirm("確認要刪除這筆課程紀錄嗎？");
    if (!confirm) return;
    deleteStudentCalendarEvent(setApiError, eventId).then((json) => {
      if (!json || !json.success) {
        setLoading(false);
        return setApiError("目前無法刪除這筆課程紀錄，請稍後再試");
      }
      setAlertShow(false);
      setAllEvents(allEvents.filter((event) => event.id !== eventId));
    });
  };
  return (
    <CalendarContainer>
      {loading && (
        <>
          <LoadingSquare />
          <LoaderSpining />
        </>
      )}
      {apiError && (
        <AlertCard
          color="#A45D5D"
          title="錯誤"
          content={apiError}
          handleAlertOkClick={handleAlertOkClick}
        />
      )}
      <Calendar
        onSelectEvent={handleEventClick}
        selectable
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
        events={allEvents}
        views={["month", "day", "week"]}
        onNavigate={handlePageChange}
        date={currentPage}
        eventPropGetter={eventStyleGetter}
      />
      {alertShow === "read" && (
        <StudentReadTaskCard
          setAlertShow={setAlertShow}
          selectedEvent={selectedEvent}
          handleCancelEvent={handleCancelEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      )}
    </CalendarContainer>
  );
}

export default StudentManageCalendar;
