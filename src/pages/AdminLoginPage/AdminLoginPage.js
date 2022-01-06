import { useEffect } from "react";
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

function AdminLoginPage() {
  scrollTop();
  const {
    handleLoginSubmit,
    setLoginData,
    loginData,
    handleLoginDataChange,
    errorMessage,
  } = useLogin();

  useEffect(() => {
    setLoginData({
      ...loginData,
      identity: "administrator",
    });
  }, [setLoginData]);

  return (
    <Wrapper>
      <Container>
        <Title>登入帳戶</Title>
        <FormContainer onSubmit={handleLoginSubmit}>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <FormItem
            itemName="管理員 Email"
            id="email"
            value={loginData.email}
            type="email"
            name="email"
            handleChange={handleLoginDataChange}
          />
          <FormItemContainer>
            <ItemName>登入身分</ItemName>
            <RadioFormItem
              radioItemName="管理員"
              id="administrator"
              value="administrator"
              type="radio"
              name="identity"
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

export default AdminLoginPage;
