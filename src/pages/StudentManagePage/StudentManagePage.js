import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import PageTitle from "../../components/PageTitle";
import SelfPage from "../TeacherManagePage/components/SelfPage";
import useCheckToken from "../TeacherManagePage/hooks/useCheckToken";
import { getUserInfos } from "../../WebAPI.js";
import AlertCard from "../../components/AlertCard/AlertCard";
import {
  TeacherManageWrapper,
  TeacherManageContainer,
  UserInfoContainer,
  PageBtnsContainer,
  PageBtn,
  FormContainer,
} from "../TeacherManagePage/TeacherManagePage";
import { useTranslation } from "next-i18next";
const StudentManageWrapper = styled(TeacherManageWrapper)``;
const StudentManageContainer = styled(TeacherManageContainer)``;

function StudentManagePage() {
  const { t } = useTranslation();
  useCheckToken();
  const navigate = useNavigate();
  //學生個人資訊
  const [studentInfos, setStudentInfos] = useState(null);
  const [apiError, setApiError] = useState(false);
  useEffect(() => {
    const getData = async (setApiError) => {
      let json = await getUserInfos(setApiError);
      if (!json || !json.success) {
        return setApiError(`${t("請先登入才能使用後台功能")}`);
      }
      setStudentInfos(json.data);
    };
    getData(setApiError);
  }, [t]);
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
    <StudentManageWrapper>
      <PageTitle>{t("管理後台")}</PageTitle>
      <StudentManageContainer>
        {apiError && (
          <AlertCard
            color="#A45D5D"
            title={t("錯誤")}
            content={apiError}
            handleAlertOkClick={handleAlertOkClick}
          />
        )}
        <UserInfoContainer>
          {studentInfos && (
            <Avatar
              imgSrc="https://i.imgur.com/f9bnLUM.png"
              name={studentInfos.username}
              status={`${t("點數")}：${
                !studentInfos.points ? 0 : studentInfos.points
              }`}
            />
          )}
          <PageBtnsContainer>
            <PageBtn isClick={true}>{t("個人資訊")}</PageBtn>
          </PageBtnsContainer>
        </UserInfoContainer>
        <FormContainer>
          <SelfPage
            infos={studentInfos}
            setInfos={setStudentInfos}
            setApiError={setApiError}
          />
        </FormContainer>
      </StudentManageContainer>
    </StudentManageWrapper>
  );
}
export default StudentManagePage;
