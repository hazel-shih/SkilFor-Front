import styled from "styled-components";
import CourseInfosForm from "./CourseInfosForm";
import happy from "../../../img/happy.png";
import sad from "../../../img/sad.png";
import add from "../../../img/add.png";

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
const PassImgBlock = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;
const AddImgBlock = styled(PassImgBlock)`
  cursor: pointer;
  transition: all ease-in 0.1s;
  :hover {
    transform: translateY(-5px);
  }
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

function CoursePage({
  selectedCourseInfos,
  handleRadioChange,
  handleCourseEditClick,
  isEditingCourse,
  handleCourseSubmitClick,
  courseInfos,
  handleCourseBtnClick,
  editCourseContent,
  setEditCourseContent,
}) {
  return (
    <>
      {selectedCourseInfos.audit === "success" ? (
        <SuccessContainer>
          <PassContainer success>
            <PassImgBlock src={happy} />
            <PassText success>課程已通過審核，將你的課程頁面發佈吧！</PassText>
          </PassContainer>
          <RadioContainer>
            <RadioInput
              onChange={handleRadioChange}
              type="radio"
              name="publish"
              id="true"
              value={true}
              defaultValue={selectedCourseInfos.published}
            />
            <RadioLabel htmlFor="true">發布至前台</RadioLabel>
          </RadioContainer>
          <RadioContainer>
            <RadioInput
              onChange={handleRadioChange}
              type="radio"
              name="publish"
              id="false"
              value={false}
              defaultValue={!selectedCourseInfos.published}
            />
            <RadioLabel htmlFor="false">不發布</RadioLabel>
          </RadioContainer>
        </SuccessContainer>
      ) : selectedCourseInfos.audit === "pending" ? (
        <PassContainer warn>
          <PassText warn>課程審核中，審核成功後將以電子郵件通知您</PassText>
        </PassContainer>
      ) : selectedCourseInfos.audit === "fail" ? (
        <PassContainer fail>
          <PassImgBlock src={sad} />
          <PassText fail>課程未通過審核，請調整課程資訊後再重新送審</PassText>
        </PassContainer>
      ) : (
        <div></div>
      )}
      <EditContainer>
        <SectionText>課程資訊</SectionText>
        <RowContainer>
          {selectedCourseInfos.audit !== "pending" && (
            <EditButton onClick={handleCourseEditClick}>
              {isEditingCourse ? "取消編輯" : "編輯課程資訊"}
            </EditButton>
          )}
          {isEditingCourse &&
            selectedCourseInfos.audit !== "success" &&
            selectedCourseInfos.audit !== "pending" && (
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
      </EditContainer>
      {courseInfos && courseInfos.length !== 0 && (
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
          <AddImgBlock src={add} />
        </CourseBtnsContainer>
      )}
      {selectedCourseInfos && (
        <>
          <CourseInfosForm
            isEditing={isEditingCourse}
            courseInfos={selectedCourseInfos}
            editCourseContent={editCourseContent}
            setEditCourseContent={setEditCourseContent}
          />
        </>
      )}
    </>
  );
}

export default CoursePage;
