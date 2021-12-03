import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
import AlertCard from "../../../components/AlertCard/AlertCard";

const formDataVerify = (formData) => {
  let errorArr = [];
  for (let question in formData) {
    if (
      (question === "name" ||
        question === "avatar" ||
        question === "contactEmail") &&
      formData[question] === ""
    ) {
      errorArr.push(question);
    }
  }
  return errorArr;
};
function SelfPage({ teacherInfos, setTeacherInfos, apiError, setApiEror }) {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const {
    isEditing,
    setIsEditing,
    editContent,
    setEditContent,
    handleEditClick,
  } = useEdit(setError, teacherInfos);
  //設定預設課程個人編輯 value
  useEffect(() => {
    setEditContent(teacherInfos);
  }, [teacherInfos, setEditContent]);
  //完成編輯個人資訊按鈕被按時
  const handleSelfSubmitClick = () => {
    let errorArr = formDataVerify(editContent);
    if (errorArr.length > 0) {
      setError(errorArr);
      return alert("尚有欄位未填答，請填寫完後再送出資料");
    }
    setTeacherInfos(editContent);
    setIsEditing(false);
    //將更改後的課程資訊 post 給後端
    console.log("PUT", editContent);
  };
  const handleSelfInputChange = (e) => {
    const { id: inputName, value } = e.target;
    switch (inputName) {
      case "name":
        setEditContent({
          ...editContent,
          name: value,
        });
        break;
      case "avatar":
        setEditContent({
          ...editContent,
          avatar: value,
        });
        break;
      case "contactEmail":
        setEditContent({
          ...editContent,
          contactEmail: value,
        });
        break;
      default:
        return editContent;
    }
  };
  const handleAlertOkClick = () => {
    setApiEror(false);
    if (apiError === "請先登入才能使用後台功能") {
      navigate("/login");
    } else {
      navigate("/");
    }
    return;
  };
  return (
    <>
      {apiError && (
        <AlertCard
          color="#A45D5D"
          title="錯誤"
          content={apiError}
          handleAlertOkClick={handleAlertOkClick}
        />
      )}
      <EditContainer>
        <SectionText>個人資訊</SectionText>
        <RowContainer>
          <EditButton onClick={handleEditClick}>
            {isEditing ? "取消編輯" : "編輯個人資訊"}
          </EditButton>
          {isEditing && (
            <SubmitButton onClick={handleSelfSubmitClick}>
              編輯完成
            </SubmitButton>
          )}
        </RowContainer>
      </EditContainer>
      <FormItemContainer show={!isEditing}>
        <ItemTop>
          <ItemName>Name</ItemName>
        </ItemTop>
        {teacherInfos && (
          <ItemBottom>
            <ItemValue show={!isEditing}>{teacherInfos.username}</ItemValue>
            {isEditing && (
              <EditInput
                error={error.includes("name")}
                defaultValue={teacherInfos.username}
                onChange={handleSelfInputChange}
                id="name"
              />
            )}
          </ItemBottom>
        )}
      </FormItemContainer>
      <FormItemContainer show={!isEditing}>
        <ItemTop>
          <ItemName>Avatar</ItemName>
        </ItemTop>
        {teacherInfos && (
          <ItemBottom>
            <ItemValue show={!isEditing}>{teacherInfos.avatar}</ItemValue>
            {isEditing && teacherInfos && (
              <EditInput
                error={error.includes("avatar")}
                defaultValue={teacherInfos.avatar}
                onChange={handleSelfInputChange}
                id="avatar"
              />
            )}
          </ItemBottom>
        )}
      </FormItemContainer>
      <FormItemContainer show={!isEditing}>
        <ItemTop>
          <ItemName>Contact Email</ItemName>
        </ItemTop>
        {teacherInfos && (
          <ItemBottom>
            <ItemValue show={!isEditing}>{teacherInfos.contactEmail}</ItemValue>
            {isEditing && teacherInfos && (
              <EditInput
                error={error.includes("contactEmail")}
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
