import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { AvatarContainer } from "../../components/Avatar/Avatar";
import FrontCourseCalendar from "./components/FrontCourseCalendar";
// import CommentCard from "./components/CommentCard";
import {
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../../components/constants/breakpoints";
// import { nanoid } from "nanoid";
import AlertCard from "../../components/AlertCard";
import { getFrontCourseInfos } from "../../WebAPI";
import { useTranslation } from "next-i18next";
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
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    margin-right: 0px;
  }
`;
const TeacherAvatar = styled(AvatarContainer)`
  width: 150px;
  height: 150px;
`;
const AvatarName = styled.p`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1.4rem;
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
  width: 70%;
`;
const ItemContainer = styled(ColumnContainer)`
  border-bottom: 2px dotted ${(props) => props.theme.colors.orange};
  margin-bottom: 20px;
`;
const ItemTitle = styled.h3`
  color: ${(props) => props.theme.colors.orange};
  font-size: 1.2rem;
  margin-bottom: 2px;
`;
const ItemContent = styled.p`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1.2rem;
  padding-left: 5px;
  margin-bottom: 5px;
  overflow-wrap: break-word;
`;
const SectionTitle = styled.h1`
  color: ${(props) => props.theme.colors.green_dark};
  font-size: 1.5rem;
  margin: 40px 0 10px 0;
`;
const SectionIntro = styled(ItemContent)`
  font-size: 1.1rem;
  white-space: pre-wrap;
`;
// const CommentsContainer = styled(ColumnContainer)``;
// const NoStatusText = styled.p`
//   color: ${(props) => props.theme.colors.grey_dark};
//   font-size: 1.2rem;
// `;

function FrontCoursePage() {
  window.scroll(0, 0);
  const { t } = useTranslation();
  const { courseId } = useParams();
  const [infos, setInfos] = useState(null);
  // const [comments, setComments] = useState(null);
  const [apiError, setApiError] = useState(null);
  //拿老師與課程資訊資料
  useEffect(() => {
    async function fetchData() {
      let json = await getFrontCourseInfos(courseId, setApiError);
      if (!json || !json.success) {
        return setApiError(`${t("發生了一點錯誤，請稍後再試")}`);
      }
      setInfos(json.data);
    }
    fetchData();
  }, [courseId, setApiError, t]);

  const handleAlertOkClick = () => {
    setApiError(false);
    return;
  };
  return (
    <TeacherProfileWrapper>
      {apiError && (
        <AlertCard
          color="#A45D5D"
          title="錯誤"
          content={apiError}
          handleAlertOkClick={handleAlertOkClick}
        />
      )}
      <TeacherInfosContainer>
        <TeacherAvatarContainer>
          {infos && (
            <>
              <TeacherAvatar imgSrc={infos.avatar} />
              <AvatarName>{infos.username}</AvatarName>
            </>
          )}
        </TeacherAvatarContainer>
        <CourseInfosContainer>
          <ItemContainer>
            <ItemTitle>{t("領域")}</ItemTitle>
            {infos && <ItemContent>{infos.category}</ItemContent>}
          </ItemContainer>
          <ItemContainer>
            <ItemTitle>{t("課程名稱")}</ItemTitle>
            {infos && <ItemContent>{infos.courseName}</ItemContent>}
          </ItemContainer>
          <ItemContainer>
            <ItemTitle>{t("單堂點數")}</ItemTitle>
            {infos && <ItemContent>{infos.price}</ItemContent>}
          </ItemContainer>
        </CourseInfosContainer>
      </TeacherInfosContainer>
      <SectionTitle>{t("課程時間")}</SectionTitle>
      <FrontCourseCalendar courseId={courseId} />
      <SectionTitle>{t("課程介紹")}</SectionTitle>
      {infos && <SectionIntro>{infos.courseDescription}</SectionIntro>}
      {/* <SectionTitle>{t("課程評價")}</SectionTitle> */}
      {/* <CommentsContainer>
        {comments && comments.length !== 0 ? (
          comments.map((comment) => (
            <CommentCard
              key={nanoid()}
              imgSrc={comment.imgSrc}
              name={comment.username}
              content={comment.content}
            />
          ))
        ) : (
          <NoStatusText>{t("目前沒有任何評論")}</NoStatusText>
        )}
      </CommentsContainer> */}
    </TeacherProfileWrapper>
  );
}

export default FrontCoursePage;
