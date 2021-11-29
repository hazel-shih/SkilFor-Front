import {
  EditContainer,
  SectionText,
  RowContainer,
  EditButton,
  SubmitButton,
} from "./CoursePage";
import {
  FormItemContainer,
  ItemTop,
  ItemName,
  ItemBottom,
  ItemValue,
  EditInput,
} from "./CourseInfosForm";

function SelfPage({
  teacherInfos,
  handleSelfEditClick,
  handleSelfSubmitClick,
  isEditingSelf,
  editSelfContent,
  setEditSelfContent,
}) {
  const handleSelfInputChange = (e) => {
    const { id: inputName, value } = e.target;
    switch (inputName) {
      case "name":
        setEditSelfContent({
          ...editSelfContent,
          name: value,
        });
        break;
      case "avatar":
        setEditSelfContent({
          ...editSelfContent,
          avatar: value,
        });
        break;
      case "contactEmail":
        setEditSelfContent({
          ...editSelfContent,
          contactEmail: value,
        });
        break;
      default:
        return editSelfContent;
    }
  };
  return (
    <>
      <EditContainer>
        <SectionText>個人資訊</SectionText>
        <RowContainer>
          <EditButton onClick={handleSelfEditClick}>
            {isEditingSelf ? "取消編輯" : "編輯個人資訊"}
          </EditButton>
          {isEditingSelf && (
            <SubmitButton onClick={handleSelfSubmitClick}>
              編輯完成
            </SubmitButton>
          )}
        </RowContainer>
      </EditContainer>
      <FormItemContainer show={!isEditingSelf}>
        <ItemTop>
          <ItemName>Name</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={!isEditingSelf}>{teacherInfos.name}</ItemValue>
          {isEditingSelf && teacherInfos && (
            <EditInput
              defaultValue={teacherInfos.name}
              onChange={handleSelfInputChange}
              id="name"
            />
          )}
        </ItemBottom>
      </FormItemContainer>
      <FormItemContainer show={!isEditingSelf}>
        <ItemTop>
          <ItemName>Avatar</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={!isEditingSelf}>{teacherInfos.avatar}</ItemValue>
          {isEditingSelf && teacherInfos && (
            <EditInput
              defaultValue={teacherInfos.avatar}
              onChange={handleSelfInputChange}
              id="avatar"
            />
          )}
        </ItemBottom>
      </FormItemContainer>
      <FormItemContainer show={!isEditingSelf}>
        <ItemTop>
          <ItemName>Contact Email</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={!isEditingSelf}>
            {teacherInfos.contactEmail}
          </ItemValue>
          {isEditingSelf && teacherInfos && (
            <EditInput
              defaultValue={teacherInfos.contactEmail}
              onChange={handleSelfInputChange}
              id="contactEmail"
            />
          )}
        </ItemBottom>
      </FormItemContainer>
      <FormItemContainer show={true}>
        <ItemTop>
          <ItemName>Login Email</ItemName>
        </ItemTop>
        <ItemBottom>
          <ItemValue show={true}>{teacherInfos.email}</ItemValue>
        </ItemBottom>
      </FormItemContainer>
    </>
  );
}

export default SelfPage;
