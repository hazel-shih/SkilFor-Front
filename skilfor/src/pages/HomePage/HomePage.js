import styled from "styled-components";
import banner from "../../img/banner.jpg";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
const Container = styled.div``;

const Banner = styled.section`
  padding: 196px 100px 182px 100px;
  position: relative;
  background: url(${banner}) no-repeat center/cover;
  height: 500px;
  box-shadow: 0 4px 10px 0 rgba(255, 128, 0, 0.5);
  ${MEDIA_QUERY_SM} {
    min-width: 768px;
    width: 100%;
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
    transform: translate(-50%, -40%);
    margin: 0 auto;
    padding: 24px 12px;
    z-index: 2;
    font-size: 30px;
    font-weight: bold;
    color: white;
    min-width: 605px;
  }
`;

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 12px;
`;
const Section = styled.section``;
const StudentStep = styled.div``;
const TeacherStep = styled.div``;

function HomePage() {
  return (
    <Container>
      <Banner src={banner}>
        <p>
          最酷的技能學習平台
          <br />
          從寫程式到 B-box 你都可以在這裡教與學！
          <br />
          A platform for learning and teaching skill.
          <br />
        </p>
      </Banner>
      <Wrapper>
        <Section>
          <StudentStep></StudentStep>
        </Section>
      </Wrapper>
      <Section>
        <TeacherStep></TeacherStep>
      </Section>
    </Container>
  );
}

export default HomePage;
