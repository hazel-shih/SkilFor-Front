import React, { useState } from "react";
import styled from "styled-components";
import FormItem from "./FormItem";
import AvatarBlock from "../../components/AvatarBlock";
import PageTitle from "../../components/PageTitle";
import happy from "../../img/happy.png";
import sad from "../../img/sad.png";

//styled component
const TeacherManageWrapper = styled.section`
  padding: 186px 100px 232px 100px;
`;

const RowContainer = styled.div`
  display: flex;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TeacherManageContainer = styled(RowContainer)`
  margin-bottom: 30px;
`;

const UserInfoContainer = styled(ColumnContainer)`
  background: ${(props) => props.theme.colors.grey_bg};
  min-width: 200px;
  margin-right: 50px;
`;

const PageBtnsContainer = styled(ColumnContainer)`
  padding: 20px 25px;
`;

const PageBtn = styled.button`
  color: ${(props) => (props.isClick ? "white" : props.theme.colors.grey_dark)};
  background: ${(props) => props.isClick && props.theme.colors.orange};
  font-size: 1.1rem;
  border: none;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const FormContainer = styled(ColumnContainer)`
  width: 100%;
  min-height: 500px;
  border: 1px solid ${(props) => props.theme.colors.grey_dark};
  border-radius: 10px;
  padding: 20px;
`;

const CourseBtnsContainer = styled(RowContainer)`
  margin-bottom: 25px;
`;

const CourseButton = styled.button`
  padding: 6px 15px;
  font-size: 1.1rem;
  border-radius: 50px;
  color: ${(props) => props.theme.colors.grey_dark};
  border: 2px solid ${(props) => props.theme.colors.grey_dark};
  background: white;
  cursor: pointer;
  :not(:last-child) {
    margin-right: 20px;
  }
  ${(props) =>
    props.isClick &&
    `background: ${props.theme.colors.green_dark}; color:white; border:2px solid ${props.theme.colors.green_dark}`}
`;

const SectionText = styled.h3`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.green_dark};
  margin: 10px 0 20px 0;
`;

const PassContainer = styled(RowContainer)`
  align-items: center;
  background: ${(props) =>
    props.success
      ? props.theme.colors.success_bg
      : props.fail
      ? props.theme.colors.error_bg
      : props.theme.colors.warn_bg};
  padding: 15px;
  margin-bottom: 10px;
`;

const PassText = styled.p`
  color: ${(props) =>
    props.success
      ? props.theme.colors.success
      : props.fail
      ? props.theme.colors.error
      : props.theme.colors.warn};
  font-size: 1.2rem;
`;

const PassImgBlock = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

//fake data
const COURSE_MAPPING = ["程式", "音樂", "數學"];
const COURSE_INFOS = {
  category: "程式",
  courseName: "一起來學習超潮的 Ruby 吧！",
  courseIntro:
    "經過幾年的發展，Spring Boot 的功能已經非常成熟，並且在近幾年軟體業盛行微服務（microservice）的設計模式下，也帶動越來越多企業選擇使用 Spring Boot 作為主流的開發工具。Spring Boot 之所以能夠成為目前業界最流行的開發工具，原因就在於 Spring Boot 憑借著 簡化 Spring 開發 以及 快速整合主流框架 的優點，讓工程師們可以更專注的在解決問題上，進而提升了前期開發和後續部署的效率。",
  price: 1000,
};

function TeacherManagePage() {
  const [page, setPage] = useState("self");
  const [courseType, setCourseType] = useState(COURSE_MAPPING[0]);
  const handlePageBtnClick = (e) => {
    setPage(e.target.id);
  };
  const handleCourseBtnClick = (e) => {
    setCourseType(e.target.id);
  };
  return (
    <TeacherManageWrapper>
      <PageTitle>後台管理</PageTitle>
      <TeacherManageContainer>
        <UserInfoContainer>
          <AvatarBlock identity="teacher" />
          <PageBtnsContainer>
            <PageBtn
              id="self"
              onClick={handlePageBtnClick}
              isClick={page === "self"}
            >
              個人資料
            </PageBtn>
            <PageBtn
              id="course"
              onClick={handlePageBtnClick}
              isClick={page === "course"}
            >
              課程資料
            </PageBtn>
          </PageBtnsContainer>
        </UserInfoContainer>
        <FormContainer>
          {page === "self" && (
            <>
              <FormItem itemName="Name" value="Kelly" />
              <FormItem itemName="Avatar" value="https://Kelly.png" />
              <FormItem itemName="Email" value="kelly123@gmail.com" />
            </>
          )}
          {page === "course" && (
            <>
              <PassContainer success>
                <PassImgBlock src={happy} />
                <PassText success>
                  課程已通過審核，將你的課程頁面發佈吧！
                  <label for="true">我要發布</label>
                  <input type="radio" name="publish" id="true" value="true" />
                  <label for="false">不發布</label>
                  <input type="radio" name="publish" id="false" value="false" />
                </PassText>
              </PassContainer>
              <PassContainer warn>
                <PassText warn>
                  課程審核中，審核成功後將以電子郵件通知您
                </PassText>
              </PassContainer>
              <PassContainer fail>
                <PassImgBlock src={sad} />
                <PassText fail>
                  課程未通過審核，請調整課程資訊後再重新送審
                </PassText>
              </PassContainer>
              <SectionText>課程資訊</SectionText>
              {COURSE_MAPPING.length !== 0 && (
                <CourseBtnsContainer>
                  {COURSE_MAPPING.map((item) => (
                    <CourseButton
                      key={item}
                      id={item}
                      isClick={item === courseType}
                      onClick={handleCourseBtnClick}
                    >
                      {item}
                    </CourseButton>
                  ))}
                </CourseBtnsContainer>
              )}
              <FormItem itemName="Category" value={COURSE_INFOS.category} />
              <FormItem
                itemName="Course Name"
                value={COURSE_INFOS.courseName}
              />
              <FormItem
                itemName="Course Intro"
                value={COURSE_INFOS.courseIntro}
              />
              <FormItem itemName="Price" value={COURSE_INFOS.price} />
            </>
          )}
        </FormContainer>
      </TeacherManageContainer>
    </TeacherManageWrapper>
  );
}

export default TeacherManagePage;
