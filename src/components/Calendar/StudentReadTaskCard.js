import styled from "styled-components";
import {
  AlertContainer,
  AlertTitle,
  AlertContent,
  AlertButton,
  CloseButton,
} from "./AddTaskAlertCard";
import close from "../../img/close.png";
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
  setAlertShow,
  selectedEvent,
  handleCancelEvent,
  handleDeleteEvent,
}) {
  const handleCloseClick = () => {
    setAlertShow(null);
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
        {selectedEvent.exist && (
          <>
            <AlertContent>
              <NoneStyleLink to={`/course/${selectedEvent.courseId}`}>
                瀏覽此課程頁面 ➜
              </NoneStyleLink>
            </AlertContent>
            <AlertContent>
              課程視訊連結：https://explore.zoom.us/zh-tw/products/meetings/
            </AlertContent>
            {selectedEvent.start.getTime() - new Date().getTime() >
              86400000 && (
              <AlertButton
                color="#75A29E"
                onClick={() => handleCancelEvent(selectedEvent.id)}
              >
                取消此時段
              </AlertButton>
            )}
            {selectedEvent.end.getTime() < new Date().getTime() && (
              <AlertButton
                color="#75A29E"
                onClick={() => handleDeleteEvent(selectedEvent.id)}
              >
                刪除此筆課程紀錄
              </AlertButton>
            )}
          </>
        )}
        {!selectedEvent.exist && (
          <AlertContent>
            老師臨時無法上課，因此取消了此堂課程，系統已經自動將點數退還給你囉！
          </AlertContent>
        )}
      </ContentContainer>
    </AlertContainer>
  );
}

export default StudentReadTaskCard;
