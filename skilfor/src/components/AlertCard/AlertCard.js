import {
  AlertContainer,
  AlertTitle,
  AlertContent,
  AlertButton,
} from "../Calendar/AddTaskAlertCard";

function AlertCard({ color, title, content, handleAlertOkClick }) {
  return (
    <AlertContainer color={color}>
      <AlertTitle>{title}</AlertTitle>
      <AlertContent>{content}</AlertContent>
      <AlertButton color={color} onClick={handleAlertOkClick}>
        OK
      </AlertButton>
    </AlertContainer>
  );
}

export default AlertCard;
