import styled from "styled-components";
import {
  AlertContainer,
  AlertTitle,
  AlertContent,
  AlertButton,
  CloseButton,
} from "../../../components/Calendar/AddTaskAlertCard";
import close from "../../../img/close.png";

const ContentContainer = styled.div``;

const WrapContent = styled(AlertContent)`
  overflow-wrap: break-word;
`;
const getDisplayDate = (dateObj) => {
  let dateStr = dateObj.toLocaleString();
  return dateStr.slice(0, dateStr.length - 3);
};

function ReserveAlertCard({
  allEvents,
  setAllEvents,
  setAlertShow,
  selectedEvent,
}) {
  const handleCloseClick = () => {
    setAlertShow(null);
  };
  const handleReserveEvent = () => {
    //打加入購物車 API
    alert("加入成功！");
    setAlertShow(false);
  };
  return (
    <AlertContainer color="#75A29E">
      <CloseButton src={close} onClick={handleCloseClick} />
      <AlertTitle>
        {selectedEvent.resource.courseName} <br />
        {getDisplayDate(selectedEvent.start)}
      </AlertTitle>
      <WrapContent>
        溫馨提醒：加入購物車不代表預約成功，請至購物車完成扣點手續，我們才能幫你保留這堂課程喔！
      </WrapContent>
      <AlertButton color="#75A29E" onClick={handleReserveEvent}>
        加入購物車
      </AlertButton>
    </AlertContainer>
  );
}

export default ReserveAlertCard;
