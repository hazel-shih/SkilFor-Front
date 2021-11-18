import styled from "styled-components";
import Avatar from "../../components/Avatar";
import CourseCalendar from "../../components/Calendar/CourseCalendar";
import teacher from "../../img/teacher.jpeg";

const TeacherProfileWrapper = styled.section`
  padding: 196px 100px 182px 100px;
`;

const RowContainer = styled.div`
  display: flex;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TeacherInfosContainer = styled(ColumnContainer)`
  margin-right: 30px;
  width: 200px;
`;

const TeacherProfileContainer = styled(RowContainer)``;

const CourseInfosContainer = styled(ColumnContainer)`
  border: 2px solid ${(props) => props.theme.colors.orange};
  border-radius: 10px;
  color: ${(props) => props.theme.colors.grey_dark};
  height: 400px;
  margin-top: 20px;
`;

function TeacherProfilePage() {
  return (
    <TeacherProfileWrapper>
      <TeacherProfileContainer>
        <TeacherInfosContainer>
          <Avatar imgSrc={teacher} name="Kelly" />
          <CourseInfosContainer></CourseInfosContainer>
        </TeacherInfosContainer>
        <CourseCalendar courseName="一起來學習超潮的 Ruby 吧！" />
      </TeacherProfileContainer>
    </TeacherProfileWrapper>
  );
}

export default TeacherProfilePage;
