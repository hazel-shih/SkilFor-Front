import styled from "styled-components";
import {
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../../components/constants/breakpoints";
import { useState, useEffect, useRef } from "react";
import TeacherFilterResult from "../FilterPage/TeacherFilterResult";
import {
  getAllCategories,
  getSpecificCourse,
  getAllCourses,
} from "../../WebAPI";

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
  padding: 10px 0px 0px;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.grey_dark};
  ${MEDIA_QUERY_SM} {
    font-size: 1.4rem;
  }
`;
const DropdownLabel = styled.div`
  position: relative;
  display: inline-block;
  width: 560px;
  margin: 30px auto 0px;
  ${MEDIA_QUERY_MD} {
    max-width: 375px;
  }
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
  overflow-y: auto;
  overflow-x: hidden;
  height: 180px;
  ${MEDIA_QUERY_SM} {
    height: 220px;
  }
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
const ErrorMessage = styled.div`
  color: #cc0033;
  font-weight: bold;
  font-size: 1.3rem;
  width: 560px;
  background-color: #fce4e4;
  border: 1px solid #fcc2c3;
  border-radius: 20px;
  float: left;
  padding: 40px 30px 30px;
  line-height: 30px;
  text-shadow: 1px 1px rgba(250, 250, 250, 0.3);
  min-width: 300px;
  margin: 50px 0px;
  text-align: center;
  ${MEDIA_QUERY_MD} {
    max-width: 375px;
  }
  ${MEDIA_QUERY_SM} {
    max-width: 300px;
  }
`;
const ErrorBtn = styled.button`
  display: block;
  height: 35px;
  width: 90px;
  margin: 25px auto 0px;
  background-color: #cc0033;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 6px 10px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
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

  const [filterError, setFilterError] = useState(false);
  const [dropdownContent, setDropdownContent] = useState([]);
  const [courseResults, setCourseResults] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({
    name: "",
    displayName: "請選擇領域",
  });

  useEffect(() => {
    const getCategoryOptions = async (setFilterError) => {
      let json = await getAllCategories(setFilterError);
      if (!json.success) return setFilterError("發生了一點錯誤，請稍後再試");
      if (json.data.length === 0)
        return setFilterError("目前尚未有領域開放查詢，請稍後再試");
      setDropdownContent(json.data);
    };
    getCategoryOptions(setFilterError);
  }, [setFilterError, setDropdownContent]);

  useEffect(() => {
    const getAllCourseResults = async (setFilterError) => {
      let json = await getAllCourses(setFilterError);
      if (!json.success) return setFilterError("發生了一點錯誤，請稍後再試");
      if (json.data.length === 0) {
        return setFilterError("目前尚未有課程上架，請稍後再試");
      }
      setCourseResults(json.data);
    };
    getAllCourseResults(setFilterError);
  }, [setFilterError, setCourseResults]);

  useEffect(() => {
    const getSpecificCourseResults = async (
      currentCategory,
      setFilterError
    ) => {
      let json = await getSpecificCourse(currentCategory.name, setFilterError);
      if (!json.success) return setFilterError("發生了一點錯誤，請稍後再試");
      if (json.data.length === 0) {
        return setFilterError(
          "oops ! 目前此領域課程尚未上架，先逛逛其他領域吧 ~"
        );
      }
      setCourseResults(json.data);
    };
    getSpecificCourseResults(currentCategory, setFilterError);
  }, [setFilterError, currentCategory, setCourseResults]);

  const handleCategoryClick = (e) => {
    const { id: name, value: displayName } = e.target;
    setFilterError(false);
    setCurrentCategory({
      name,
      displayName,
    });
    setDropdownMenu(false);
  };

  const handleOkClick = () => {
    setFilterError(false);
    setCurrentCategory({ name: "", displayName: "請選擇領域" });
    return;
  };

  return (
    <Container onClick={handleClickDropdownMenuOutside}>
      <Title>搜尋老師</Title>
      <DropdownLabel ref={dropdownLabel}>
        <DropdownBtn onClick={handleDropdownMenuToggle}>
          {currentCategory.displayName}
        </DropdownBtn>
        {dropdownMenu && (
          <DropdownMenu>
            {dropdownContent.map((categories) => (
              <DropdownContent
                onClick={handleCategoryClick}
                key={categories.id}
                id={categories.name}
              >
                {categories.displayName}
              </DropdownContent>
            ))}
          </DropdownMenu>
        )}
      </DropdownLabel>
      <ResultList>
        {filterError && (
          <ErrorMessage>
            {filterError}
            <ErrorBtn onClick={handleOkClick}>OK</ErrorBtn>
          </ErrorMessage>
        )}
        {!filterError &&
          courseResults.map((courseResult) => (
            <TeacherFilterResult
              key={courseResult.courseId}
              result={courseResult}
            />
          ))}
      </ResultList>
    </Container>
  );
}

export default FilterPage;
