import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../components/constants/breakpoints";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    max-width: 768px;
  }
`;

const Container = styled.div`
  padding: 140px 100px 200px 100px;
  width: 700px;
  height: 100%;
  min-height: 1000px;
  ${MEDIA_QUERY_SM} {
    max-width: 500px;
    padding: 140px 50px 200px 50px;
  }
`;

const Title = styled.h1`
  padding: 6px 0px 10px;
  font-size: 30px;
  text-align: center;
  color: ${(props) => props.theme.colors.grey_dark};
  ${MEDIA_QUERY_SM} {
    font-size: 26px;
  }
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
  ${MEDIA_QUERY_SM} {
    padding: 30px 35px;
  }
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
  ${MEDIA_QUERY_SM} {
    font-size: 1.2rem;
  }

  & > a {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 1.2rem;
    text-decoration: none;
    ${MEDIA_QUERY_SM} {
      font-size: 0.5rem;
    }
  }
`;

const ItemLabel = styled.label`
  margin: 10px 0px;
  width: 50%;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px;
  float: left;
  ${MEDIA_QUERY_SM} {
    padding: 2px;
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

const ItemRadioInput = styled(ItemInput)`
  height: 30px;
  width: 50%;
  zoom: 0.6;
  ${MEDIA_QUERY_SM} {
    width: 20%;
    margin-right: 8px;
  }
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

  ${MEDIA_QUERY_SM} {
    padding: 15px;
    min-width: 100px;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-weight: bold;
  font-size: 1.5rem;
  ${MEDIA_QUERY_SM} {
    font-size: 1rem;
  }
`;

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setErrorMessage("");
    e.preventDefault();

    if (username === "") {
      scrollTop();
      setErrorMessage("請輸入使用者名稱");
    } else if (identity === "") {
      scrollTop();
      setErrorMessage("請選擇註冊身分");
    } else if (email === "") {
      scrollTop();
      setErrorMessage("請輸入Email");
    } else if (password === "") {
      scrollTop();
      setErrorMessage("請輸入密碼");
    } else if (checkPassword === "") {
      scrollTop();
      setErrorMessage("請再次輸入密碼");
    } else if (password !== checkPassword) {
      scrollTop();
      setErrorMessage("密碼不相同");
    } else {
      navigate("/");
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUsernameChange = (e) => {
    setErrorMessage("");
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setErrorMessage("");
    setEmail(e.target.value);
  };

  const handleIdentityToggle = (e) => {
    setErrorMessage("");
    setIdentity(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setErrorMessage("");
    setPassword(e.target.value);
  };

  const handleCheckPasswordChange = (e) => {
    setErrorMessage("");
    setCheckPassword(e.target.value);
  };

  return (
    <Wrapper>
      <Container>
        <Title>註冊帳戶</Title>
        <FormContainer onSubmit={handleSubmit}>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <FormItemContainer>
            <ItemName>使用者名稱</ItemName>
            <ItemInput
              value={username}
              type="text"
              onChange={handleUsernameChange}
            />
          </FormItemContainer>
          <FormItemContainer>
            <ItemName>身分</ItemName>
            <ItemLabel>
              <ItemRadioInput
                value="student"
                type="radio"
                name="identity"
                onClick={handleIdentityToggle}
              />
              學生
            </ItemLabel>
            <ItemLabel>
              <ItemRadioInput
                value="teacher"
                type="radio"
                name="identity"
                onClick={handleIdentityToggle}
              />
              老師
            </ItemLabel>
          </FormItemContainer>
          <FormItemContainer>
            <ItemName>Email</ItemName>
            <ItemInput
              value={email}
              type="email"
              onChange={handleEmailChange}
            />
          </FormItemContainer>
          <FormItemContainer>
            <ItemName>密碼</ItemName>
            <ItemInput
              value={password}
              type="password"
              onChange={handlePasswordChange}
            />
          </FormItemContainer>
          <FormItemContainer>
            <ItemName>再次確認密碼</ItemName>
            <ItemInput
              value={checkPassword}
              type="password"
              onChange={handleCheckPasswordChange}
            />
          </FormItemContainer>
          <Btn>註冊</Btn>
        </FormContainer>
      </Container>
    </Wrapper>
  );
}

export default RegisterPage;