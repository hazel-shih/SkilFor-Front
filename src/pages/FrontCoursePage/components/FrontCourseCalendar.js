import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReserveAlertCard from "./ReserveAlertCard";
import { getFrontCalendarMonthEvents } from "../../../WebAPI";
import { AuthContext } from "../../../contexts";
import LoaderSpining from "../../../components/LoaderSpining";
import { LoadingSquare } from "../../../components/Calendar/TeacherManageCalendar";
import AlertCard from "../../../components/AlertCard";
import { useTranslation } from "next-i18next";
const CalendarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
function FrontCourseCalendar({ courseId }) {
  const { t } = useTranslation();
  const localizer = momentLocalizer(moment);
  const [alertShow, setAlertShow] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(false);
  const [currentPage, setCurrentPage] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { user } = useContext(AuthContext);
  //拿課程行事曆資料
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      let json = await getFrontCalendarMonthEvents(
        courseId,
        currentPage.getMonth() + 1,
        setApiError
      );
      if (!json || !json.success) {
        setLoading(false);
        return setApiError(`${t("發生了一點錯誤，請稍後再試")}`);
      }
      if (json.data) {
        let eventsData = json.data.map((event) => {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
          return event;
        });
        setAllEvents(eventsData);
        setLoading(false);
      }
    }
    fetchData();
  }, [courseId, setApiError, currentPage, t]);
  const handleEventClick = (e) => {
    if (!user || (user && user.identity !== "student")) {
      return alert(
        `${t("學生身份才能使用課程預約功能！請以學生身份登入系統再試一次。")}`
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
  const handleAlertOkClick = () => {
    setApiError(false);
    return;
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
        style={{ width: "100vw", height: "600px" }}
        events={allEvents}
        views={["month", "day", "week"]}
        onNavigate={handlePageChange}
        date={currentPage}
        eventPropGetter={eventStyleGetter}
      />
      {alertShow === "read" && (
        <ReserveAlertCard
          setAlertShow={setAlertShow}
          selectedEvent={selectedEvent}
          setApiError={setApiError}
        />
      )}
    </CalendarContainer>
  );
}

export default FrontCourseCalendar;
