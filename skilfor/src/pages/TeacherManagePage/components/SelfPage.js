import React, { useState, useEffect } from "react";
import { TEACHER_INFOS } from "../Constant";
import { sleep } from "../../../utils";
import {
  EditContainer,
  SectionText,
  RowContainer,
  EditButton,
  SubmitButton,
} from "./PageStyle";
import {
  FormItemContainer,
  ItemTop,
  ItemName,
  ItemBottom,
  ItemValue,
  EditInput,
} from "./CourseInfosForm";
import useEdit from "../hooks/useEdit";

function SelfPage() {
  const [teacherInfos, setTeacherInfos] = useState(null);
  const {
    isEditingSelf,
    setIsEditingSelf,
    editSelfContent,
    setEditSelfContent,
    handleSelfEditClick,
  } = useEdit();
  //拿取 teacher infos
  useEffect(() => {
    async function fetchData() {
      await sleep(500);
      setTeacherInfos(TEACHER_INFOS);
    }
    fetchData();
  }, []);
  //設定預設課程個人編輯 value
  useEffect(() => {
    setEditSelfContent(teacherInfos);
  }, [teacherInfos, setEditSelfContent]);
  //完成編輯個人資訊按鈕被按時
  const handleSelfSubmitClick = () => {
    setIsEditingSelf(false);
    setTeacherInfos(editSelfContent);
    //將更改後的課程資訊 post 給後端
    console.log("PUT", editSelfContent);
  };

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
        {teacherInfos && (
          <ItemBottom>
            <ItemValue show={!isEditingSelf}>{teacherInfos.name}</ItemValue>
            {isEditingSelf && (
              <EditInput
                defaultValue={teacherInfos.name}
                onChange={handleSelfInputChange}
                id="name"
              />
            )}
          </ItemBottom>
        )}
      </FormItemContainer>
      <FormItemContainer show={!isEditingSelf}>
        <ItemTop>
          <ItemName>Avatar</ItemName>
        </ItemTop>
        {teacherInfos && (
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
        )}
      </FormItemContainer>
      <FormItemContainer show={!isEditingSelf}>
        <ItemTop>
          <ItemName>Contact Email</ItemName>
        </ItemTop>
        {teacherInfos && (
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
        )}
      </FormItemContainer>
      <FormItemContainer show={true}>
        <ItemTop>
          <ItemName>Login Email</ItemName>
        </ItemTop>
        {teacherInfos && (
          <ItemBottom>
            <ItemValue show={true}>{teacherInfos.email}</ItemValue>
          </ItemBottom>
        )}
      </FormItemContainer>
    </>
  );
}

export default SelfPage;
