import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import CourseInfosForm from "./CourseInfosForm";
import happy from "../../../img/happy.png";
import sad from "../../../img/sad.png";
import { nanoid } from "nanoid";
import { CATEGORY_LIST, COURSE_LIST } from "../Constant";
import { sleep } from "../../../utils";

export const RowContainer = styled.div`
  display: flex;
`;
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
const RadiosContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const RadioContainer = styled(RowContainer)`
  align-items: center;
  margin-bottom: 5px;
`;
const RadioInput = styled.input`
  width: 20px;
  height: 15px;
`;

const RadioLabel = styled.label`
  color: ${(props) => props.theme.colors.grey_dark};
  margin-left: 5px;
`;
const PublishedContainer = ({ handleRadioClick, published }) => {
  return (
    <RadiosContainer>
      <RadioContainer>
        <RadioInput
          onClick={handleRadioClick}
          name="published"
          type="radio"
          id="true"
          defaultChecked={published}
        />
        <RadioLabel htmlFor="true">一切都 OK！發布至前台</RadioLabel>
      </RadioContainer>
      <RadioContainer>
        <RadioInput
          defaultChecked={!published}
          onClick={handleRadioClick}
          name="published"
          type="radio"
          id="false"
        />
        <RadioLabel htmlFor="false">還有資訊需要編輯，暫時不發布</RadioLabel>
      </RadioContainer>
    </RadiosContainer>
  );
};

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

export const SectionText = styled.h3`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.green_dark};
  margin: 10px 0 20px 0;
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
const SelectContainer = styled(RowContainer)``;
const SelectBar = styled.select`
  padding: 5px;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey_dark};
  color: ${(props) => props.theme.colors.grey_dark};
`;
const ChooseCategoryButton = styled.button`
  border: 1px solid ${(props) => props.theme.colors.grey_dark};
  padding: 8px;
  font-size: 0.8rem;
  border-left: none;
  cursor: pointer;
  background: ${(props) => props.theme.colors.grey_dark};
  color: white;
  :hover {
    opacity: 0.85;
  }
`;
const SelectCategory = ({ courseInfos, setCourseInfos }) => {
  const [selectOptions, setSelectOptions] = useState(null);
  const makeSelectOptions = useCallback((categoryArr, courseArr) => {
    if (!categoryArr || !courseArr) return;
    let temp = [];
    for (let i = 0; i < courseArr.length; i++) {
      temp.push(courseArr[i].category);
    }
    let result = categoryArr.filter((category) => !temp.includes(category));
    return result;
  }, []);

  useEffect(() => {
    async function fetchData() {
      await sleep(100);
      setSelectOptions(CATEGORY_LIST);
    }
    fetchData();
  }, []);
  const selectedCategory = useRef(null);
  const handleSelectCategorySubmit = (e) => {
    if (!selectedCategory.current.value) return;
    let newCourseInfos = {
      id: nanoid(),
      category: selectedCategory.current.value,
      courseName: "",
      courseIntro: "",
      price: "",
      audit: false,
      published: false,
    };
    setCourseInfos([newCourseInfos, ...courseInfos]);
  };
  return (
    <SelectContainer>
      <RowContainer>
        <SelectBar id="addCategory" ref={selectedCategory}>
          <option value="">請選擇一個課程領域</option>
          {selectOptions &&
            courseInfos &&
            makeSelectOptions(selectOptions, courseInfos).map((category) => (
              <option key={category}>{category}</option>
            ))}
          {courseInfos &&
            courseInfos.length === 0 &&
            selectOptions.map((category) => (
              <option key={category}>{category}</option>
            ))}
        </SelectBar>
        <ChooseCategoryButton onClick={handleSelectCategorySubmit}>
          新增
        </ChooseCategoryButton>
      </RowContainer>
    </SelectContainer>
  );
};

function CoursePage() {
  const { teacherId } = useParams();
  //存取老師擁有的課程資料
  const [courseInfos, setCourseInfos] = useState(null);
  //課程領域按鈕
  const [selectedCourseInfos, setSelectedCourseInfos] = useState(null);
  //課程資訊是否為編輯狀態
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  //編輯課程內容
  const [editCourseContent, setEditCourseContent] = useState(null);
  //拿取 course infos 資料
  useEffect(() => {
    async function fetchData() {
      await sleep(100);
      setCourseInfos(COURSE_LIST);
    }
    fetchData();
  }, []);
  //設定最初被選定的課程按鈕
  useEffect(() => {
    if (courseInfos && courseInfos.length !== 0) {
      setSelectedCourseInfos(courseInfos[0]);
      setEditCourseContent(courseInfos[0]);
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
    let updatedCourseInfos;
    if (editCourseContent.audit === "fail" || !editCourseContent.audit) {
      updatedCourseInfos = {
        ...editCourseContent,
        audit: "pending",
      };
    } else {
      updatedCourseInfos = editCourseContent;
    }
    setCourseInfos(
      courseInfos.map((course) => {
        if (course.id !== editCourseContent.id) {
          return course;
        } else {
          return updatedCourseInfos;
        }
      })
    );
    //將更改後的課程資訊 put 給後端
    console.log("PUT", updatedCourseInfos.id, updatedCourseInfos);
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
    console.log("PATCH", selectedCourseInfos.id, publishedValue === "true");
  };
  return (
    <>
      <SectionText>新增課程</SectionText>
      <SelectCategory
        show={true}
        setCourseInfos={setCourseInfos}
        courseInfos={courseInfos}
        setSelectedCourseInfos={setSelectedCourseInfos}
      />
      <EditContainer>
        <SectionText>目前擁有的課程</SectionText>
      </EditContainer>
      {courseInfos && courseInfos.length !== 0 && selectedCourseInfos && (
        <CourseBtnsContainer>
          {courseInfos.map((course) => (
            <CourseButton
              key={course.id}
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
            {selectedCourseInfos && (
              <RowContainer>
                {selectedCourseInfos.audit !== "pending" && (
                  <EditButton onClick={handleCourseEditClick}>
                    {isEditingCourse ? "取消編輯" : "編輯課程資訊"}
                  </EditButton>
                )}
                {isEditingCourse &&
                  (selectedCourseInfos.audit === "fail" ||
                    !selectedCourseInfos.audit) && (
                    <SubmitButton onClick={handleCourseSubmitClick}>
                      送審
                    </SubmitButton>
                  )}
                {isEditingCourse && selectedCourseInfos.audit === "success" && (
                  <SubmitButton onClick={handleCourseSubmitClick}>
                    完成編輯
                  </SubmitButton>
                )}
              </RowContainer>
            )}
          </EditContainer>
          <CourseInfosForm
            isEditing={isEditingCourse}
            courseInfos={selectedCourseInfos}
            editCourseContent={editCourseContent}
            setEditCourseContent={setEditCourseContent}
          />
          {selectedCourseInfos.audit === "success" && (
            <>
              <SectionText>是否發布課程頁面</SectionText>
              <PublishedContainer
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
