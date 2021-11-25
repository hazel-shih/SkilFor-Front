import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormItem from "./FormItem";
import Avatar from "../../components/Avatar";
import teacherPic from "../../img/teacher.jpeg";
import PageTitle from "../../components/PageTitle";
import happy from "../../img/happy.png";
import sad from "../../img/sad.png";
import { TEACHER_INFOS, COURSE_LIST } from "./Constant";
import CourseInfosForm from "./CourseInfosForm";
import { sleep } from "../../utils";

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

const SuccessContainer = styled(ColumnContainer)``;

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
  font-size: 1.1rem;
`;

const PassImgBlock = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const RadioContainer = styled(RowContainer)`
  align-items: center;
`;

const RadioInput = styled.input`
  width: 20px;
  height: 15px;
`;

const RadioLabel = styled.label`
  color: ${(props) => props.theme.colors.grey_dark};
  margin-left: 5px;
`;

const EditContainer = styled(RowContainer)`
  justify-content: space-between;
  align-items: baseline;
  margin-top: 10px;
`;

const EditButton = styled.button`
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

const SubmitButton = styled(EditButton)`
  margin-left: 15px;
`;

function TeacherManagePage() {
  //個人資料或課程資料頁面
  const [page, setPage] = useState("self");
  //存取老師的資料與老師擁有的課程資料
  const [teacherInfos, setTeacherInfos] = useState(null);
  const [courseInfos, setCourseInfos] = useState(null);
  //課程資訊下的課程按鈕
  const [selectedCategory, setSelectedCategory] = useState(null);
  //是否為編輯狀態
  const [edit, setEdit] = useState(false);
  //拿取 teacher infos 和 course infos 資料
  useEffect(() => {
    async function fetchData() {
      await sleep(500);
      setTeacherInfos(TEACHER_INFOS);
      setCourseInfos(COURSE_LIST);
    }
    fetchData();
  }, []);
  //設定最初被選定的課程按鈕
  useEffect(() => {
    if (teacherInfos) {
      setSelectedCategory(teacherInfos.categories[0]);
    }
  }, [teacherInfos]);
  //課程資訊呈現的資料
  let displayCourseInfos;
  if (courseInfos) {
    displayCourseInfos = courseInfos.filter(
      (course) => course.category === selectedCategory
    )[0];
  }
  //編輯內容
  const [editContent, setEditContent] = useState(displayCourseInfos);
  //當個人資訊與課程資訊按鈕被按時
  const handlePageBtnClick = (e) => {
    const { id: currentPage } = e.target;
    setPage(currentPage);
  };
  //當課程資訊下的按鈕被點選時
  const handleCourseBtnClick = (e) => {
    setEdit(false);
    const { id: categoryName } = e.target;
    setSelectedCategory(categoryName);
  };
  //設定預設編輯 value
  useEffect(() => {
    if (courseInfos) {
      setEditContent(
        courseInfos.find((info) => info.category === selectedCategory)
      );
    }
  }, [selectedCategory, courseInfos]);
  //當編輯課程資訊按鈕被按時
  const handleEditClick = () => setEdit(!edit);
  //當編輯完成按鈕被按時
  const handleSubmitClick = () => {
    setEdit(false);
    //將更改後的課程資訊 post 給後端
    setCourseInfos(
      courseInfos.map((course) => {
        if (course.id !== editContent.id) {
          return course;
        } else {
          return editContent;
        }
      })
    );
  };
  //當是否發布到前台被按時
  const handleRadioClick = (e) => {
    //將是否發布到前台的資料 post 給後端
  };

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
          {page === "self" && teacherInfos && (
            <>
              <FormItem itemName="Name" value={teacherInfos.name} />
              <FormItem itemName="Avatar" value={teacherInfos.avatar} />
              <FormItem itemName="Email" value={teacherInfos.email} />
            </>
          )}
          {page === "course" && displayCourseInfos && (
            <>
              {displayCourseInfos.isPass === "success" ? (
                <SuccessContainer>
                  <PassContainer success>
                    <PassImgBlock src={happy} />
                    <PassText success>
                      課程已通過審核，將你的課程頁面發佈吧！
                    </PassText>
                  </PassContainer>
                  <RadioContainer>
                    <RadioInput
                      onClick={handleRadioClick}
                      defaultChecked={displayCourseInfos.published}
                      type="radio"
                      name="publish"
                      id="true"
                      value="true"
                    />
                    <RadioLabel htmlFor="true">發布至前台</RadioLabel>
                  </RadioContainer>
                  <RadioContainer>
                    <RadioInput
                      onClick={handleRadioClick}
                      defaultChecked={!displayCourseInfos.published}
                      type="radio"
                      name="publish"
                      id="false"
                      value="false"
                    />
                    <RadioLabel htmlFor="false">不發布</RadioLabel>
                  </RadioContainer>
                </SuccessContainer>
              ) : displayCourseInfos.isPass === "pending" ? (
                <PassContainer warn>
                  <PassText warn>
                    課程審核中，審核成功後將以電子郵件通知您
                  </PassText>
                </PassContainer>
              ) : (
                <PassContainer fail>
                  <PassImgBlock src={sad} />
                  <PassText fail>
                    課程未通過審核，請調整課程資訊後再重新送審
                  </PassText>
                </PassContainer>
              )}
              <EditContainer>
                <SectionText>課程資訊</SectionText>
                <RowContainer>
                  <EditButton onClick={handleEditClick}>
                    {edit ? "取消編輯" : "編輯課程資訊"}
                  </EditButton>
                  {edit && (
                    <SubmitButton onClick={handleSubmitClick}>
                      編輯完成
                    </SubmitButton>
                  )}
                </RowContainer>
              </EditContainer>
              {teacherInfos && teacherInfos.categories.length !== 0 && (
                <CourseBtnsContainer>
                  {teacherInfos.categories.map((category) => (
                    <CourseButton
                      key={category}
                      id={category}
                      isClick={selectedCategory === category}
                      onClick={handleCourseBtnClick}
                    >
                      {category}
                    </CourseButton>
                  ))}
                </CourseBtnsContainer>
              )}
              {displayCourseInfos && (
                <>
                  <CourseInfosForm
                    isEditing={edit}
                    courseInfos={displayCourseInfos}
                    editContent={editContent}
                    setEditContent={setEditContent}
                  />
                </>
              )}
            </>
          )}
        </FormContainer>
      </TeacherManageContainer>
    </TeacherManageWrapper>
  );
}

export default TeacherManagePage;
