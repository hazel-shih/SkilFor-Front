import styled from "styled-components";

const RowContainer = styled.div`
  display: flex;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormItemContainer = styled(ColumnContainer)`
  border-bottom: 1px solid
    ${(props) => (props.show ? props.theme.colors.grey_light : "transparent")};
  margin-bottom: 20px;
`;

const ItemTop = styled(RowContainer)``;

const ItemBottom = styled(ColumnContainer)`
  padding: 0 15px;
  margin-bottom: 10px;
`;

const ItemName = styled.p`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
  margin-bottom: 10px;
`;

const ItemValue = styled(ItemName)`
  margin-bottom: 0px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const EditInput = styled.input`
  height: 30px;
  padding: 5px;
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const EditTextArea = styled.textarea`
  height: 100px;
  padding: 5px;
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
  display: ${(props) => (props.show ? "block" : "none")};
`;

function CourseInfosForm({ isEditing, courseInfos }) {
  const handleInputChange = () => {};
  return (
    <ColumnContainer>
      <FormItemContainer show={!isEditing}>
        <ItemTop>
          <ItemName>Category</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={!isEditing}>{courseInfos.category}</ItemValue>
          <EditInput
            show={isEditing}
            value={courseInfos.category}
            onChange={handleInputChange}
          />
        </ItemBottom>
      </FormItemContainer>
      <FormItemContainer show={!isEditing}>
        <ItemTop>
          <ItemName>Course Name</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={!isEditing}>{courseInfos.courseName}</ItemValue>
          <EditInput
            show={isEditing}
            value={courseInfos.courseName}
            onChange={handleInputChange}
          />
        </ItemBottom>
      </FormItemContainer>
      <FormItemContainer show={!isEditing}>
        <ItemTop>
          <ItemName>Course Intro</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={!isEditing}>{courseInfos.courseIntro}</ItemValue>
          <EditTextArea
            show={isEditing}
            value={courseInfos.courseIntro}
            onChange={handleInputChange}
          />
        </ItemBottom>
      </FormItemContainer>
      <FormItemContainer show={!isEditing}>
        <ItemTop>
          <ItemName>Course Price</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={!isEditing}>{courseInfos.price}</ItemValue>
          <EditInput
            show={isEditing}
            value={courseInfos.price}
            onChange={handleInputChange}
          />
        </ItemBottom>
      </FormItemContainer>
    </ColumnContainer>
  );
}

export default CourseInfosForm;
