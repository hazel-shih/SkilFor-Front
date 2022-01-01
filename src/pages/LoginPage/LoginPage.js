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
import { scrollTop } from "../../utils";

function LoginPage() {
  scrollTop();
  const { handleLoginSubmit, loginData, handleLoginDataChange, errorMessage } =
    useLogin();

  return (
    <Wrapper>
      <Container>
        <Title>登入帳戶</Title>
        <FormContainer onSubmit={handleLoginSubmit}>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <FormItem
            itemName="Email"
            id="email"
            value={loginData.email}
            type="email"
            name="email"
            handleChange={handleLoginDataChange}
          />
          <FormItemContainer>
            <ItemName>登入身分</ItemName>
            <RadioFormItem
              radioItemName="學生"
              id="student"
              value="student"
              type="radio"
              name="identity"
              handleChange={handleLoginDataChange}
            />
            <RadioFormItem
              radioItemName="老師"
              id="teacher"
              value="teacher"
              type="radio"
              name="identity"
              handleChange={handleLoginDataChange}
            />
          </FormItemContainer>
          <FormItem
            itemName="密碼"
            id="password"
            value={loginData.password}
            type="password"
            name="password"
            handleChange={handleLoginDataChange}
          />
          <Btn>登入</Btn>
        </FormContainer>
      </Container>
    </Wrapper>
  );
}

export default LoginPage;
