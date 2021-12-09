import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddTaskAlertCard from "./AddTaskAlertCard";
import ReadTaskAlertCard from "./ReadTaskAlertCard";
import AlertCard from "../AlertCard";
import { getTeacherCourseInfos, getCalendarMonthEvents } from "../../WebAPI";
import LoaderSpining from "../../components/LoaderSpining";

const CalendarContainer = styled.div`
  position: relative;
`;
const LoadingSquare = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  opacity: 0.8;
  z-index: 8;
`;
function TeacherManageCalendar() {
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
  const [apiError, setApiError] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  //拿當月的行程資料
  useEffect(() => {
    setLoading(true);
    getCalendarMonthEvents(setApiError, currentPage.getMonth() + 1).then(
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
  const handleDateClick = (e) => {
    let dateDataObj = e.slots[0];
    if (dateDataObj.getTime() < new Date().setHours(0, 0, 0, 0)) {
      alert("無法新增今日以前的課程！");
      return;
    }
    setAlertShow("add");
    let newEventTime = {
      year: dateDataObj.getFullYear(),
      month: dateDataObj.getMonth(),
      date: dateDataObj.getDate(),
      day: dateDataObj.getDay(),
    };
    setSelectedDate(newEventTime);
  };
  const handleEventClick = (e) => {
    setAlertShow("read");
    setSelectedEvent(e);
  };
  const eventStyleGetter = (event) => {
    var eventColor = event.resource.eventColor;
    var reserved = event.resource.reserved;
    var style;
    if (!reserved) {
      style = {
        border: `2px solid ${eventColor}`,
        backgroundColor: "white",
        color: "black",
        fontSize: "14px",
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
  useEffect(() => {
    const getCourseList = async (setApiError) => {
      let json = await getTeacherCourseInfos(setApiError, "audit=success");
      if (!json || !json.success)
        return setApiError("發生了一點錯誤，請稍後再試");
      setCourseList(json.data);
    };
    getCourseList(setApiError);
  }, [setApiError]);

  const handlePageChange = (currentMonthPage) => {
    setCurrentPage(currentMonthPage);
  };
  const handleAlertOkClick = () => {
    return setApiError(false);
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
        onSelectSlot={handleDateClick}
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
      {alertShow === "add" && (
        <AddTaskAlertCard
          alertShow={alertShow}
          setAlertShow={setAlertShow}
          selectedDate={selectedDate}
          setAllEvents={setAllEvents}
          allEvents={allEvents}
          setApiError={setApiError}
          courseList={courseList}
        />
      )}
      {alertShow === "read" && (
        <ReadTaskAlertCard
          setAllEvents={setAllEvents}
          allEvents={allEvents}
          alertShow={alertShow}
          setAlertShow={setAlertShow}
          selectedEvent={selectedEvent}
          setApiError={setApiError}
        />
      )}
    </CalendarContainer>
  );
}

export default TeacherManageCalendar;
