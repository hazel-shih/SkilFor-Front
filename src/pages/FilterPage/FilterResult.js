import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FilterResultBlock = styled.div`
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
const CourseBlock = styled.div`
  color: ${(props) => props.theme.colors.grey_dark};
  padding: 8px 6px;
  width: 1200px;
  height: 200px;
  border: 2px dotted ${(props) => props.theme.colors.green_dark};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${MEDIA_QUERY_SM} {
    padding: 5px;
    width: 300px;
    height: 180px;
  }
`;
const CourseIntro = styled.div``;
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
const CourseDescription = styled.p`
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
  ${MEDIA_QUERY_SM} {
    height: 65px;
  }
`;
const CoursePoint = styled.p`
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

function FilterResult({ result }) {
  const { t } = useTranslation();
  return (
    <>
      <FilterResultBlock>
        <Avatar imgSrc={result.teacherAvatar} name={result.teacherName} />
        <CourseBlock>
          <CourseIntro>
            <CourseName>{result.courseName}</CourseName>
            <CourseDescription>{result.courseDescription}</CourseDescription>
          </CourseIntro>
          <BtnDiv>
            <CoursePoint>
              {t("點數")}：{result.price}
            </CoursePoint>
            <Btn to={`/course/${result.courseId}`}>{t("更多資訊")}</Btn>
          </BtnDiv>
        </CourseBlock>
      </FilterResultBlock>
    </>
  );
}

export default FilterResult;
