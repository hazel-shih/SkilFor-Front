import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import { useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";

const Container = styled.div`
  padding: 150px 150px 160px 150px;
  ${MEDIA_QUERY_SM} {
    padding: 135px 20px 180px 20px;
  }
`;
const Title = styled(PageTitle)`
  ${MEDIA_QUERY_SM} {
    font-size: 1.5rem;
    margin-bottom: 15px;
    text-align: center;
  }
`;
const QuestionBlocks = styled.div``;

const QuestionBlock = styled.div`
  margin-bottom: 15px;
  :first-child {
    margin-top: 30px;
  }
  :last-child {
    margin-bottom: 30px;
  }
`;

const QuestionTitle = styled.button`
  border none;
  width: 100%;
  background-color: white;
  text-align: left;
  font-size: 1.5rem;
  padding-bottom: 10px;
  color: ${(props) => props.theme.colors.green_dark};
  border-bottom: 2px solid ${(props) => props.theme.colors.green_light};
  cursor: pointer;
  ${MEDIA_QUERY_SM} {
    font-size: 1.3rem;
  }
`;

const QuestionDescription = styled.span`
  padding: 10px 15px;
  line-height: 1.8rem;
  display: ${(props) => (props.show ? "block" : "none")};
  white-space: pre-line;
  text-align: justify;
  font-size: 1.3rem;
  ol {
    padding: 10px 20px;
  }
  ${MEDIA_QUERY_SM} {
    font-size: 1rem;
  }
`;

function QAPage() {
  const [showAnswer, setShowAnswer] = useState({
    Q1: false,
    Q2: false,
    Q3: false,
    Q4: false,
    Q5: false,
  });

  const handleClick = (e) => {
    const { name } = e.target;
    for (const [question, answer] of Object.entries(showAnswer)) {
      if (question === name) {
        setShowAnswer({
          ...showAnswer,
          [question]: !answer,
        });
      }
    }
  };

  return (
    <Container>
      <Title>Q & A</Title>
      <QuestionBlocks onClick={handleClick}>
        <QuestionBlock>
          <QuestionTitle name="Q1">Q1 : 如何取消課程？</QuestionTitle>
          <QuestionDescription show={showAnswer.Q1}>
            若要取消課程，可以前往行事曆頁面，點選該課程時段，便會看到取消課程的按鈕，按下後即成功取消課程，同時也會立即退還給您課程點數。另外特別要注意的是，平台為了保護老師與學生的權益，在課程開始的
            24 小時以內，便已無法再取消課程了。
          </QuestionDescription>
        </QuestionBlock>
        <QuestionBlock>
          <QuestionTitle name="Q2">Q2 : 如何購買課程？</QuestionTitle>
          <QuestionDescription show={showAnswer.Q2}>
            請到找老師頁面中，選擇有興趣的課程。進入課程頁面，可以選擇上課時段，把上課時段加入購物車中。在購物車中按下確認購買前，請先至"儲值點數"頁面點選儲值方案，刷卡加值點數後，即可回到購物車頁面買課，當扣點完成後，也代表您已成功買到課程，這時您也可前往行事曆查看課程的相關資料。
          </QuestionDescription>
        </QuestionBlock>
        <QuestionBlock>
          <QuestionTitle name="Q3">Q3 : 線上刷卡如何操作呢？</QuestionTitle>
          <QuestionDescription show={showAnswer.Q3}>
            線上刷卡的使用方式很簡單，只要您在儲值頁面確認您當次的儲值方案、點數、金額都無誤，就可立即點選儲值按鈕，網站便會將您導到填寫信用卡相關資料的頁面，填寫完整並送出後，刷卡就完成囉～
          </QuestionDescription>
        </QuestionBlock>
        <QuestionBlock>
          <QuestionTitle name="Q4">Q4 : 如何查詢目前有哪些課程？</QuestionTitle>
          <QuestionDescription show={showAnswer.Q4}>
            已成功扣點的課程，都會顯示在您的行事曆喔，可以前往行事曆頁面查看。另外，特別提醒一下，若是加入購物車內但尚未確認購買的課程，並不會放到您的行事曆中喔，而且這堂課還有可能被其他人買走喔，所以記得確認好上課時段，就趕緊按下確認購買吧
            !
          </QuestionDescription>
        </QuestionBlock>
        <QuestionBlock>
          <QuestionTitle name="Q5">
            Q5 : 上課時網路連線不穩怎麼辦？
          </QuestionTitle>
          <QuestionDescription show={showAnswer.Q5}>
            不用擔心，請遵照以下步驟，嘗試排除問題：
            <ol>
              <li>關閉其他佔用網路資源的網頁或軟體</li>
              <li>關閉視訊鏡頭上課</li>
              <li>若是 IPad 請改用電腦操作。</li>
              <li>使用較穩定的瀏覽器操作，例如 Google Chrome</li>
              <li>
                若您用 Wifi 連線上課，請改用固網連線，Wifi 連線容易有 5 ~ 10
                分鐘的延遲
              </li>
            </ol>
          </QuestionDescription>
        </QuestionBlock>
      </QuestionBlocks>
    </Container>
  );
}

export default QAPage;
