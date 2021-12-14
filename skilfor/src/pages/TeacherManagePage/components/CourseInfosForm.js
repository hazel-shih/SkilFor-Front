import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../../components/constants/breakpoints";

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
  overflow-wrap: break-word;
  margin-bottom: 0px;
  display: ${(props) => (props.show ? "block" : "none")};
`;
export const EditInput = styled.input`
  height: 30px;
  padding: 5px;
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey_dark};
  ${(props) => props.error && `border: 2px solid ${props.theme.colors.error}`}
`;
const EditTextArea = styled.textarea`
  height: 150px;
  padding: 5px;
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey_dark};
  ${MEDIA_QUERY_SM} {
    height: 200px;
  }
  ${(props) => props.error && `border: 2px solid ${props.theme.colors.error}`}
`;
function CourseInfosForm({
  isEditing,
  courseInfos,
  editContent,
  setEditContent,
  error,
  setError,
}) {
  const handleInputChange = (e) => {
    const { id: inputName, value } = e.target;
    if (inputName === "courseName") {
      setEditContent({
        ...editContent,
        courseName: value,
      });
      setError(error.filter((errorItem) => errorItem !== inputName));
    }
    if (inputName === "courseDescription") {
      setEditContent({
        ...editContent,
        courseDescription: value,
      });
      setError(error.filter((errorItem) => errorItem !== inputName));
    }
    if (inputName === "price") {
      setEditContent({
        ...editContent,
        price: value,
      });
      setError(error.filter((errorItem) => errorItem !== inputName));
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
              error={error.includes("courseName")}
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
          <ItemValue show={!isEditing}>
            {courseInfos.courseDescription}
          </ItemValue>
          {isEditing && courseInfos && (
            <EditTextArea
              error={error.includes("courseDescription")}
              defaultValue={courseInfos.courseDescription}
              onChange={handleInputChange}
              id="courseDescription"
            />
          )}
        </ItemBottom>
      </FormItemContainer>
      <FormItemContainer show={!isEditing}>
        <ItemTop>
          <ItemName>Course Points</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={!isEditing}>{courseInfos.price}</ItemValue>
          {isEditing && courseInfos && (
            <EditInput
              error={error.includes("price")}
              defaultValue={courseInfos.price}
              onChange={handleInputChange}
              id="price"
              type="number"
            />
          )}
        </ItemBottom>
      </FormItemContainer>
    </ColumnContainer>
  );
}

export default CourseInfosForm;
