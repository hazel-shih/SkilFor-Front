import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import teacherPic from "../../img/teacher.jpeg";
import PageTitle from "../../components/PageTitle";
import { COURSE_LIST } from "./Constant";
import { sleep } from "../../utils";
import CoursePage from "./components/CoursePage";
import SelfPage from "./components/SelfPage";

//styled component
const TeacherManageWrapper = styled.section`
  padding: 186px 100px 232px 100px;
`;

export const RowContainer = styled.div`
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

export const SectionText = styled.h3`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.green_dark};
  margin: 10px 0 20px 0;
`;

export const EditContainer = styled(RowContainer)`
  justify-content: space-between;
  align-items: baseline;
  margin-top: 10px;
`;

export const EditButton = styled.button`
  background: ${(props) => props.theme.colors.green_dark};
  border: none;
  color: white;
  font-size: 1rem;
  height: fit-content;
  padding: 7px 14px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export const SubmitButton = styled(EditButton)`
  margin-left: 15px;
`;

function TeacherManagePage() {
  //個人資料或課程資料頁面
  const [page, setPage] = useState("self");

  //當個人資訊與課程資訊按鈕被按時
  const handlePageBtnClick = (e) => {
    const { id: currentPage } = e.target;
    setPage(currentPage);
  };

  //存取老師擁有的課程資料
  const [courseInfos, setCourseInfos] = useState(null);
  //課程領域按鈕
  const [selectedCourseInfos, setSelectedCourseInfos] = useState(null);

  //課程資訊是否為編輯狀態
  const [isEditingCourse, setIsEditingCourse] = useState(false);

  //編輯課程內容
  const [editCourseContent, setEditCourseContent] = useState(null);

  //拿取 teacher infos 和 course infos 資料
  useEffect(() => {
    async function fetchData() {
      await sleep(500);
      setCourseInfos(COURSE_LIST);
    }
    fetchData();
  }, []);
  //設定最初被選定的課程按鈕
  useEffect(() => {
    if (courseInfos && courseInfos.length !== 0) {
      setSelectedCourseInfos(courseInfos[0]);
    }
  }, [courseInfos]);

  //當課程資訊下的按鈕被點選時
  const handleCourseBtnClick = (e) => {
    setIsEditingCourse(false);
    const { id: categoryName } = e.target;
    let targetCourseInfos = courseInfos.find(
      (course) => course.category === categoryName
    );
    setSelectedCourseInfos(targetCourseInfos);
    setEditCourseContent(targetCourseInfos);
  };

  //當編輯課程資訊按鈕被按時
  const handleCourseEditClick = () => setIsEditingCourse(!isEditingCourse);
  //當編輯課程完成按鈕被按時
  const handleCourseSubmitClick = () => {
    setIsEditingCourse(false);
    //將更改後的課程資訊 post 給後端
    setCourseInfos(
      courseInfos.map((course) => {
        if (course.id !== editCourseContent.id) {
          return course;
        } else {
          return editCourseContent;
        }
      })
    );
  };
  //當是否發布到前台被按時
  const handleRadioChange = (e) => {
    const { value: publishedValue } = e.target;
    setCourseInfos(
      courseInfos.map((course) => {
        if (course.id !== selectedCourseInfos.id) {
          return course;
        } else {
          return {
            ...course,
            published: publishedValue,
          };
        }
      })
    );
    //將是否發布到前台的資料 post 給後端
  };
  console.log(selectedCourseInfos);
  return (
    <TeacherManageWrapper>
      <PageTitle>後台管理</PageTitle>
      <TeacherManageContainer>
        <UserInfoContainer>
          <Avatar imgSrc={teacherPic} name="Kelly" />
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
          {page === "self" && <SelfPage />}
          {page === "course" && selectedCourseInfos && (
            <CoursePage
              selectedCourseInfos={selectedCourseInfos}
              handleRadioChange={handleRadioChange}
              handleCourseEditClick={handleCourseEditClick}
              isEditingCourse={isEditingCourse}
              handleCourseSubmitClick={handleCourseSubmitClick}
              courseInfos={courseInfos}
              handleCourseBtnClick={handleCourseBtnClick}
              editCourseContent={editCourseContent}
              setEditCourseContent={setEditCourseContent}
              setCourseInfos={setCourseInfos}
              setSelectedCourseInfos={setSelectedCourseInfos}
            />
          )}
        </FormContainer>
      </TeacherManageContainer>
    </TeacherManageWrapper>
  );
}

export default TeacherManagePage;
