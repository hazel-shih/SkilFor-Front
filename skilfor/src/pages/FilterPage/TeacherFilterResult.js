import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";

const TeacherBlock = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  height: 200px;
  width: 560px;
  margin: 25px 20px;
  ${MEDIA_QUERY_SM} {
    max-width: 300px;
    display: block;
    height: 370px;
    margin: 15px 0px;
    :first-child {
      margin: 10px 0px 15px;
    }
  }
`;

/*const EmptyBlock = styled.div`
  height: 200px;
  width: 560px;
  margin: 25px 20px;
  ${MEDIA_QUERY_SM} {
    max-width: 300px;
    display: block;
    margin: 30px 0px;
`;*/

const CourseBlock = styled.div`
  color: ${(props) => props.theme.colors.grey_dark};
  padding: 8px 6px;
  width: 1200px;
  height: 200px;
  border: 2px dotted ${(props) => props.theme.colors.green_dark};
  position: relative;
  ${MEDIA_QUERY_SM} {
    padding: 5px;
    width: 300px;
    height: 180px;
  }
`;

const CourseName = styled.h2`
  font-size: 1.3rem;
  text-align: left;
  padding: 4px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey_light};
  ${MEDIA_QUERY_SM} {
    margin: 5px;
    font-size: 1.2rem;
  }
`;

const CourseIntro = styled.p`
  line-height: 1.8rem;
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-align: left;
  margin: 10px 15px 8px;
  align-items: center;
  ${MEDIA_QUERY_SM} {
    line-height: 1.5rem;
    font-size: 1rem;
    margin: 10px 10px 4px;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2px 8px 2px 0px;
  height: 100px;
  ${MEDIA_QUERY_SM} {
    height: 65px;
  }
`;

const CoursePrice = styled.p`
  text-align: left;
  font-weight: bold;
  padding: 10px 0px 10px 10px;
  color: ${(props) => props.theme.colors.green_dark};
  ${MEDIA_QUERY_SM} {
    padding: 6px 0px 6px 6px;
  }
`;

const Btn = styled(Link)`
  border-radius: 40px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.orange};
  color: white;
  width: 95px;
  padding: 10px 0px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.2rem;
  text-decoration: none;
  :hover {
    opacity: 0.9;
    font-weight: bold;
  }
  ${MEDIA_QUERY_SM} {
    padding: 6px 0px;
    width: 80px;
    font-size: 1rem;
  }
`;

function TeacherFilterResult({ result }) {
  return (
    <>
      <TeacherBlock>
        <Avatar imgSrc={result.teacherAvatar} name={result.teacherName} />
        <CourseBlock>
          <CourseName>{result.courseName}</CourseName>
          <CourseIntro>{result.courseDescription}</CourseIntro>
          <BtnDiv>
            <CoursePrice>{result.price}</CoursePrice>
            <Btn to={`/teacher/profile/${result.teacherId}`}>更多資訊</Btn>
          </BtnDiv>
        </CourseBlock>
      </TeacherBlock>
    </>
  );
}

export default TeacherFilterResult;
