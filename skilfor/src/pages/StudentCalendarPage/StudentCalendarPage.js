import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import StudentManageCalendar from "../../components/Calendar/StudentManageCalendar";
import { TeacherCalendarWrapper } from "../TeacherCalendarPage/TeacherCalendarPage";

const StufentCalendarWrapper = styled(TeacherCalendarWrapper)``;

function StudentCalendarPage() {
  window.scroll(0, 0);
  return (
    <StufentCalendarWrapper>
      <PageTitle>行事曆</PageTitle>
      <StudentManageCalendar />
    </StufentCalendarWrapper>
  );
}

export default StudentCalendarPage;
