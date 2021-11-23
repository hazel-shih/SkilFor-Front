import {
  RowContainer,
  AlertContainer,
  AlertTitle,
  AlertContent,
  AlertButton,
  CloseButton,
} from "./AddTaskAlertCard";
import close from "../../img/close.png";

function DeleteTaskAlertCard({
  setAlertShow,
  setAllEvents,
  allEvents,
  courseName,
  selectedEvent,
}) {
  const handleDeleteEvent = () => {
    setAlertShow("delete");
  };
  const handleCloseClick = () => {
    setAlertShow(null);
  };
  return (
    <AlertContainer color="#A45D5D">
      <CloseButton src={close} onClick={handleCloseClick} />
      <AlertTitle>
        刪除
        {` ${
          selectedEvent.start.getMonth() + 1
        }/${selectedEvent.start.getDate()} `}
        的課程時段
      </AlertTitle>
      <AlertContent>確定要刪除 {selectedEvent.title} 這個時段嗎？</AlertContent>
      <AlertButton onClick={handleDeleteEvent} color="#A45D5D">
        確定刪除
      </AlertButton>
    </AlertContainer>
  );
}

export default DeleteTaskAlertCard;
