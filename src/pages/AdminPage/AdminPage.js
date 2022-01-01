import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_MD } from "../../components/constants/breakpoints";
import PageTitle from "../../components/PageTitle";
import { nanoid } from "nanoid";
import {
  RowContainer,
  SelectContainer,
  SelectBar,
  ChooseCategoryButton,
} from "../TeacherManagePage/components/CategoryDropDownMenu";
import { getAdminCourses } from "../../WebAPI";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";

const AdminWrapper = styled.section`
  padding: 156px 80px 232px 80px;
  ${MEDIA_QUERY_MD} {
    padding: 156px 30px 182px 30px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey_bg};
  padding: 10px;
  color: ${(props) => props.theme.colors.grey_dark};
`;

const GridHeadItem = styled(GridItem)`
  border-bottom: 2px solid ${(props) => props.theme.colors.grey_bg};
  padding: 10px;
  color: ${(props) => props.theme.colors.grey_light};
  font-weight: bold;
`;

const handleAuditSubmit = (selectBar, courseId, audit) => {
  let value = selectBar.current.value;
  if (value !== audit) {
    //將新 audit 狀態送到後端
    console.log(courseId, value);
  }
};

const SelectAuditContainer = styled(SelectContainer)`
  margin-bottom: 0px;
`;
const ChooseAuditButton = styled(ChooseCategoryButton)``;

const AuditDropDownMenu = ({ courseId, audit }) => {
  const selectBar = useRef(null);
  return (
    <SelectAuditContainer>
      <RowContainer>
        {audit === "pending" ? (
          <SelectBar ref={selectBar} defaultValue={audit}>
            <option value="pending">審核中</option>
            <option value="success">審核成功</option>
            <option value="fail">審核失敗</option>
          </SelectBar>
        ) : (
          <SelectBar ref={selectBar} defaultValue={audit}>
            <option value="success">審核成功</option>
            <option value="fail">審核失敗</option>
          </SelectBar>
        )}
        <ChooseAuditButton
          onClick={() => handleAuditSubmit(selectBar, courseId, audit)}
        >
          送出
        </ChooseAuditButton>
      </RowContainer>
    </SelectAuditContainer>
  );
};

const GridHead = () => {
  return (
    <>
      <GridHeadItem>課程名稱</GridHeadItem>
      <GridHeadItem>課程介紹</GridHeadItem>
      <GridHeadItem>課程點數</GridHeadItem>
      <GridHeadItem>審核狀態</GridHeadItem>
    </>
  );
};
function GridRow({ course }) {
  return (
    <>
      <GridItem>{course.courseName}</GridItem>
      <GridItem>{course.courseDescription}</GridItem>
      <GridItem>{course.price}</GridItem>
      <GridItem>
        <AuditDropDownMenu courseId={course.id} audit={course.audit} />
      </GridItem>
    </>
  );
}

const ButtonsContainer = styled(RowContainer)`
  flex-wrap: wrap;
  margin-bottom: 25px;
  justify-content: center;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`;

const FilterButton = styled.button`
  border: 2px solid ${(props) => props.theme.colors.grey_dark};
  padding: 7px 10px;
  color: ${(props) => props.theme.colors.grey_dark};
  background: white;
  border-radius: 5px;
  font-size: 1.1rem;
  :not(:last-child) {
    margin-right: 30px;
  }
  ${MEDIA_QUERY_SM} {
    min-width: 150px;
    :not(:last-child) {
      margin-right: 0px;
      margin-bottom: 10px;
    }
  }
  ${(props) =>
    props.isClick &&
    `
    background: ${props.theme.colors.grey_dark};
    color: white;
  `}
`;
function AdminPage() {
  const [buttonType, setButtonType] = useState("pending");
  const [showCourses, setShowCourses] = useState([]);

  useEffect(() => {
    async function getData() {
      getAdminCourses(buttonType).then((json) => {
        if (json && json.success) {
          setShowCourses(json.data);
        }
      });
    }
    getData();
  }, [buttonType]);
  const handleButtonClick = (e) => {
    let buttonId = e.target.id;
    setButtonType(buttonId);
  };

  return (
    <AdminWrapper>
      <PageTitle>管理員後台</PageTitle>
      <ButtonsContainer>
        <FilterButton
          id="pending"
          isClick={buttonType === "pending"}
          onClick={handleButtonClick}
        >
          待審核
        </FilterButton>
        <FilterButton
          id="success"
          isClick={buttonType === "success"}
          onClick={handleButtonClick}
        >
          審核成功
        </FilterButton>
        <FilterButton
          id="fail"
          isClick={buttonType === "fail"}
          onClick={handleButtonClick}
        >
          審核失敗
        </FilterButton>
      </ButtonsContainer>
      <GridContainer>
        <GridHead />
        {showCourses.map((course) => (
          <GridRow key={nanoid()} course={course} />
        ))}
      </GridContainer>
    </AdminWrapper>
  );
}

export default AdminPage;
