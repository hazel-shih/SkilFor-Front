import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddTaskAlertCard from "./AddTaskAlertCard";
import DeleteTaskAlertCard from "./DeleteTaskAlertCard";
import ReadTaskAlertCard from "./ReadTaskAlertCard";
import AlertCard from "../AlertCard";
import {
  getTeacherCourseInfos,
  getCalendarMonthEvents,
  deleteCalendarEvent,
} from "../../WebAPI";

const CalendarContainer = styled.div`
  position: relative;
`;

const deleteEvent = async (setApiError, eventId) => {
  let json = await deleteCalendarEvent(setApiError, eventId);
  if (!json.success) return setApiError("課程時間刪除失敗");
};

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
  const [apiError, setApiError] = useState(false);
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    getCalendarMonthEvents(setApiError, currentPage.getMonth() + 1).then(
      (json) => {
        if (!json.success) return setApiError("發生了一點錯誤，請稍後再試");
        let data = json.data.map((event) => {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
          return event;
        });
        setAllEvents(data);
      }
    );
  }, [currentPage]);
  const handleDateClick = (e) => {
    let dateDataObj = e.slots[0];
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
      if (!json.success) return setApiError("發生了一點錯誤，請稍後再試");
      setCourseList(json.data);
    };
    getCourseList(setApiError);
  }, [setApiError]);

  // // //點擊month week day
  // const handleViewChange = (e) => {
  //   console.log("handleViewChange: ", e);
  // };
  // //點擊上下個月 or month、week 時觸發
  // const handleRangeChange = (e) => {
  //   console.log(e);
  // };

  const handlePageChange = (currentMonthPage) => {
    setCurrentPage(currentMonthPage);
  };
  const handleAlertOkClick = () => {
    return setApiError(false);
  };
  return (
    <CalendarContainer>
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
        // onView={handleViewChange}
        // onRangeChange={handleRangeChange}
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
      {alertShow === "read" && (
        <ReadTaskAlertCard
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

export default TeacherManageCalendar;
