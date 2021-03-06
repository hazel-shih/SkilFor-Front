import styled from "styled-components";
import {
  AlertContainer,
  AlertTitle,
  AlertContent,
  AlertButton,
  CloseButton,
} from "../../../components/Calendar/AddTaskAlertCard";
import close from "../../../img/close.png";
import { addCartItem } from "../../../WebAPI";
import { useTranslation } from "next-i18next";
import { dateObjToDisplayTime } from "../../../components/Calendar/utils";
import { AuthCartContext } from "../../../contexts";
import { useContext } from "react";

const AddToCartButton = styled(AlertButton)`
  min-width: 100px;
`;
const WrapContent = styled(AlertContent)`
  overflow-wrap: break-word;
  font-size: 1rem;
`;
export const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TimeTitle = styled(AlertTitle)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.green_dark};
  :last-of-type {
    margin-bottom: 0px;
  }
`;

function ReserveAlertCard({ setAlertShow, selectedEvent, setApiError }) {
  const { t } = useTranslation();
  const { cartNumber, setCartNumber } = useContext(AuthCartContext);
  const handleCloseClick = () => {
    setAlertShow(null);
  };
  const handleReserveEvent = () => {
    addCartItem(setApiError, selectedEvent.scheduleId).then((json) => {
      if (json && !json.success && json.errMessage) {
        return setApiError(t(json.errMessage[0]));
      }
      if (json && json.success) alert(`${t("加入成功！請至購物車結帳吧！")}`);
      setCartNumber(Number(cartNumber) + 1);
    });
    setAlertShow(false);
  };
  return (
    <AlertContainer color="#75A29E">
      <CloseButton src={close} onClick={handleCloseClick} />
      <AlertTitle>{t("將這堂課加入購物車")}</AlertTitle>
      <TimeContainer>
        <TimeTitle>
          {t("開始：")}
          {dateObjToDisplayTime(new Date(selectedEvent.start))}
        </TimeTitle>
        <TimeTitle>
          {t("結束：")}
          {dateObjToDisplayTime(new Date(selectedEvent.end))}
        </TimeTitle>
      </TimeContainer>
      <WrapContent>
        {t(
          "溫馨提醒：加入購物車不代表預約成功，請至購物車完成扣點手續，我們才能幫你保留這堂課程喔！"
        )}
      </WrapContent>
      <AddToCartButton color="#75A29E" onClick={handleReserveEvent}>
        {t("加入購物車")}
      </AddToCartButton>
    </AlertContainer>
  );
}

export default ReserveAlertCard;
