import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { getAllCategories } from "../../../WebAPI";

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
const makeSelectOptions = (categoryArr, courseArr) => {
  let temp = [];
  for (let i = 0; i < courseArr.length; i++) {
    temp.push(courseArr[i].category);
  }
  let result = categoryArr.filter(
    (category) => !temp.includes(category.displayName)
  );
  return result;
};

function CategoryDropDownMenu({
  courseInfos,
  setCourseInfos,
  setSelectedCourseInfos,
  setEditContent,
  setApiError,
}) {
  const [selectOptions, setSelectOptions] = useState(null);
  useEffect(() => {
    async function getCategoryOptions(setApiError) {
      let json = await getAllCategories(setApiError);
      if (!json.success) return setApiError("發生了一點錯誤，請稍後再試");
      setSelectOptions(json.data);
    }
    getCategoryOptions(setApiError);
  }, [setApiError]);
  const selectedCategory = useRef(null);
  const handleSelectCategorySubmit = (e) => {
    if (!selectedCategory.current.value) return;
    let newCourseInfos = {
      category: selectedCategory.current.value,
      courseName: "",
      courseDescription: "",
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
          {selectOptions && courseInfos && (
            <>
              {courseInfos.length !== 0 &&
                makeSelectOptions(selectOptions, courseInfos).map(
                  (category) => (
                    <option key={category.name} value={category.name}>
                      {category.displayName}
                    </option>
                  )
                )}
              {courseInfos.length === 0 &&
                selectOptions.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.displayName}
                  </option>
                ))}
            </>
          )}
        </SelectBar>
        <ChooseCategoryButton onClick={handleSelectCategorySubmit}>
          新增
        </ChooseCategoryButton>
      </RowContainer>
    </SelectContainer>
  );
}

export default CategoryDropDownMenu;
