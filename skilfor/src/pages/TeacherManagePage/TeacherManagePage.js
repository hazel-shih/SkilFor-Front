import React, { useState } from "react";
import styled from "styled-components";
import FormItem from "./FormItem";
import AvatarBlock from "../../components/AvatarBlock";
import CourseCalendar from "../../components/Calendar";

//styled component
const TeacherManageWrapper = styled.section`
  padding: 196px 100px 182px 100px;
`;

const PageTitle = styled.h1`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1.8rem;
  margin-bottom: 30px;
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
  margin: 10px 0 30px 0;
`;

//fake data
const COURSE_MAPPING = ["程式", "音樂", "數學"];
const COURSE_INFOS = {
  category: "程式",
  courseName: "一起來學習超潮的 Ruby 吧！",
  classIntro:
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
              <SectionText>課程資訊</SectionText>
              <FormItem itemName="Category" value={COURSE_INFOS.category} />
              <FormItem itemName="Class Name" value={COURSE_INFOS.courseName} />
              <FormItem
                itemName="Class Intro"
                value={COURSE_INFOS.classIntro}
              />
              <FormItem itemName="Price" value={COURSE_INFOS.price} />
              <SectionText>課程時間</SectionText>
              <CourseCalendar courseName={COURSE_INFOS.courseName} />
            </>
          )}
        </FormContainer>
      </TeacherManageContainer>
    </TeacherManageWrapper>
  );
}

export default TeacherManagePage;
