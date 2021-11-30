import {
  FormItem,
  RadioFormItem,
  FormItemContainer,
  ItemName,
} from "../../components/LoginRegisterForm/LoginRegisterFormItem";
import {
  Wrapper,
  Container,
  Title,
  FormContainer,
  Btn,
  ErrorMessage,
} from "../../components/LoginRegisterForm/LoginRegisterFormWrapperStyle";
import useLogin from "../../components/LoginRegisterForm/useLogin";

function LoginPage() {
  const {
    email,
    password,
    errorMessage,
    handleLogin,
    handleEmailChange,
    handlePasswordChange,
    handleIdentityToggle,
  } = useLogin();

  return (
    <Wrapper>
      <Container>
        <Title>登入帳戶</Title>
        <FormContainer onSubmit={handleLogin}>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <FormItem
            itemName="Email"
            id="email"
            value={email}
            type="email"
            handleChange={handleEmailChange}
          />
          <FormItemContainer>
            <ItemName>登入身分</ItemName>
            <RadioFormItem
              radioItemName="學生"
              id="student"
              value="student"
              type="radio"
              name="identity"
              handleClick={handleIdentityToggle}
            />
            <RadioFormItem
              radioItemName="老師"
              id="teacher"
              value="teacher"
              type="radio"
              name="identity"
              handleClick={handleIdentityToggle}
            />
          </FormItemContainer>
          <FormItem
            itemName="密碼"
            id="password"
            value={password}
            type="password"
            handleChange={handlePasswordChange}
          />
          <Btn>登入</Btn>
        </FormContainer>
      </Container>
    </Wrapper>
  );
}

export default LoginPage;
