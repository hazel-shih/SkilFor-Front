import styled from "styled-components";
import banner from "../../img/banner.jpg";
import teacherStep from "../../img/teacher_step.jpg";
import firstStep from "../../img/first_step.jpg";
import secondStep from "../../img/second_step.jpg";
import thirdStep from "../../img/third_step.jpg";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import Typed from "typed.js";
import { useEffect, useRef } from "react";

const Container = styled.div``;

const Banner = styled.section`
  padding: 196px 0 0;
  position: relative;
  background: url(${banner}) no-repeat center/cover;
  height: 500px;
  box-shadow: 0 4px 10px 0 rgba(255, 128, 0, 0.5);

  &:after {
    position: absolute;
    content: " ";
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  & > p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    padding: 24px 40px;
    z-index: 2;
    font-size: 30px;
    font-weight: bold;
    color: white;
    max-width: 700px;
    width: 100%;
    ${MEDIA_QUERY_SM} {
      font-size: 20px;
      padding: 24px 60px;
    }
  }
`;

const StudentStep = styled.div`
  padding: 30px;
  ${MEDIA_QUERY_SM} {
    padding: 10px;
  }
`;

const Title = styled.h1`
  padding: 20px;
  color: ${(props) => props.theme.colors.grey_dark};
  ${MEDIA_QUERY_SM} {
    font-size: 20px;
  }
`;

const StepDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 0 auto;
  ${MEDIA_QUERY_SM} {
    padding: 5px 2px;
  }
`;

const Img = styled.img`
  display: block;
  width: 60%;
  height: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
`;

const StepContent = styled.div`
  padding: 0 25px;
  width: 50%;
  height: 400px;
  color: ${(props) => props.theme.colors.green_dark};
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: bold;
  position: relative;
  ${MEDIA_QUERY_SM} {
    padding: 0 6px;
  }
`;

const StepTitle = styled.h2`
  ${MEDIA_QUERY_SM} {
    font-size: 18px;
  }
`;

const StepDescription = styled.p`
  width: 100%;
  margin: 12px 0px;
  font-size: 1rem;
  ${MEDIA_QUERY_SM} {
    font-size: 16px;
    margin: 6px 2px;
  }
`;

const TeacherStep = styled(Banner)`
  background: url(${teacherStep}) no-repeat center/cover;
  & > p {
    transform: translate(-50%, -130%);
  }
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Btn = styled.button`
  border-radius: 40px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.orange};
  color: white;
  font-weight: bold;
  padding: 20px;
  margin: 24px;
  min-width: 150px;
  z-index: 3;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);

  ${MEDIA_QUERY_SM} {
    padding: 15px 0;
    min-width: 120px;
    font-size: 0.5rem;
    margin: 10px 0;
  }
`;

const FindATeacherBtn = styled(Btn)`
  position: absolute;
  right: 0;
  bottom: 0;
`;

function HomePage() {
  const newTyped = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const typedSetting = {
      strings: [
        "最酷的技能學習平台<br/>從寫程式到 B-box 你都可以在這裡教與學！<br/>A platform for learning and teaching skill.",
      ],
      typeSpeed: 80,
      fadeOut: true,
      loop: true,
      showCursor: false,
    };
    typed.current = new Typed(newTyped.current, typedSetting);
  }, []);

  return (
    <Container>
      <Banner src={banner}>
        <p ref={newTyped}></p>
      </Banner>
      <StudentStep>
        <Title>上課三步驟</Title>
        <StepDiv>
          <Img src={firstStep}></Img>
          <StepContent>
            <StepTitle>Step 1：根據學習需求找老師</StepTitle>
            <StepDescription>
              完成帳號註冊後，進入「找老師」頁面選擇你要學習的領域，將會立即出現該領域的所有老師。
            </StepDescription>
          </StepContent>
        </StepDiv>
        <StepDiv>
          <StepContent>
            <StepTitle>Step 2：預約與購買課程</StepTitle>
            <StepDescription>
              挑好老師後，可點選老師的行事曆選擇可上課時間。點選後，可到「購物車」中查看，確認資訊無誤，按下送出。出現「購買成功」即代表成功買好老師的時間了。
            </StepDescription>
          </StepContent>
          <Img src={secondStep}></Img>
        </StepDiv>
        <StepDiv>
          <Img src={thirdStep}></Img>
          <StepContent>
            <StepTitle>Step 3：開始上課</StepTitle>
            <StepDescription>
              上課前會收到線上課程會議室連結，到了上課時間點選連結進入會議室，就可以開始享受與老師的上課啦！
            </StepDescription>
            <BtnDiv>
              <FindATeacherBtn>開始找老師</FindATeacherBtn>
            </BtnDiv>
          </StepContent>
        </StepDiv>
      </StudentStep>
      <TeacherStep src={teacherStep}>
        <p>
          上架你的才華，將熱情與技能分享給全世界
          <br />
        </p>
        <BtnDiv>
          <Btn>成為老師</Btn>
        </BtnDiv>
      </TeacherStep>
    </Container>
  );
}

export default HomePage;
