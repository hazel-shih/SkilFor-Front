import React, { useState } from "react";
import styled from "styled-components";
import teacher from "../../img/teacher.jpeg";
import FormItem from "./FormItem";

const TeacherManageWrapper = styled.section`
  padding: 196px 100px 182px 100px;
`;

const PageTitle = styled.h1`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1.8rem;
  margin-bottom: 30px;
`;

const RowContainer = styled.div`
  display: flex;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TeacherManageContainer = styled(RowContainer)`
  margin-bottom: 30px;
`;

const UserInfoContainer = styled(ColumnContainer)`
  background: ${(props) => props.theme.colors.grey_bg};
  min-width: 200px;
  margin-right: 50px;
`;

const AvatarContainer = styled(ColumnContainer)`
  height: 200px;
  background: ${(props) => props.theme.colors.green_dark};
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: white;
  background-image: url(${(props) => props.imgSrc});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const AvatarName = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-top: 12px;
`;

const PageBtnsContainer = styled(ColumnContainer)`
  padding: 20px 25px;
`;

const PageBtn = styled.button`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1.1rem;
  border: none;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background: ${(props) => props.theme.colors.orange};
    color: white;
  }
`;

const FormContainer = styled(ColumnContainer)`
  width: 100%;
  height: 500px;
  border: 1px solid ${(props) => props.theme.colors.grey_dark};
  border-radius: 10px;
  padding: 20px;
`;

function TeacherManagePage() {
  return (
    <TeacherManageWrapper>
      <PageTitle>後台管理</PageTitle>
      <TeacherManageContainer>
        <UserInfoContainer>
          <AvatarContainer>
            <Avatar imgSrc={teacher} />
            <AvatarName>Kelly</AvatarName>
          </AvatarContainer>
          <PageBtnsContainer>
            <PageBtn>個人資料</PageBtn>
            <PageBtn>課程資料</PageBtn>
          </PageBtnsContainer>
        </UserInfoContainer>
        <FormContainer>
          <FormItem itemName="Name" value="Kelly" />
          <FormItem itemName="Avatar" value="https://Kelly.png" />
          <FormItem itemName="Email" value="kelly123@gmail.com" />
        </FormContainer>
      </TeacherManageContainer>
    </TeacherManageWrapper>
  );
}

export default TeacherManagePage;
