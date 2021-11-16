import styled from "styled-components";

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

const TeacherManageContainer = styled(RowContainer)``;

const UserInfoContainer = styled(ColumnContainer)`
  background: ${(props) => props.theme.colors.grey_bg};
  width: 200px;
  height: 500px;
`;

const AvatarContainer = styled(ColumnContainer)`
  height: 200px;
  background: ${(props) => props.theme.colors.green_dark};
`;

function TeacherManagePage() {
  return (
    <TeacherManageWrapper>
      <PageTitle>後台管理</PageTitle>
      <TeacherManageContainer>
        <UserInfoContainer>
          <AvatarContainer></AvatarContainer>
        </UserInfoContainer>
      </TeacherManageContainer>
    </TeacherManageWrapper>
  );
}

export default TeacherManagePage;
