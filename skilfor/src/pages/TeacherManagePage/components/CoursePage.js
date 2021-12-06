import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import CourseInfosForm from "./CourseInfosForm";
import happy from "../../../img/happy.png";
import sad from "../../../img/sad.png";
import { nanoid } from "nanoid";
import { getTeacherCourseInfos } from "../../../WebAPI";
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
import {
  registerNewCourse,
  updateCourseInfos,
  deleteCourse,
} from "../../../WebAPI";
import { CATEGORY_LIST } from "../Constant";
import { getKeyByValue } from "../../../utils";

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
  margin-bottom: 10px;
  align-items: center;
  flex-wrap: wrap;
`;
const CourseButton = styled.button`
  padding: 6px 15px;
  font-size: 1.1rem;
  border-radius: 50px;
  color: ${(props) => props.theme.colors.grey_dark};
  border: 2px solid ${(props) => props.theme.colors.grey_dark};
  background: white;
  cursor: pointer;
  margin-bottom: 15px;
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
        question === "courseDescription" ||
        question === "price") &&
      formData[question] === ""
    ) {
      errorArr.push(question);
    }
  }
  return errorArr;
};
const makeUpdateCourseApi = async (
  apiType,
  setApiError,
  updatedCourseInfos
) => {
  let json = await apiType(setApiError, updatedCourseInfos);
  if (json.errMessage) {
    return setApiError("請先登入才能使用後台功能");
  }
};
const makeDeleteCourseApi = async (setApiError, courseId) => {
  let json = await deleteCourse(setApiError, courseId);
  if (json.errMessage) {
    return setApiError("請先登入才能使用後台功能");
  }
};

function CoursePage({ apiError, setApiError }) {
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
    const getData = async (setApiError) => {
      let json = await getTeacherCourseInfos(setApiError);
      if (!json.success) {
        return setApiError("請先登入才能使用後台功能");
      }
      setCourseInfos(json.data);
      if (json.data.length > 0) {
        setSelectedCourseInfos(json.data[0]);
        setEditContent(json.data[0]);
      }
    };
    getData(setApiError);
  }, [setEditContent, initState, setApiError]);
  //當課程資訊下的按鈕被點選時
  const handleCourseBtnClick = (e) => {
    if (apiError) return;
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
    if (apiError) return;
    let errorArr = formDataVerify(editContent);
    if (errorArr.length > 0) {
      setError(errorArr);
      return alert("尚有欄位未填答，請填寫完後再送出資料");
    }
    let updatedCourseInfos;
    if (editContent.audit === "fail" || !editContent.audit) {
      updatedCourseInfos = {
        ...editContent,
        category: getKeyByValue(CATEGORY_LIST, editContent.category),
        audit: "pending",
      };
      makeUpdateCourseApi(registerNewCourse, setApiError, updatedCourseInfos);
    } else {
      updatedCourseInfos = editContent;
      makeUpdateCourseApi(updateCourseInfos, setApiError, updatedCourseInfos);
    }
    updatedCourseInfos.category = CATEGORY_LIST[updatedCourseInfos.category];
    setCourseInfos(
      courseInfos.map((course) => {
        if (course.category !== editContent.category) {
          return course;
        } else {
          return updatedCourseInfos;
        }
      })
    );
    setSelectedCourseInfos(updatedCourseInfos);
    setIsEditing(false);
  };
  //當是否發布到前台被按時
  const handleRadioChange = (e) => {
    const { value: publishedValue } = e.target;
    if (selectedCourseInfos.published === (publishedValue === "true")) return;
    let confirmAlert;
    if (publishedValue === "true") {
      confirmAlert = window.confirm(
        "確定要將課程資訊上架到前台嗎？(上架到前台後，任何人都可以瀏覽你的課程頁面，並可預約你的課程)"
      );
    } else {
      confirmAlert = window.confirm(
        "確定要將課程資訊暫時隱藏嗎？(從前台隱藏後，其他人將無法瀏覽你的課程頁面，也無法預約你的課程)"
      );
    }
    if (!confirmAlert) return;
    let newCourseInfos = {
      ...selectedCourseInfos,
      published: publishedValue === "true",
    };
    makeUpdateCourseApi(updateCourseInfos, setApiError, newCourseInfos);
    setSelectedCourseInfos(newCourseInfos);
    setCourseInfos(
      courseInfos.map((course) => {
        if (course.id !== selectedCourseInfos.id) {
          return course;
        } else {
          return newCourseInfos;
        }
      })
    );
  };
  //當刪除課程被按時
  const handleCourseDeleteClick = (e) => {
    let confirmDelete = window.confirm(
      "確定刪除這門課嗎？刪除後的課程資訊將不可回復！"
    );
    if (!confirmDelete) return;
    if (
      !(
        selectedCourseInfos.courseName === "" ||
        selectedCourseInfos.courseDescription === "" ||
        selectedCourseInfos.price === ""
      )
    ) {
      makeDeleteCourseApi(setApiError, selectedCourseInfos.id);
    }
    let newCourseInfos = courseInfos.filter(
      (course) => course.category !== selectedCourseInfos.category
    );
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
        setApiError={setApiError}
        setIsEditing={setIsEditing}
      />
      <SectionText>目前擁有的課程</SectionText>
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
                handleRadioChange={handleRadioChange}
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
