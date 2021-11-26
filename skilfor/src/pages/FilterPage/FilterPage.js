import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import { useState } from "react";
import TeacherFilterResult from "../FilterPage/TeacherFilterResult";
import { COURSE_LIST } from "./Constant";

const Container = styled.div`
  padding: 120px 100px 160px 100px;
  position: relative;
  text-align: center;
  margin: 0 auto;
  max-width: 1440px;
  ${MEDIA_QUERY_SM} {
    padding: 120px 10px 160px 10px;
  }
`;

const Title = styled.h1`
  padding: 5px 0px;
  margin-bottom: 10px;
  font-size: 1.7rem;
  color: ${(props) => props.theme.colors.grey_dark};
  ${MEDIA_QUERY_SM} {
    font-size: 1.4rem;
  }
`;

const DropdownLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 560px;
  margin: 0 auto;
  ${MEDIA_QUERY_SM} {
    max-width: 300px;
  }
`;

const DropdownBtn = styled.button`
  display: inline-block;
  border: 1px solid ${(props) => props.theme.colors.grey_light};
  border-radius: 4px;
  padding: 10px 30px 10px 24px;
  background-color: white;
  cursor: pointer;
  white-space: nowrap;
  width: 100%;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.grey_dark};
  margin: 0 auto;

  :after {
    content: "";
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid black;
  }

  ${MEDIA_QUERY_SM} {
    padding: 8px 5px;
    font-size: 1rem;
  }
`;

const DropdownInput = styled.input`
  display: none;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  border: 1px solid ${(props) => props.theme.colors.grey_light};
  border-radius: 4px;
  padding: 0;
  margin: 2px 0 0 0;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  list-style-type: none;
  display: ${(props) => (props.show ? "block" : "none")};
  width: 100%;
  z-index: 2;
`;

const DropdownContent = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 1.2rem;
  text-align: left;
  color: ${(props) => props.theme.colors.grey_dark};
  border-bottom: 1px solid ${(props) => props.theme.colors.grey_light};
  :hover {
    background-color: #f6f6f6;
    font-weight: bold;
  }
  ${MEDIA_QUERY_SM} {
    font-size: 1rem;
  }
`;

const ResultList = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  width: 100%;
  margin: 10px auto 0px;
  min-height: 50vh;
  ${MEDIA_QUERY_SM} {
    max-width: 768px;
  }
`;

function FilterPage() {
  const [categoryList, setCategoryList] = useState(false);
  const handleDropdownBtnToggle = () => {
    setCategoryList(!categoryList);
  };

  const fetchData = () => {
    console.log(COURSE_LIST);
    setCourses(COURSE_LIST);
  };

  const [courses, setCourses] = useState([]);
  const handleCategoryClick = (e) => {
    const { id: selectedCategory } = e.target;
    setCurrentCategory(selectedCategory);
    fetchData();
  };

  const [currentCategory, setCurrentCategory] = useState(null);

  return (
    <Container>
      <Title>搜尋老師</Title>
      <DropdownLabel>
        <DropdownBtn onClick={handleDropdownBtnToggle}>請選擇領域</DropdownBtn>
        <DropdownInput type="checkbox" id="select" />
        <DropdownMenu show={categoryList}>
          <DropdownContent onClick={handleCategoryClick} id="coding">
            程式
          </DropdownContent>
          <DropdownContent onClick={handleCategoryClick} id="music">
            音樂
          </DropdownContent>
        </DropdownMenu>
      </DropdownLabel>
      <ResultList>
        {courses
          .filter((course) => {
            return course.category === currentCategory;
          })
          .map((course) => (
            <TeacherFilterResult course={course} />
          ))}
      </ResultList>
    </Container>
  );
}

export default FilterPage;
