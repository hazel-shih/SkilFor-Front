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
import { useTranslation } from "react-i18next";
import { dateObjToDisplayTime } from "./utils";

const ContentContainer = styled.div``;

const getDisplayDate = (dateObj) => {
  let dateStr = dateObjToDisplayTime(dateObj);
  return dateStr;
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
  const { t } = useTranslation();
  return (
    <AlertContainer color="#75A29E">
      <CloseButton src={close} onClick={handleCloseClick} />
      <AlertTitle>{selectedEvent.title}</AlertTitle>
      <TimeContainer>
        <TimeTitle>
          {t("開始：")}
          {getDisplayDate(selectedEvent.start)}
        </TimeTitle>
        <TimeTitle>
          {t("結束：")}
          {getDisplayDate(selectedEvent.end)}
        </TimeTitle>
      </TimeContainer>
      <ContentContainer>
        {selectedEvent.exist && (
          <>
            <AlertContent>
              <NoneStyleLink to={`/course/${selectedEvent.courseId}`}>
                {t("瀏覽此課程頁面")} ➜
              </NoneStyleLink>
            </AlertContent>
            <AlertContent>
              {t("課程視訊連結：")}
              https://explore.zoom.us/zh-tw/products/meetings/
            </AlertContent>
            {selectedEvent.start.getTime() - new Date().getTime() >
              86400000 && (
              <AlertButton
                color="#75A29E"
                onClick={() => handleCancelEvent(selectedEvent.id)}
              >
                {t("取消此時段")}
              </AlertButton>
            )}
            {selectedEvent.end.getTime() < new Date().getTime() && (
              <AlertButton
                color="#75A29E"
                onClick={() => handleDeleteEvent(selectedEvent.id)}
              >
                {t("刪除此筆課程紀錄")}
              </AlertButton>
            )}
          </>
        )}
        {!selectedEvent.exist && (
          <>
            <AlertContent>
              {t(
                "老師臨時無法上課，因此取消了此堂課程，系統已經自動將點數退還給你囉！"
              )}
            </AlertContent>
            <AlertButton
              color="#75A29E"
              onClick={() => handleDeleteEvent(selectedEvent.id)}
            >
              {t("刪除此筆課程紀錄")}
            </AlertButton>
          </>
        )}
      </ContentContainer>
    </AlertContainer>
  );
}

export default StudentReadTaskCard;
