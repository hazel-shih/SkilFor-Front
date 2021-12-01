import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import CourseInfosForm from "./CourseInfosForm";
import happy from "../../../img/happy.png";
import sad from "../../../img/sad.png";
import { nanoid } from "nanoid";
import { COURSE_LIST } from "../Constant";
import { sleep } from "../../../utils";
import CategoryDropDownMenu from "./CategoryDropDownMenu";
import {
  EditContainer,
  SectionText,
  RowContainer,
  EditButton,
  SubmitButton,
} from "./PageStyle";
import PublishedRadiosContainer from "./PublishedRadiosContainer";
import useEdit from "../hooks/useEdit";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
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
const ImgBlock = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
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
const DeleteButton = styled(EditButton)`
  margin-right: 15px;
`;
const CourseBtnsContainer = styled(RowContainer)`
  margin-bottom: 25px;
  align-items: center;
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
const GoToCalendar = styled(Link)`
  color: ${(props) => props.theme.colors.grey_dark};
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 10px;
  :hover {
    opacity: 0.8;
  }
`;
const formDataVerify = (formData) => {
  let errorArr = [];
  for (let question in formData) {
    if (
      (question === "courseName" ||
        question === "courseIntro" ||
        question === "price") &&
      formData[question] === ""
    ) {
      errorArr.push(question);
    }
  }
  return errorArr;
};

function CoursePage() {
  const { teacherId } = useParams();
  //存取老師擁有的課程資料
  const [courseInfos, setCourseInfos] = useState(null);
  //課程領域按鈕
  const [selectedCourseInfos, setSelectedCourseInfos] = useState(null);
  //錯誤狀態
  const [error, setError] = useState([]);
  //處理編輯狀態
  const {
    isEditing,
    setIsEditing,
    editContent,
    setEditContent,
    handleEditClick,
  } = useEdit(setError, selectedCourseInfos);
  //初始化 state
  const initState = useCallback(
    (dataArr) => {
      setCourseInfos(dataArr);
      setSelectedCourseInfos(dataArr[0]);
      setEditContent(dataArr[0]);
    },
    [setEditContent]
  );
  //拿取 course infos 資料
  useEffect(() => {
    async function fetchData() {
      await sleep(100);
      if (COURSE_LIST.length > 0) {
        initState(COURSE_LIST);
      } else {
        setCourseInfos([]);
      }
    }
    fetchData();
  }, [setEditContent, initState]);
  //當課程資訊下的按鈕被點選時
  const handleCourseBtnClick = (e) => {
    setIsEditing(false);
    const { id: categoryName } = e.target;
    let targetCourseInfos = courseInfos.find(
      (course) => course.category === categoryName
    );
    setSelectedCourseInfos(targetCourseInfos);
    setEditContent(targetCourseInfos);
  };
  //當編輯課程完成按鈕被按時
  const handleCourseSubmitClick = () => {
    let errorArr = formDataVerify(editContent);
    if (errorArr.length > 0) {
      setError(errorArr);
      return alert("尚有欄位未填答，請填寫完後再送出資料");
    }
    let updatedCourseInfos;
    if (editContent.audit === "fail" || !editContent.audit) {
      updatedCourseInfos = {
        ...editContent,
        audit: "pending",
      };
    } else {
      updatedCourseInfos = editContent;
    }
    setCourseInfos(
      courseInfos.map((course) => {
        if (course.category !== editContent.category) {
          return course;
        } else {
          return updatedCourseInfos;
        }
      })
    );
    setIsEditing(false);
    setSelectedCourseInfos(updatedCourseInfos);
    //將更改後的課程資訊 put 給後端
    console.log("PUT", updatedCourseInfos);
  };
  //當是否發布到前台被按時
  const handleRadioClick = (e) => {
    const { id: publishedValue } = e.target;
    setCourseInfos(
      courseInfos.map((course) => {
        if (course.id !== selectedCourseInfos.id) {
          return course;
        } else {
          let updatedCourseInfos = {
            ...course,
            published: publishedValue === "true",
          };
          return updatedCourseInfos;
        }
      })
    );
    //將是否發布到前台的資料 patch 給後端
    console.log("PATCH", publishedValue === "true");
  };
  //當刪除課程被按時
  const handleCourseDeleteClick = (e) => {
    let confirmDelete = window.confirm(
      "確定刪除這門課嗎？刪除後的課程資訊將不可回復！"
    );
    if (!confirmDelete) return;
    let newCourseInfos = courseInfos.filter(
      (course) => course.category !== selectedCourseInfos.category
    );
    if (newCourseInfos.length === 0) {
      initState([]);
      return setIsEditing(false);
    }
    initState(newCourseInfos);
    setIsEditing(false);
  };
  return (
    <>
      <SectionText>新增課程</SectionText>
      <CategoryDropDownMenu
        show={true}
        setCourseInfos={setCourseInfos}
        courseInfos={courseInfos}
        setSelectedCourseInfos={setSelectedCourseInfos}
        setEditContent={setEditContent}
      />
      <EditContainer>
        <SectionText>目前擁有的課程</SectionText>
      </EditContainer>
      {courseInfos && courseInfos.length !== 0 && selectedCourseInfos && (
        <CourseBtnsContainer>
          {courseInfos.map((course) => (
            <CourseButton
              key={nanoid()}
              id={course.category}
              isClick={selectedCourseInfos.category === course.category}
              onClick={handleCourseBtnClick}
            >
              {course.category}
            </CourseButton>
          ))}
        </CourseBtnsContainer>
      )}
      {selectedCourseInfos && (
        <>
          {selectedCourseInfos.audit === "success" && (
            <>
              <SuccessContainer>
                <PassContainer success>
                  <ImgBlock src={happy} />
                  <PassText success>
                    課程已通過審核，設定完課程時段後同學們就可以預約囉！
                  </PassText>
                </PassContainer>
              </SuccessContainer>
              <SectionText>設定課程時段</SectionText>
              <GoToCalendar to={`/teacher/calendar/${teacherId}`}>
                前往行事曆設定課程時段 ➜
              </GoToCalendar>
            </>
          )}
          {selectedCourseInfos.audit === "pending" && (
            <PassContainer warn>
              <PassText warn>課程審核中，審核成功後將以電子郵件通知您</PassText>
            </PassContainer>
          )}
          {selectedCourseInfos.audit === "fail" && (
            <PassContainer fail>
              <ImgBlock src={sad} />
              <PassText fail>
                課程未通過審核，請調整課程資訊後再重新送審
              </PassText>
            </PassContainer>
          )}
          {!selectedCourseInfos.audit && (
            <PassContainer warn>
              <PassText warn>
                為避免資料遺失，編輯完成的課程資料要記得送審喔！
              </PassText>
            </PassContainer>
          )}
          <EditContainer>
            <SectionText>課程資訊</SectionText>
            <RowContainer>
              {(isEditing || selectedCourseInfos.audit === "pending") && (
                <DeleteButton onClick={handleCourseDeleteClick}>
                  刪除課程
                </DeleteButton>
              )}
              {selectedCourseInfos.audit !== "pending" && (
                <EditButton onClick={handleEditClick}>
                  {isEditing ? "取消編輯" : "編輯課程資訊"}
                </EditButton>
              )}
              {isEditing &&
                (selectedCourseInfos.audit === "fail" ||
                  !selectedCourseInfos.audit) && (
                  <SubmitButton onClick={handleCourseSubmitClick}>
                    送審
                  </SubmitButton>
                )}
              {isEditing && selectedCourseInfos.audit === "success" && (
                <SubmitButton onClick={handleCourseSubmitClick}>
                  完成編輯
                </SubmitButton>
              )}
            </RowContainer>
          </EditContainer>
          <CourseInfosForm
            isEditing={isEditing}
            courseInfos={selectedCourseInfos}
            editContent={editContent}
            setEditContent={setEditContent}
            error={error}
            setError={setError}
          />
          {selectedCourseInfos.audit === "success" && (
            <>
              <SectionText>是否發布課程頁面</SectionText>
              <PublishedRadiosContainer
                handleRadioClick={handleRadioClick}
                published={selectedCourseInfos.published}
              />
            </>
          )}
        </>
      )}
      {courseInfos && courseInfos.length === 0 && (
        <PassContainer warn>
          <PassText warn>
            你好像還沒有開設課程～點選上方的下拉式選單新增你的第一堂課吧！
          </PassText>
        </PassContainer>
      )}
    </>
  );
}

export default CoursePage;
