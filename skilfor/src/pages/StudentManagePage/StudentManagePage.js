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
  //個人資料或課程資料頁面
  const [page, setPage] = useState("self");
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
  //當個人資訊與儲值按鈕被按時
  const handlePageBtnClick = (e) => {
    const { id: currentPage } = e.target;
    setPage(currentPage);
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
          {studentInfos && (
            <Avatar imgSrc={student} name={studentInfos.username} />
          )}
          <PageBtnsContainer>
            <PageBtn
              id="self"
              onClick={handlePageBtnClick}
              isClick={page === "self"}
            >
              個人資料
            </PageBtn>
          </PageBtnsContainer>
        </UserInfoContainer>
        <FormContainer>
          {page === "self" && (
            <SelfPage
              studentInfos={studentInfos}
              setStudentInfos={setStudentInfos}
              setApiError={setApiError}
            />
          )}
        </FormContainer>
      </StudentManageContainer>
    </StudentManageWrapper>
  );
}
export default StudentManagePage;
