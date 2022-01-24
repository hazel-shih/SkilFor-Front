import { FormItem } from "../../components/LoginRegisterForm/LoginRegisterFormItem";
import {
  Wrapper,
  Container,
  Title,
  FormContainer,
  Btn,
  ErrorMessage,
} from "../../components/LoginRegisterForm/LoginRegisterFormWrapperStyle";
import useLogin from "../../components/LoginRegisterForm/useLogin";
import { useTranslation } from "next-i18next";

function AdminLoginPage() {
  const { t } = useTranslation();
  const { handleLoginSubmit, loginData, handleLoginDataChange, errorMessage } =
    useLogin("administrator");

  return (
    <Wrapper>
      <Container>
        <Title>{t("登入帳戶")}</Title>
        <FormContainer onSubmit={handleLoginSubmit}>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <FormItem
            itemName={t("管理員 email")}
            id="email"
            value={loginData.email}
            type="email"
            name="email"
            handleChange={handleLoginDataChange}
          />
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

export default AdminLoginPage;
