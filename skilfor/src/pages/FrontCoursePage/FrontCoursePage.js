import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { AvatarContainer } from "../../components/Avatar/Avatar";
import FrontCourseCalendar from "./components/FrontCourseCalendar";
import CommentCard from "./components/CommentCard";
import {
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../../components/constants/breakpoints";
import { TEACHER_INFOS, COURSE_INFOS, COMMENTS } from "./constants";
import { sleep } from "../../utils";

const TeacherProfileWrapper = styled.section`
  padding: 180px 200px 232px 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 1000px) {
    padding: 180px 150px 232px 150px;
  }
  ${MEDIA_QUERY_MD} {
    padding: 180px 30px 232px 30px;
  }
`;
const RowContainer = styled.div`
  display: flex;
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TeacherAvatarContainer = styled(ColumnContainer)`
  align-items: center;
  justify-content: center;
  margin-right: 50px;
`;
const TeacherAvatar = styled(AvatarContainer)`
  width: 150px;
  height: 150px;
`;
const AvatarName = styled.p`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1.2rem;
  margin-top: 12px;
`;
const TeacherInfosContainer = styled(RowContainer)`
  justify-content: center;
  align-items: center;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`;
const CourseInfosContainer = styled(ColumnContainer)`
  color: ${(props) => props.theme.colors.grey_dark};
  margin-left: 15px;
  width: 100%;
`;
const ItemContainer = styled(ColumnContainer)`
  border-bottom: 2px dotted ${(props) => props.theme.colors.orange};
  margin-bottom: 20px;
`;
const ItemTitle = styled.h3`
  color: ${(props) => props.theme.colors.orange};
  font-size: 1.1rem;
  margin-bottom: 2px;
`;
const ItemContent = styled.p`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
  padding-left: 5px;
  margin-bottom: 5px;
`;
const SectionTitle = styled.h1`
  color: ${(props) => props.theme.colors.green_dark};
  font-size: 1.5rem;
  margin: 40px 0 10px 0;
`;
const SectionIntro = styled(ItemContent)`
  font-size: 1.1rem;
`;
const CommentsContainer = styled(ColumnContainer)``;
const NoStatusText = styled.p`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1.2rem;
`;

function FrontCoursePage() {
  window.scroll(0, 0);
  const { courseId } = useParams();
  const [teacherInfos, setTeacherInfos] = useState(null);
  const [courseInfos, setCourseInfos] = useState(null);
  const [comments, setComments] = useState(null);

  const FetchData = useCallback(async () => {
    await sleep(500);
    setTeacherInfos(TEACHER_INFOS);
    setCourseInfos(COURSE_INFOS);
    setComments(COMMENTS);
  }, []);
  useEffect(() => {
    FetchData();
  });

  return (
    <TeacherProfileWrapper>
      <TeacherInfosContainer>
        <TeacherAvatarContainer>
          {teacherInfos && (
            <>
              <TeacherAvatar imgSrc={teacherInfos.avatar} />
              <AvatarName>{teacherInfos.username}</AvatarName>
            </>
          )}
        </TeacherAvatarContainer>

        <CourseInfosContainer>
          <ItemContainer>
            <ItemTitle>領域</ItemTitle>
            {courseInfos && <ItemContent>{courseInfos.category}</ItemContent>}
          </ItemContainer>
          <ItemContainer>
            <ItemTitle>課程名稱</ItemTitle>
            {courseInfos && <ItemContent>{courseInfos.courseName}</ItemContent>}
          </ItemContainer>
          <ItemContainer>
            <ItemTitle>單堂價格</ItemTitle>
            {courseInfos && <ItemContent>{courseInfos.price}</ItemContent>}
          </ItemContainer>
        </CourseInfosContainer>
      </TeacherInfosContainer>
      <SectionTitle>課程時間</SectionTitle>
      <FrontCourseCalendar courseId={courseId} />
      <SectionTitle>課程介紹</SectionTitle>
      {courseInfos && (
        <SectionIntro>{courseInfos.courseDescription}</SectionIntro>
      )}
      <SectionTitle>課程評價</SectionTitle>
      <CommentsContainer>
        {comments && comments.length !== 0 ? (
          comments.map((comment) => (
            <CommentCard
              imgSrc={comment.imgSrc}
              name={comment.username}
              content={comment.content}
            />
          ))
        ) : (
          <NoStatusText>目前沒有任何評論</NoStatusText>
        )}
      </CommentsContainer>
    </TeacherProfileWrapper>
  );
}

export default FrontCoursePage;
