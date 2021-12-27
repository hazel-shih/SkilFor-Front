import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_MD } from "../../components/constants/breakpoints";
import PageTitle from "../../components/PageTitle";
import { courseData } from "./constant";
import { nanoid } from "nanoid";
import {
  RowContainer,
  SelectContainer,
  SelectBar,
  ChooseCategoryButton,
} from "../TeacherManagePage/components/CategoryDropDownMenu";
import { sleep } from "../../utils";

const AdminWrapper = styled.section`
  padding: 156px 80px 232px 80px;
  ${MEDIA_QUERY_MD} {
    padding: 156px 30px 182px 30px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

const AuditDropDownMenu = ({ courseId, audit }) => {
  const selectBar = useRef(null);
  return (
    <SelectContainer>
      <RowContainer>
        <SelectBar ref={selectBar} defaultValue={audit}>
          <option value="pending">審核中</option>
          <option value="success">審核成功</option>
          <option value="fail">審核失敗</option>
        </SelectBar>
        <ChooseCategoryButton
          onClick={() => handleAuditSubmit(selectBar, courseId, audit)}
        >
          送出
        </ChooseCategoryButton>
      </RowContainer>
    </SelectContainer>
  );
};

const GridHead = () => {
  return (
    <>
      <GridHeadItem>Course Name</GridHeadItem>
      <GridHeadItem>Teacher</GridHeadItem>
      <GridHeadItem>審核狀態</GridHeadItem>
    </>
  );
};
function GridRow({ courseId, courseName, teacher, audit }) {
  return (
    <>
      <GridItem>{courseName}</GridItem>
      <GridItem>{teacher}</GridItem>
      <GridItem>
        <AuditDropDownMenu courseId={courseId} audit={audit} />
      </GridItem>
    </>
  );
}

function AdminPage() {
  const [allCourses, setAllCourses] = useState([]);
  useEffect(() => {
    async function getData() {
      await sleep(500);
      setAllCourses(courseData);
    }
    getData();
  }, []);
  return (
    <AdminWrapper>
      <PageTitle>管理員後台</PageTitle>
      <GridContainer>
        <GridHead />
        {allCourses.map((course) => (
          <GridRow
            key={nanoid()}
            courseId={course.courseId}
            courseName={course.courseName}
            teacher={course.teacher}
            audit={course.audit}
          />
        ))}
      </GridContainer>
    </AdminWrapper>
  );
}

export default AdminPage;
