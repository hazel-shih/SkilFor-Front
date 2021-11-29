import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import { useState } from "react";
import TeacherFilterResult from "../FilterPage/TeacherFilterResult";
import { CATEGORY_LIST, COURSE_LIST } from "./Constant";
import { useEffect, useRef } from "react";
import { sleep } from "../../utils";

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

const DropdownLabel = styled.div`
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
  width: 100%;
  z-index: 2;
`;

const DropdownContent = styled.option`
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
  // 控制 dropdownMenu 出現與否
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const handleDropdownMenuToggle = () => {
    setDropdownMenu(!dropdownMenu);
  };

  // 點選 dropdown 以外的地方 dropdown auto close
  const dropdownLabel = useRef(null);
  const handleClickDropdownMenuOutside = (e) => {
    if (dropdownLabel.current && !dropdownLabel.current.contains(e.target)) {
      setDropdownMenu(false);
    }
  };

  // 點選 dropdown 後從資料庫拿目前有哪些 category
  const [dropdownContent, setDropdownContent] = useState([]);
  // 拿取某 category 的所有 result
  const [results, setResults] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await sleep(500);
      setResults(COURSE_LIST);
      setDropdownContent(CATEGORY_LIST);
    }
    fetchData();
  }, [results, dropdownContent]);

  // 點選某 category 後顯示資料
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentCategoryInput, setCurrentCategoryInput] =
    useState("請選擇領域");

  const handleCategoryClick = (e) => {
    const { id: selectedCategory, value } = e.target;
    setCurrentCategory(selectedCategory);
    setCurrentCategoryInput(value);
    setDropdownMenu(false);
  };

  return (
    <Container onClick={handleClickDropdownMenuOutside}>
      <Title>搜尋老師</Title>
      <DropdownLabel ref={dropdownLabel}>
        <DropdownBtn onClick={handleDropdownMenuToggle}>
          {currentCategoryInput}
        </DropdownBtn>
        <DropdownInput type="checkbox" id="select" />
        {dropdownMenu && (
          <DropdownMenu>
            {dropdownContent.map((categories) => (
              <DropdownContent
                onClick={handleCategoryClick}
                key={categories.id}
                id={categories.category}
                value={categories.chineseName}
              >
                {categories.chineseName}
              </DropdownContent>
            ))}
          </DropdownMenu>
        )}
      </DropdownLabel>
      <ResultList>
        {results
          .filter((result) => {
            return result.category === currentCategory;
          })
          .map((result) => (
            <TeacherFilterResult key={result.id} result={result} />
          ))}
      </ResultList>
    </Container>
  );
}

export default FilterPage;
