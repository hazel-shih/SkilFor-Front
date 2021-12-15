import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import PageTitle from "../../components/PageTitle";
import SelfPage from "../TeacherManagePage/components/SelfPage";
import useCheckToken from "../TeacherManagePage/hooks/useCheckToken";
import student from "../../img/student1.png";
// import { getStudentInfos } from "../../WebAPI.js";
import AlertCard from "../../components/AlertCard/AlertCard";
import {
  TeacherManageWrapper,
  TeacherManageContainer,
  UserInfoContainer,
  PageBtnsContainer,
  PageBtn,
  FormContainer,
} from "../TeacherManagePage/TeacherManagePage";

const StudentManageWrapper = styled(TeacherManageWrapper)``;
const StudentManageContainer = styled(TeacherManageContainer)``;

function StudentManagePage() {
  useCheckToken();
  const navigate = useNavigate();
  //老師個人資訊
  const [studentInfos, setStudentInfos] = useState(null);
  const [apiError, setApiError] = useState(false);
  useEffect(() => {
    // const getData = async (setApiError) => {
    //   let json = await getStudentInfos(setApiError);
    //   if (!json || !json.success) {
    //     return setApiError("請先登入才能使用後台功能");
    //   }
    //   setStudentInfos(json.data);
    // };
    // getData(setApiError);
  }, []);

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
      <PageTitle>後台管理</PageTitle>
      <StudentManageContainer>
        {apiError && (
          <AlertCard
            color="#A45D5D"
            title="錯誤"
            content={apiError}
            handleAlertOkClick={handleAlertOkClick}
          />
        )}
        <UserInfoContainer>
          {true && <Avatar imgSrc={student} name="Hazel Student" />}
          <PageBtnsContainer>
            <PageBtn isClick={true}>個人資料</PageBtn>
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
