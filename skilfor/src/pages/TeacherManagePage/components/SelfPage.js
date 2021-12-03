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
import { updateTeacherInfos } from "../../../WebAPI";
import { validateEmail } from "../../../utils";

const formDataVerify = (formData) => {
  let errorArr = [];
  for (let question in formData) {
    if (formData[question] === "") errorArr.push(question);
    if (question === "contactEmail" && !validateEmail(formData[question])) {
      errorArr.push("invalid email");
    }
  }
  return errorArr;
};
const postTeacherInfos = async (setApiError, editContent) => {
  let json = await updateTeacherInfos(setApiError, editContent);
  if (json.errMessage) {
    return setApiError("請先登入才能使用後台功能");
  }
};
function SelfPage({ teacherInfos, setTeacherInfos, apiError, setApiError }) {
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
  //編輯欄位時
  const handleSelfInputChange = (e) => {
    const { id: inputName, value } = e.target;
    setEditContent({
      ...editContent,
      [inputName]: value,
    });
  };
  //完成編輯個人資訊按鈕被按時
  const handleSelfSubmitClick = () => {
    if (editContent === teacherInfos) {
      return setIsEditing(false);
    }
    let errorArr = formDataVerify(editContent);
    if (errorArr.length === 0) {
      setIsEditing(false);
      postTeacherInfos(setApiError, editContent);
      setTeacherInfos(editContent);
      return;
    }
    setError(errorArr);
    if (errorArr.includes("invalid email")) {
      if (errorArr.length > 1) {
        return alert("尚有欄位未填寫，且 Contact Email 格式錯誤！");
      } else {
        return alert("Contact Email 格式錯誤！");
      }
    }
    return alert("尚有欄位未填寫！");
  };

  const handleAlertOkClick = () => {
    setApiError(false);
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
                error={error.includes("username")}
                defaultValue={teacherInfos.username}
                onChange={handleSelfInputChange}
                id="username"
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
                error={
                  error.includes("contactEmail") ||
                  error.includes("invalid email")
                }
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
