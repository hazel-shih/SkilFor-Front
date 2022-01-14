import TeacherManageCalendar from "../../components/Calendar/TeacherManageCalendar";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import { useParams } from "react-router";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import { useTranslation } from "next-i18next";
export const TeacherCalendarWrapper = styled.section`
  padding: 166px 50px 232px 50px;
  ${MEDIA_QUERY_SM} {
    padding: 150px 10px 230px 10px;
    text-align: center;
  }
`;

function TeacherCalendarPage() {
  const { t } = useTranslation();
  window.scroll(0, 0);
  const { teacherId } = useParams();
  return (
    <TeacherCalendarWrapper>
      <PageTitle>{t("行事曆")}</PageTitle>
      <TeacherManageCalendar teacherId={teacherId} />
    </TeacherCalendarWrapper>
  );
}

export default TeacherCalendarPage;
