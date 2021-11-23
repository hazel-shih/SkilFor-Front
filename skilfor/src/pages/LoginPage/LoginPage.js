import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import { useState } from "react";

const Wrapper = styled.div`
  background: linear-gradient(
    to right,
    ${(props) => props.theme.colors.orange},
    transparent 10%,
    white 20%
  );
  margin: 0 auto;
  display: flex;
  justify-content: center;
  height: 100%;

  ${MEDIA_QUERY_SM} {
    min-width: 768px;
  }
`;

const Container = styled.div`
  padding: 140px 100px 200px 100px;
  width: 700px;
  height: 100%;
  min-height: 1000px;

  ${MEDIA_QUERY_SM} {
    width: 500px;
  }
`;

const Title = styled.h1`
  padding: 6px 0px 10px;
  font-size: 30px;
  text-align: center;
  color: ${(props) => props.theme.colors.grey_dark};
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 300px;
  border: 1px solid ${(props) => props.theme.colors.grey_dark};
  border-radius: 10px;
  padding: 35px 50px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
`;

const FormItemContainer = styled.div`
  margin: 5px 0;
  padding: 10px 0 0;
  width: 80%;
  height: 100px;
`;

const ItemName = styled.h1`
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1.5rem;
  margin: 5px 0;
  position: relative;

  & > a {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 1.2rem;
    text-decoration: none;
  }
`;

const ItemInput = styled.input`
  height: 30px;
  padding: 5px;
  width: 100%;
  color: ${(props) => props.theme.colors.grey_dark};
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey_light};
`;

const Btn = styled.button`
  border-radius: 40px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.green_dark};
  color: white;
  font-weight: bold;
  padding: 20px;
  margin: 10px 0px 0px;
  min-width: 150px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);

  :hover {
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-weight: bold;
  font-size: 1.5rem;
`;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    setErrorMessage("");
    e.preventDefault();

    if (email === "") {
      setErrorMessage("請輸入Email");
    } else if (password === "") {
      setErrorMessage("請輸入密碼");
    }
  };

  const handleEmailChange = (e) => {
    setErrorMessage("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setErrorMessage("");
    setPassword(e.target.value);
  };

  return (
    <Wrapper>
      <Container>
        <Title>登入帳戶</Title>
        <FormContainer onSubmit={handleSubmit}>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <FormItemContainer>
            <ItemName>Email</ItemName>
            <ItemInput
              value={email}
              type="email"
              onChange={handleEmailChange}
            />
          </FormItemContainer>
          <FormItemContainer>
            <ItemName>
              密碼<a href="./reset_password">忘記密碼</a>
            </ItemName>
            <ItemInput
              value={password}
              type="password"
              onChange={handlePasswordChange}
            />
          </FormItemContainer>
          <Btn>登入</Btn>
        </FormContainer>
      </Container>
    </Wrapper>
  );
}

export default LoginPage;
