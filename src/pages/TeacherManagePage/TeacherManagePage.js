import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import PageTitle from "../../components/PageTitle";
import CoursePage from "./components/CoursePage";
import SelfPage from "./components/SelfPage";
import { MEDIA_QUERY_MD } from "../../components/constants/breakpoints";
import useCheckToken from "./hooks/useCheckToken";
import { getUserInfos } from "../../WebAPI.js";
import AlertCard from "../../components/AlertCard/AlertCard";
import { useTranslation } from "react-i18next";

//styled component
export const TeacherManageWrapper = styled.section`
  padding: 156px 80px 232px 80px;
  ${MEDIA_QUERY_MD} {
    padding: 156px 30px 182px 30px;
  }
`;
export const RowContainer = styled.div`
  display: flex;
`;
export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TeacherManageContainer = styled(RowContainer)`
  margin-bottom: 30px;
  ${MEDIA_QUERY_MD} {
    flex-direction: column;
  }
`;
export const UserInfoContainer = styled(ColumnContainer)`
  background: ${(props) => props.theme.colors.grey_bg};
  min-width: 200px;
  margin-right: 50px;
  ${MEDIA_QUERY_MD} {
    margin-right: 0px;
    margin-bottom: 40px;
  }
`;
export const PageBtnsContainer = styled(ColumnContainer)`
  padding: 20px 25px;
`;
export const PageBtn = styled.button`
  color: ${(props) => (props.isClick ? "white" : props.theme.colors.grey_dark)};
  background: ${(props) => props.isClick && props.theme.colors.orange};
  font-size: 1.1rem;
  border: none;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
`;
export const FormContainer = styled(ColumnContainer)`
  width: 100%;
  min-height: 500px;
  border: 1px solid ${(props) => props.theme.colors.grey_dark};
  border-radius: 10px;
  padding: 20px;
`;
export const SectionText = styled.h3`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.green_dark};
  margin: 10px 0 20px 0;
`;
export const EditContainer = styled(RowContainer)`
  justify-content: space-between;
  align-items: baseline;
  margin-top: 10px;
`;
export const EditButton = styled.button`
  background: ${(props) => props.theme.colors.green_dark};
  border: none;
  color: white;
  font-size: 1rem;
  height: fit-content;
  padding: 7px 14px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
export const SubmitButton = styled(EditButton)`
  margin-left: 15px;
`;

function TeacherManagePage() {
  const { t } = useTranslation();
  useCheckToken();
  const navigate = useNavigate();
  //個人資料或課程資料頁面
  const [page, setPage] = useState("self");
  //老師個人資訊
  const [teacherInfos, setTeacherInfos] = useState(null);
  const [apiError, setApiError] = useState(false);
  useEffect(() => {
    const getData = async (setApiError) => {
      let json = await getUserInfos(setApiError);
      if (!json || !json.success) {
        return setApiError(`${t("請先登入才能使用後台功能")}`);
      }
      setTeacherInfos(json.data);
    };
    getData(setApiError);
  }, [t]);
  //當個人資訊與課程資訊按鈕被按時
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
    <TeacherManageWrapper>
      <PageTitle>{t("管理後台")}</PageTitle>
      <TeacherManageContainer>
        {apiError && (
          <AlertCard
            color="#A45D5D"
            title="錯誤"
            content={apiError}
            handleAlertOkClick={handleAlertOkClick}
          />
        )}
        <UserInfoContainer>
          {teacherInfos && (
            <Avatar
              imgSrc="https://i.imgur.com/7AGhwxo.png"
              name={teacherInfos.username}
            />
          )}
          <PageBtnsContainer>
            <PageBtn
              id="self"
              onClick={handlePageBtnClick}
              isClick={page === "self"}
            >
              {t("個人資訊")}
            </PageBtn>
            <PageBtn
              id="course"
              onClick={handlePageBtnClick}
              isClick={page === "course"}
            >
              {t("課程資訊")}
            </PageBtn>
          </PageBtnsContainer>
        </UserInfoContainer>
        <FormContainer>
          {page === "self" && (
            <SelfPage
              infos={teacherInfos}
              setInfos={setTeacherInfos}
              setApiError={setApiError}
            />
          )}
          {page === "course" && (
            <CoursePage apiError={apiError} setApiError={setApiError} />
          )}
        </FormContainer>
      </TeacherManageContainer>
    </TeacherManageWrapper>
  );
}

export default TeacherManagePage;
