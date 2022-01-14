import styled from "styled-components";
import banner from "../../img/banner.jpg";
import teacherStep from "../../img/teacher_step.jpg";
import firstStep from "../../img/first_step.jpg";
import secondStep from "../../img/second_step.jpg";
import thirdStep from "../../img/third_step.jpg";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { scrollTop, setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  padding: 100px 0px 100px 0px;
  ${MEDIA_QUERY_SM} {
    padding: 95px 0px 110px 0px;
  }
`;

const Banner = styled.section`
  position: relative;
  background: url(${banner}) no-repeat center/cover;
  height: 500px;
  box-shadow: 0 4px 10px 0 rgba(255, 128, 0, 0.5);
  max-width: 100%;
  ${MEDIA_QUERY_SM} {
    height: 300px;
  }

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
    font-size: 1.8rem;
    font-weight: bold;
    color: white;
    max-width: 700px;
    width: 100%;
    ${MEDIA_QUERY_SM} {
      font-size: 1.4rem;
      padding: 24px 40px;
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
  font-size: 1.7rem;
  ${MEDIA_QUERY_SM} {
    font-size: 1.3rem;
    text-align: center;
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
    flex-direction: column;
  }
`;

const Img = styled.img`
  display: block;
  width: 50%;
  min-height: 285px;
  margin: 0 auto;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  ${MEDIA_QUERY_SM} {
    min-height: 200px;
    width: 100%;
  }
`;

const StepContent = styled.div`
  padding: 0 25px;
  width: 50%;
  color: ${(props) => props.theme.colors.green_dark};
  display: flex;
  justify-content: center;
  flex-direction: column;
  ${MEDIA_QUERY_SM} {
    width: 100%;
    padding: 30px 20px 20px;
    margin-bottom: 10px;
    border-bottom: 2px dotted ${(props) => props.theme.colors.orange};
  }
`;

const SecondImg = styled(Img)`
  ${MEDIA_QUERY_SM} {
    order: 1;
  }
`;

const StepTwoContent = styled(StepContent)`
  ${MEDIA_QUERY_SM} {
    order: 2;
  }
`;

const StepTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  ${MEDIA_QUERY_SM} {
    font-size: 1.2rem;
  }
`;

const StepDescription = styled.p`
  width: 100%;
  margin: 12px 0px;
  font-size: 1.2rem;
  ${MEDIA_QUERY_SM} {
    font-size: 1rem;
  }
`;

const TeacherStep = styled(Banner)`
  background: url(${teacherStep}) no-repeat center/cover;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  > p {
    text-align: center;
  }
  ${MEDIA_QUERY_SM} {
    height: 300px;
  }
`;

const Btn = styled(Link)`
  border-radius: 40px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.orange};
  color: white;
  font-weight: bold;
  padding: 20px;
  margin-bottom: 100px;
  min-width: 150px;
  z-index: 3;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  align-self: flex-end;
  font-size: 1.2rem;
  text-decoration: none;
  text-align: center;
  ${MEDIA_QUERY_SM} {
    padding: 10px;
    min-width: 120px;
    font-size: 1rem;
    margin-bottom: 50px;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  ${MEDIA_QUERY_SM} {
    justify-content: center;
  }
`;

const FindATeacherBtn = styled(Btn)`
  margin-bottom: 0px;
`;

function HomePage() {
  const { t } = useTranslation();
  const newTyped = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    scrollTop();
    const typedSetting = {
      strings: [
        t(
          "最酷的技能學習平台<br/>從寫程式到 B-box 你都可以在這裡教與學！<br/>A platform for learning and teaching skill."
        ),
      ],
      typeSpeed: 80,
      fadeOut: true,
      loop: true,
      showCursor: false,
    };
    typed.current = new Typed(newTyped.current, typedSetting);
    return () => {
      typed.current.destroy();
    };
  }, [t]);

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleBtnClick = (e) => {
    e.preventDefault();
    if (!user || user.identity === "student") {
      const confirmNavigate = window.confirm(
        `${t(
          "註冊一個老師身分的帳號，即可成為老師囉！按下確定將帶您前往註冊頁面。"
        )}`
      );
      if (!confirmNavigate) return;
      setAuthToken("");
      setUser(null);
      navigate("/register");
    }
    if (user && user.identity === "teacher") {
      alert(`${t("您已成功成為老師囉！")}`);
    }
  };

  return (
    <Container>
      <Banner src={banner}>
        <p ref={newTyped}></p>
      </Banner>
      <StudentStep>
        <Title>{t("上課三步驟")}</Title>
        <StepDiv>
          <Img src={firstStep} />
          <StepContent>
            <StepTitle>Step 1：{t("根據學習需求找課程")}</StepTitle>
            <StepDescription>
              {t(
                "註冊帳號後，進入「搜尋課程」頁面選擇你要學習的領域，將會立即出現該領域的所有課程。"
              )}
            </StepDescription>
          </StepContent>
        </StepDiv>
        <StepDiv>
          <StepTwoContent>
            <StepTitle>Step 2：{t("預約與購買課程")}</StepTitle>
            <StepDescription>
              {t(
                "挑好課程後，可點選行事曆的時段選擇上課時間，並進入「購物車」中確認購買，完成購買流程後會出現「成功扣點」。若您的點數不足請至「點數儲值」頁面先行加值。"
              )}
            </StepDescription>
          </StepTwoContent>
          <SecondImg src={secondStep} />
        </StepDiv>
        <StepDiv>
          <Img src={thirdStep} />
          <StepContent>
            <StepTitle>Step 3：{t("開始上課")}</StepTitle>
            <StepDescription>
              {t(
                "課程開始前至「我的行事曆」點選上課時段，可見上課的視訊連結。上課時間進入指定的視訊會議中，就可以開始享受與老師的課程啦！"
              )}
            </StepDescription>
            <BtnDiv>
              <FindATeacherBtn to="./filter">{t("開始找課程")}</FindATeacherBtn>
            </BtnDiv>
          </StepContent>
        </StepDiv>
      </StudentStep>
      <TeacherStep src={teacherStep}>
        <p>{t("上架你的才華，將熱情與技能分享給全世界")}</p>
        <Btn to="./register" onClick={handleBtnClick}>
          {t("成為老師")}
        </Btn>
      </TeacherStep>
    </Container>
  );
}

export default HomePage;
