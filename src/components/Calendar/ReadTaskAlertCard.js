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
import { useTranslation } from "react-i18next";

const ContentContainer = styled.div``;

const WrapContent = styled(AlertContent)`
  overflow-wrap: break-word;
`;
const getDisplayDate = (dateObj) => {
  let dateStr = dateObj.toLocaleString();
  return dateStr.slice(0, dateStr.length - 3);
};

function ReadTaskAlertCard({
  allEvents,
  setAllEvents,
  setAlertShow,
  selectedEvent,
  setApiError,
}) {
  const { t } = useTranslation();
  const handleCloseClick = () => {
    setAlertShow(null);
  };
  const handleDeleteEvent = (selectedEvent) => {
    let confirmAlert;
    if (selectedEvent.resource.reserved) {
      confirmAlert = window.confirm(
        `${t("確定取消此時段的課程嗎？系統將通知預約的學生您已取消這堂課！")}`
      );
    } else {
      confirmAlert = window.confirm(`${t("確定刪除此時段的課程嗎？")}`);
    }
    if (!confirmAlert) return;
    deleteCalendarEvent(setApiError, selectedEvent.id).then((json) => {
      if (!json) return setApiError("目前無法刪除課程時段，請稍後再試");
      if (json && !json.success) return setApiError(json.errMessage[0]);
      setAllEvents(allEvents.filter((event) => event.id !== selectedEvent.id));
    });
    setAlertShow(false);
  };
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
        {selectedEvent.resource.reserved ? (
          <>
            <AlertContent>
              {t("預約學生：")}
              {selectedEvent.resource.reserved}
            </AlertContent>
            <AlertContent>
              {t("課程視訊連結：")}
              https://explore.zoom.us/zh-tw/products/meetings/
            </AlertContent>
          </>
        ) : (
          <AlertContent>
            {t("預約狀態：")}
            {t("尚無人預約")}
          </AlertContent>
        )}
        {selectedEvent.resource.studentNotes && (
          <WrapContent>
            {t("學生備註：")}
            {selectedEvent.resource.studentNotes}
          </WrapContent>
        )}
        <AlertButton
          color="#75A29E"
          onClick={() => handleDeleteEvent(selectedEvent)}
        >
          {selectedEvent.resource.reserved ? t("取消此時段") : t("刪除此時段")}
        </AlertButton>
      </ContentContainer>
    </AlertContainer>
  );
}

export default ReadTaskAlertCard;
