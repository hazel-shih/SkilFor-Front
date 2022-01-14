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
import useRegister from "../../components/LoginRegisterForm/useRegister";
import { useTranslation } from "react-i18next";

function RegisterPage() {
  const { t } = useTranslation();
  const {
    handleRegisterSubmit,
    registerData,
    handleRegisterDataChange,
    errorMessage,
  } = useRegister();
  return (
    <Wrapper>
      <Container>
        <Title>{t("註冊帳戶")}</Title>
        <FormContainer onSubmit={handleRegisterSubmit}>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <FormItem
            itemName={t("使用者名稱")}
            id="username"
            value={registerData.username}
            type="text"
            name="username"
            handleChange={handleRegisterDataChange}
          />
          <FormItemContainer>
            <ItemName>{t("身分")}</ItemName>
            <RadioFormItem
              radioItemName={t("學生")}
              id="student"
              value="student"
              type="radio"
              name="identity"
              handleChange={handleRegisterDataChange}
            />
            <RadioFormItem
              radioItemName={t("老師")}
              id="teacher"
              value="teacher"
              type="radio"
              name="identity"
              handleChange={handleRegisterDataChange}
            />
          </FormItemContainer>
          <FormItem
            itemName={t("登入用 email")}
            id="email"
            value={registerData.email}
            type="email"
            name="email"
            handleChange={handleRegisterDataChange}
          />
          <FormItem
            itemName={t("聯絡用 email")}
            id="contactEmail"
            value={registerData.contactEmail}
            type="email"
            name="contactEmail"
            handleChange={handleRegisterDataChange}
          />
          <FormItem
            itemName={t("密碼")}
            id="registerPassword"
            value={registerData.password}
            type="password"
            name="password"
            handleChange={handleRegisterDataChange}
          />
          <FormItem
            itemName={t("再次確認密碼")}
            id="checkPassword"
            value={registerData.checkPassword}
            type="password"
            name="checkPassword"
            handleChange={handleRegisterDataChange}
          />
          <Btn>{t("註冊")}</Btn>
        </FormContainer>
      </Container>
    </Wrapper>
  );
}

export default RegisterPage;
