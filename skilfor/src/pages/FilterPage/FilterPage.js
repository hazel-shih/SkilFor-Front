import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import { useState } from "react";
import Avatar from "../../components/Avatar";
import teacherPic from "../../img/teacher.jpeg";

const Container = styled.div`
  padding: 140px 100px 160px 100px;
  position: relative;
  text-align: center;
  margin: 0 auto;
  max-width: 1440px;
  ${MEDIA_QUERY_SM} {
    padding: 140px 50px 160px 50px;
  }
`;

const Title = styled.h1`
  padding: 5px 0px;
  color: ${(props) => props.theme.colors.grey_dark};
  ${MEDIA_QUERY_SM} {
    font-size: 20px;
  }
`;

const DropdownLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 400px;
  margin: 0 auto;
  ${MEDIA_QUERY_SM} {
    max-width: 200px;
  }
`;

const DropdownBtn = styled.button`
  display: inline-block;
  border: 1px solid ${(props) => props.theme.colors.grey_light};
  border-radius: 4px;
  padding: 10px 30px 10px 20px;
  background-color: white;
  cursor: pointer;
  white-space: nowrap;
  width: 100%;
  font-size: 18px;
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
    font-size: 12px;
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
`;

const DropdownContent = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 18px;
  text-align: left;

  :hover {
    background-color: #f6f6f6;
    font-weight: bold;
  }

  & > a {
    display: block;
    text-decoration: none;
    color: ${(props) => props.theme.colors.grey_dark};
    margin: -10px -20px;
    padding: 10px 20px;
    border-bottom: 1px solid ${(props) => props.theme.colors.grey_light};
  }
`;

const ResultList = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  width: 100%;
  margin: 0 auto;
  min-height: 50vh;
  ${MEDIA_QUERY_SM} {
    max-width: 768px;
  }
`;

const TeacherBlock = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  height: 200px;
  width: 395px;
  margin: 25px 5px;
  ${MEDIA_QUERY_SM} {
    max-width: 300px;
    display: block;
    height: 350px;
  }
`;

const EmptyBlock = styled.div`
  height: 200px;
  width: 395px;
  margin: 25px 5px;
`;

const CourseBlock = styled.div`
  color: ${(props) => props.theme.colors.grey_dark};
  padding: 10px 20px;
  width: 250px;
  border: 2px dotted ${(props) => props.theme.colors.green_dark};
  ${MEDIA_QUERY_SM} {
    padding: 5px;
    width: 300px;
  }
`;

const CourseName = styled.h2`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: 8px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey_light};
  ${MEDIA_QUERY_SM} {
    padding: 5px;
    font-size: 16px;
  }
`;

const CourseIntro = styled.p`
  margin: 10px 0px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-align: justify;
  ${MEDIA_QUERY_SM} {
    font-size: 12px;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Btn = styled.button`
  border-radius: 40px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.orange};
  color: white;
  font-weight: bold;
  padding: 15px 0px;
  width: 90px;
  height: 50px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 12px;
  ${MEDIA_QUERY_SM} {
    padding: 6px 0px;
    width: 80px;
  }
`;

function FilterPage() {
  const [categoryList, setCategoryList] = useState(false);
  const handleDropdownBtnToggle = () => {
    setCategoryList(!categoryList);
  };

  return (
    <Container>
      <Title>搜尋老師</Title>
      <DropdownLabel>
        <DropdownBtn onClick={handleDropdownBtnToggle}>請選擇領域</DropdownBtn>
        <DropdownInput type="checkbox" id="searchbox" />
        <DropdownMenu show={categoryList}>
          <DropdownContent>
            <a href="/category/1">程式</a>
          </DropdownContent>
          <DropdownContent>
            <a href="/category/2">音樂</a>
          </DropdownContent>
        </DropdownMenu>
      </DropdownLabel>
      <ResultList>
        <TeacherBlock>
          <Avatar imgSrc={teacherPic} name="Jack" />
          <CourseBlock>
            <CourseName>
              用吉他彈出嚇嚇叫的生日快樂歌用吉他彈出嚇嚇叫的生日快樂歌
            </CourseName>
            <CourseIntro>
              吉他（英語：guitar，港澳稱結他），是一種彈撥樂器。通常有六條弦，形狀與提琴相似。吉他在流行音樂、搖滾音樂、藍調、民歌、佛朗明哥中，常被視為主要樂器；在古典音樂的領域裡，吉他常以獨奏或二重奏的型式演出；在室內樂和管弦樂中，吉他亦扮演著相當程度的陪襯角色。
            </CourseIntro>
            <BtnDiv>
              <Btn>更多資訊</Btn>
            </BtnDiv>
          </CourseBlock>
        </TeacherBlock>
        <TeacherBlock>
          <Avatar imgSrc={teacherPic} name="Jack" />
          <CourseBlock>
            <CourseName>一起來學習超潮的 Ruby 吧！</CourseName>
            <CourseIntro>
              經過幾年的發展，Spring Boot
              的功能已經非常成熟，並且在近幾年軟體業盛行微服務（microservice）的設計模式下，也帶動越來越多企業選擇使用Spring
              Boot 作為主流的開發工具。Spring Boot
              之所以能夠成為目前業界最流行的開發工具，原因就在於 Spring Boot
              憑借著 簡化 Spring 開發 以及
              快速整合主流框架的優點，讓工程師們可以更專注的在解決問題上，進而提升了前期開發和後續部署的效率。
            </CourseIntro>
            <BtnDiv>
              <Btn>更多資訊</Btn>
            </BtnDiv>
          </CourseBlock>
        </TeacherBlock>
        <TeacherBlock>
          <Avatar imgSrc={teacherPic} name="Jack" />
          <CourseBlock>
            <CourseName>一起來學習超潮的 Ruby 吧！</CourseName>
            <CourseIntro>
              經過幾年的發展，Spring Boot
              的功能已經非常成熟，並且在近幾年軟體業盛行微服務（microservice）的設計模式下，也帶動越來越多企業選擇使用Spring
              Boot 作為主流的開發工具。Spring Boot
              之所以能夠成為目前業界最流行的開發工具，原因就在於 Spring Boot
              憑借著 簡化 Spring 開發 以及
              快速整合主流框架的優點，讓工程師們可以更專注的在解決問題上，進而提升了前期開發和後續部署的效率。
            </CourseIntro>
            <BtnDiv>
              <Btn>更多資訊</Btn>
            </BtnDiv>
          </CourseBlock>
        </TeacherBlock>
        <EmptyBlock></EmptyBlock>
      </ResultList>
    </Container>
  );
}

export default FilterPage;
