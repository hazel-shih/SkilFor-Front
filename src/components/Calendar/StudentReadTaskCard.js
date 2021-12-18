import styled from "styled-components";
import {
  AlertContainer,
  AlertTitle,
  AlertContent,
  AlertButton,
  CloseButton,
} from "./AddTaskAlertCard";
import close from "../../img/close.png";
import { deleteCalendarEvent } from "../../WebAPI";
import {
  TimeTitle,
  TimeContainer,
} from "../../pages/FrontCoursePage/components/ReserveAlertCard";
import { Link } from "react-router-dom";

const ContentContainer = styled.div``;

const getDisplayDate = (dateObj) => {
  let dateStr = dateObj.toLocaleString();
  return dateStr.slice(0, dateStr.length - 3);
};
const NoneStyleLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.grey_dark};
  :hover {
    opacity: 0.8;
  }
`;

function StudentReadTaskCard({
  allEvents,
  setAllEvents,
  setAlertShow,
  selectedEvent,
  setApiError,
}) {
  const handleCloseClick = () => {
    setAlertShow(null);
  };
  const handleCancelEvent = () => {
    let confirmAlert = window.confirm("確定刪除取消此時段的課程嗎？");
    if (!confirmAlert) return;
    deleteCalendarEvent(setApiError, selectedEvent.id).then((json) => {
      if (!json || !json.success) return setApiError("課程取消失敗");
      setAllEvents(allEvents.filter((event) => event.id !== selectedEvent.id));
    });
    setAlertShow(false);
  };
  return (
    <AlertContainer color="#75A29E">
      <CloseButton src={close} onClick={handleCloseClick} />
      <AlertTitle>{selectedEvent.title}</AlertTitle>
      <TimeContainer>
        <TimeTitle>開始：{getDisplayDate(selectedEvent.start)}</TimeTitle>
        <TimeTitle>結束：{getDisplayDate(selectedEvent.end)}</TimeTitle>
      </TimeContainer>
      <ContentContainer>
        <AlertContent>
          <NoneStyleLink to={`/course/${selectedEvent.courseId}`}>
            瀏覽此課程頁面 ➜
          </NoneStyleLink>
        </AlertContent>
        <AlertContent>
          課程視訊連結：https://explore.zoom.us/zh-tw/products/meetings/
        </AlertContent>
        {selectedEvent.start.getTime() - new Date().getTime() > 86400000 && (
          <AlertButton color="#75A29E" onClick={handleCancelEvent}>
            取消此時段
          </AlertButton>
        )}
      </ContentContainer>
    </AlertContainer>
  );
}

export default StudentReadTaskCard;
