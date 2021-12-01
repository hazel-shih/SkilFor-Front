import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { CATEGORY_LIST } from "../Constant";
import { sleep } from "../../../utils";

const RowContainer = styled.div`
  display: flex;
`;
const SelectContainer = styled(RowContainer)`
  margin-bottom: 20px;
`;
const SelectBar = styled.select`
  padding: 5px;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey_dark};
  color: ${(props) => props.theme.colors.grey_dark};
`;
const ChooseCategoryButton = styled.button`
  border: 1px solid ${(props) => props.theme.colors.grey_dark};
  padding: 8px;
  font-size: 0.8rem;
  border-left: none;
  cursor: pointer;
  background: ${(props) => props.theme.colors.grey_dark};
  color: white;
  :hover {
    opacity: 0.85;
  }
`;

const CategoryDropDownMenu = ({
  courseInfos,
  setCourseInfos,
  setSelectedCourseInfos,
  setEditContent,
}) => {
  const [selectOptions, setSelectOptions] = useState(null);
  const makeSelectOptions = useCallback((categoryArr, courseArr) => {
    if (!categoryArr || !courseArr) return;
    let temp = [];
    for (let i = 0; i < courseArr.length; i++) {
      temp.push(courseArr[i].category);
    }
    let result = categoryArr.filter((category) => !temp.includes(category));
    return result;
  }, []);
  useEffect(() => {
    async function fetchData() {
      await sleep(100);
      setSelectOptions(CATEGORY_LIST);
    }
    fetchData();
  }, []);
  const selectedCategory = useRef(null);
  const handleSelectCategorySubmit = (e) => {
    if (!selectedCategory.current.value) return;
    let newCourseInfos = {
      category: selectedCategory.current.value,
      courseName: "",
      courseIntro: "",
      price: "",
      audit: false,
      published: false,
    };
    setCourseInfos([newCourseInfos, ...courseInfos]);
    setSelectedCourseInfos(newCourseInfos);
    setEditContent(newCourseInfos);
  };
  return (
    <SelectContainer>
      <RowContainer>
        <SelectBar id="addCategory" ref={selectedCategory}>
          <option value="">請選擇一個課程領域</option>
          {selectOptions &&
            courseInfos &&
            makeSelectOptions(selectOptions, courseInfos).map((category) => (
              <option key={category}>{category}</option>
            ))}
          {courseInfos &&
            courseInfos.length === 0 &&
            selectOptions.map((category) => (
              <option key={category}>{category}</option>
            ))}
        </SelectBar>
        <ChooseCategoryButton onClick={handleSelectCategorySubmit}>
          新增
        </ChooseCategoryButton>
      </RowContainer>
    </SelectContainer>
  );
};

export default CategoryDropDownMenu;
