import CourseCalendar from "../../components/Calendar/CourseCalendar";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";

const TeacherCalendarWrapper = styled.section`
  padding: 186px 100px 232px 100px;
`;

function TeacherCalendarPage() {
  return (
    <TeacherCalendarWrapper>
      <PageTitle>行事曆</PageTitle>
      <CourseCalendar />
    </TeacherCalendarWrapper>
  );
}

export default TeacherCalendarPage;
