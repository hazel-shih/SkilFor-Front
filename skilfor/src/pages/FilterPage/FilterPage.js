import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import { useState, useEffect, useRef } from "react";
import TeacherFilterResult from "../FilterPage/TeacherFilterResult";
import { useNavigate } from "react-router-dom";
import {
  getAllCategories,
  getSpecificCourse,
  getAllCourses,
} from "../../WebAPI";
import AlertCard from "../../components/AlertCard/AlertCard";

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
  overflow: scroll;
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

function FilterPage() {
  const navigate = useNavigate();
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

  const [apiError, setApiError] = useState(false);
  const [courseError, setCourseError] = useState(false);

  const [dropdownContent, setDropdownContent] = useState([]);

  const [courseResults, setCourseResults] = useState([]);

  const [currentCategoryName, setCurrentCategoryName] = useState("");
  const [currentCategoryDisplayName, setCurrentCategoryDisplayName] =
    useState("請選擇領域");

  useEffect(() => {
    async function getCategoryOptions(setApiError) {
      let json = await getAllCategories(setApiError);
      if (!json.success) return setApiError("發生了一點錯誤，請稍後再試");
      setDropdownContent(json.data);
      console.log(json.data);
    }
    getCategoryOptions(setApiError);
  }, [setApiError, setDropdownContent]);

  useEffect(() => {
    const getAllCourseResults = async (currentCategoryName, setApiError) => {
      let json = await getAllCourses(setApiError);
      if (!json.success) return setApiError("發生了一點錯誤，請稍後再試");
      console.log(json.data);
      setCourseResults(json.data);
    };
    getAllCourseResults(setApiError);
  }, [setApiError, setCourseResults]);

  useEffect(() => {
    const getSpecificCourseResults = async (
      currentCategoryName,
      setApiError
    ) => {
      let json = await getSpecificCourse(currentCategoryName, setApiError);
      if (!json.success) return setApiError("發生了一點錯誤，請稍後再試");
      if (json.data.indexOf("目前尚未有課程") === 0) {
        return setCourseError("目前尚未有課程");
      }
      // if (currentCategoryName === "") return;
      console.log(json.data);
      setCourseResults(json.data);
    };
    getSpecificCourseResults(currentCategoryName, setApiError);
  }, [setApiError, currentCategoryName, setCourseError, setCourseResults]);
  // 點選某 category 後顯示資料
  const handleCategoryClick = (e) => {
    const { id: selectedCategoryName, value: selectedCategoryDisplayName } =
      e.target;
    setCurrentCategoryName(selectedCategoryName);
    setCurrentCategoryDisplayName(selectedCategoryDisplayName);
    setDropdownMenu(false);
  };

  const handleAlertOkClick = () => {
    setCourseError(false);
    setApiError(false);
    if (courseError) {
      setCurrentCategoryDisplayName("請選擇領域");
      setCurrentCategoryName("");
      setCourseResults([]);
      navigate("/filter");
    }
    if (apiError) {
      navigate("/login");
    }
    return;
  };

  return (
    <Container onClick={handleClickDropdownMenuOutside}>
      <Title>搜尋老師</Title>
      {apiError && (
        <AlertCard
          color="#A45D5D"
          title="錯誤"
          content={apiError}
          handleAlertOkClick={handleAlertOkClick}
        />
      )}
      {courseError && (
        <AlertCard
          color="#A45D5D"
          title="錯誤"
          content={courseError}
          handleAlertOkClick={handleAlertOkClick}
        />
      )}
      <DropdownLabel ref={dropdownLabel}>
        <DropdownBtn onClick={handleDropdownMenuToggle}>
          {currentCategoryDisplayName}
        </DropdownBtn>
        <DropdownInput type="checkbox" id="select" />
        {dropdownMenu && (
          <DropdownMenu>
            {dropdownContent.map((categories) => (
              <DropdownContent
                onClick={handleCategoryClick}
                key={categories.teacherId}
                id={categories.name}
              >
                {categories.displayName}
              </DropdownContent>
            ))}
          </DropdownMenu>
        )}
      </DropdownLabel>
      <ResultList>
        {courseResults.map((courseResult) => (
          <TeacherFilterResult key={courseResult.id} result={courseResult} />
        ))}
      </ResultList>
    </Container>
  );
}

export default FilterPage;
