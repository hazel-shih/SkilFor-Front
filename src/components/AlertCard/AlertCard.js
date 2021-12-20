import {
  AlertContainer,
  AlertTitle,
  AlertContent,
  AlertButton,
} from "../Calendar/AddTaskAlertCard";
import styled from "styled-components";

const ErrorAlertContainer = styled(AlertContainer)`
  z-index: 10;
`;

function AlertCard({ color, title, content, handleAlertOkClick }) {
  return (
    <ErrorAlertContainer color={color}>
      <AlertTitle>{title}</AlertTitle>
      <AlertContent>{content}</AlertContent>
      <AlertButton color={color} onClick={handleAlertOkClick}>
        OK
      </AlertButton>
    </ErrorAlertContainer>
  );
}

export default AlertCard;
