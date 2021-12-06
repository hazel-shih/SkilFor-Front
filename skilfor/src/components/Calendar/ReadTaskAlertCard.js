import styled from "styled-components";
import {
  AlertContainer,
  AlertTitle,
  AlertContent,
  AlertButton,
  CloseButton,
} from "./AddTaskAlertCard";
import close from "../../img/close.png";

const ContentContainer = styled.div``;

const WrapContent = styled(AlertContent)`
  overflow-wrap: break-word;
`;

function ReadTaskAlertCard({
  allEvents,
  setAllEvents,
  setAlertShow,
  selectedEvent,
}) {
  const handleCloseClick = () => {
    setAlertShow(null);
  };
  const handleDeleteEvent = () => {
    let confirmAlert = window.confirm("確定刪除此時段的課程嗎？");
    if (!confirmAlert) return;
    setAllEvents(allEvents.filter((event) => event.id !== selectedEvent.id));
    setAlertShow(false);
  };
  return (
    <AlertContainer color="#75A29E">
      <CloseButton src={close} onClick={handleCloseClick} />
      <AlertTitle>
        {selectedEvent.title} <br />
        {`(${selectedEvent.resource.timePeriod})`}
      </AlertTitle>
      <ContentContainer>
        {selectedEvent.resource.reserved ? (
          <AlertContent>
            預約學生：{selectedEvent.resource.reserved}
          </AlertContent>
        ) : (
          <AlertContent>預約狀態：尚無人預約</AlertContent>
        )}
        {selectedEvent.resource.studentNotes && (
          <WrapContent>
            學生備註：{selectedEvent.resource.studentNotes}
          </WrapContent>
        )}
        {!selectedEvent.resource.reserved && (
          <AlertButton color="#75A29E" onClick={handleDeleteEvent}>
            刪除此時段
          </AlertButton>
        )}
      </ContentContainer>
    </AlertContainer>
  );
}

export default ReadTaskAlertCard;
