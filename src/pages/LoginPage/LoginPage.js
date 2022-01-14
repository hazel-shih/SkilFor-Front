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
import { useTranslation } from "react-i18next";

function LoginPage() {
  const { t } = useTranslation();
  const { handleLoginSubmit, loginData, handleLoginDataChange, errorMessage } =
    useLogin();
  return (
    <Wrapper>
      <Container>
        <Title>{t("登入帳戶")}</Title>
        <FormContainer onSubmit={handleLoginSubmit}>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <FormItem
            itemName={t("登入用 email")}
            id="email"
            value={loginData.email}
            type="email"
            name="email"
            handleChange={handleLoginDataChange}
          />
          <FormItemContainer>
            <ItemName>{t("身分")}</ItemName>
            <RadioFormItem
              radioItemName={t("學生")}
              id="student"
              value="student"
              type="radio"
              name="identity"
              handleChange={handleLoginDataChange}
            />
            <RadioFormItem
              radioItemName={t("老師")}
              id="teacher"
              value="teacher"
              type="radio"
              name="identity"
              handleChange={handleLoginDataChange}
            />
          </FormItemContainer>
          <FormItem
            itemName={t("密碼")}
            id="password"
            value={loginData.password}
            type="password"
            name="password"
            handleChange={handleLoginDataChange}
          />
          <Btn>{t("登入")}</Btn>
        </FormContainer>
      </Container>
    </Wrapper>
  );
}

export default LoginPage;
