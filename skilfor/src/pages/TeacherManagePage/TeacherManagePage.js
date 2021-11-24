import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormItem from "./FormItem";
import AvatarBlock from "../../components/AvatarBlock";
import PageTitle from "../../components/PageTitle";
import happy from "../../img/happy.png";
import sad from "../../img/sad.png";
import { TEACHER_INFOS, COURSE_LIST } from "./Constant";
import CourseInfosForm from "./CourseInfosForm";

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
  margin-bottom: 10px;
`;

const RadioInput = styled.input``;

const RadioLabel = styled.label`
  color: ${(props) => props.theme.colors.grey_dark};
  margin-left: 5px;
`;

const EditContainer = styled(RowContainer)`
  justify-content: space-between;
  align-items: baseline;
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

function TeacherManagePage() {
  const [page, setPage] = useState("self");
  const [teacherInfos, setTeacherInfos] = useState(TEACHER_INFOS);
  const [courseInfos, setCourseInfos] = useState(COURSE_LIST);
  const [selectedCategory, setSelectedCategory] = useState(
    teacherInfos.categories[0]
  );
  const [displayCourseInfos, setDisplayCourseInfos] = useState(
    courseInfos.filter(
      (course) => course.category === teacherInfos.categories[0]
    )
  );
  const [edit, setEdit] = useState({
    isEditing: false,
    buttonText: "編輯課程資訊",
  });

  const handlePageBtnClick = (e) => {
    const { id: currentPage } = e.target;
    setPage(currentPage);
  };
  const handleCourseBtnClick = (e) => {
    const { id: selectedCategory } = e.target;
    setSelectedCategory(e.target.id);
    setDisplayCourseInfos(
      courseInfos.filter((course) => course.category === selectedCategory)
    );
  };
  const handleEditClick = () => {
    if (edit.isEditing) {
      setEdit({
        isEditing: false,
        buttonText: "編輯課程資訊",
      });
    } else {
      setEdit({
        isEditing: true,
        buttonText: "取消編輯",
      });
    }
  };

  console.log(edit);

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
              <FormItem itemName="Name" value={teacherInfos.name} />
              <FormItem itemName="Avatar" value={teacherInfos.avatar} />
              <FormItem itemName="Email" value={teacherInfos.email} />
            </>
          )}
          {page === "course" && courseInfos.length !== 0 && (
            <>
              {displayCourseInfos[0].isPass === "success" ? (
                <SuccessContainer>
                  <PassContainer success>
                    <PassImgBlock src={happy} />
                    <PassText success>
                      課程已通過審核，將你的課程頁面發佈吧！
                    </PassText>
                  </PassContainer>
                  <RadioContainer>
                    <RadioInput
                      type="radio"
                      name="publish"
                      id="true"
                      value="true"
                    />
                    <RadioLabel htmlFor="true">我要發布</RadioLabel>
                  </RadioContainer>
                  <RadioContainer>
                    <RadioInput
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
                <EditButton onClick={handleEditClick}>
                  {edit.buttonText}
                </EditButton>
              </EditContainer>
              {teacherInfos.categories.length !== 0 && (
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
                    isEditing={edit.isEditing}
                    courseInfos={displayCourseInfos[0]}
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
