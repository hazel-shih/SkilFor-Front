import TeacherManageCalendar from "../../components/Calendar/TeacherManageCalendar";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import { useParams } from "react-router";

const TeacherCalendarWrapper = styled.section`
  padding: 186px 100px 232px 100px;
`;

function TeacherCalendarPage() {
  const { teacherId } = useParams();
  return (
    <TeacherCalendarWrapper>
      <PageTitle>行事曆</PageTitle>
      <TeacherManageCalendar teacherId={teacherId} />
    </TeacherCalendarWrapper>
  );
}

export default TeacherCalendarPage;
