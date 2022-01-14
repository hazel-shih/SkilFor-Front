import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import StudentManageCalendar from "../../components/Calendar/StudentManageCalendar";
import { TeacherCalendarWrapper } from "../TeacherCalendarPage/TeacherCalendarPage";
import { useTranslation } from "next-i18next";
const StudentCalendarWrapper = styled(TeacherCalendarWrapper)``;

function StudentCalendarPage() {
  const { t } = useTranslation();
  window.scroll(0, 0);
  return (
    <StudentCalendarWrapper>
      <PageTitle>{t("行事曆")}</PageTitle>
      <StudentManageCalendar />
    </StudentCalendarWrapper>
  );
}

export default StudentCalendarPage;
