import styled from "styled-components";

const RowContainer = styled.div`
  display: flex;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormItemContainer = styled(ColumnContainer)`
  border-bottom: 1px solid
    ${(props) => (props.show ? props.theme.colors.grey_light : "transparent")};
  margin-bottom: 20px;
`;

export const ItemTop = styled(RowContainer)``;

export const ItemBottom = styled(ColumnContainer)`
  padding: 0 15px;
  margin-bottom: 10px;
`;

export const ItemName = styled.p`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
  margin-bottom: 10px;
`;

export const ItemValue = styled(ItemName)`
  margin-bottom: 0px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

export const EditInput = styled.input`
  height: 30px;
  padding: 5px;
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
`;

const EditTextArea = styled.textarea`
  height: 100px;
  padding: 5px;
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
`;

function CourseInfosForm({
  isEditing,
  courseInfos,
  editCourseContent,
  setEditCourseContent,
}) {
  const handleInputChange = (e) => {
    const { id: inputName, value } = e.target;
    if (inputName === "courseName") {
      setEditCourseContent({
        ...editCourseContent,
        courseName: value,
      });
    }
    if (inputName === "courseIntro") {
      setEditCourseContent({
        ...editCourseContent,
        courseIntro: value,
      });
    }
    if (inputName === "price") {
      setEditCourseContent({
        ...editCourseContent,
        price: value,
      });
    }
  };
  return (
    <ColumnContainer>
      <FormItemContainer show={!isEditing}>
        <ItemTop>
          <ItemName>Category</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={true}>{courseInfos.category}</ItemValue>
        </ItemBottom>
      </FormItemContainer>
      <FormItemContainer show={!isEditing}>
        <ItemTop>
          <ItemName>Course Name</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={!isEditing}>{courseInfos.courseName}</ItemValue>
          {isEditing && courseInfos && (
            <EditInput
              defaultValue={courseInfos.courseName}
              onChange={handleInputChange}
              id="courseName"
            />
          )}
        </ItemBottom>
      </FormItemContainer>
      <FormItemContainer show={!isEditing}>
        <ItemTop>
          <ItemName>Course Intro</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={!isEditing}>{courseInfos.courseIntro}</ItemValue>
          {isEditing && courseInfos && (
            <EditTextArea
              defaultValue={courseInfos.courseIntro}
              onChange={handleInputChange}
              id="courseIntro"
            />
          )}
        </ItemBottom>
      </FormItemContainer>
      <FormItemContainer show={!isEditing}>
        <ItemTop>
          <ItemName>Course Price</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={!isEditing}>{courseInfos.price}</ItemValue>
          {isEditing && courseInfos && (
            <EditInput
              defaultValue={courseInfos.price}
              onChange={handleInputChange}
              id="price"
            />
          )}
        </ItemBottom>
      </FormItemContainer>
    </ColumnContainer>
  );
}

export default CourseInfosForm;
