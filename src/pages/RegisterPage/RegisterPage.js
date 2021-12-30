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
import { scrollTop } from "../../utils";

function RegisterPage() {
  scrollTop();
  const {
    handleRegisterSubmit,
    registerData,
    handleRegisterDataChange,
    errorMessage,
  } = useRegister();
  return (
    <Wrapper>
      <Container>
        <Title>註冊帳戶</Title>
        <FormContainer onSubmit={handleRegisterSubmit}>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <FormItem
            itemName="使用者名稱"
            id="username"
            value={registerData.username}
            type="text"
            name="username"
            handleChange={handleRegisterDataChange}
          />
          <FormItemContainer>
            <ItemName>登入身分</ItemName>
            <RadioFormItem
              radioItemName="學生"
              id="student"
              value="student"
              type="radio"
              name="identity"
              handleChange={handleRegisterDataChange}
            />
            <RadioFormItem
              radioItemName="老師"
              id="teacher"
              value="teacher"
              type="radio"
              name="identity"
              handleChange={handleRegisterDataChange}
            />
          </FormItemContainer>
          <FormItem
            itemName="登入用 Email"
            id="email"
            value={registerData.email}
            type="email"
            name="email"
            handleChange={handleRegisterDataChange}
          />
          <FormItem
            itemName="聯絡用 Email"
            id="contactEmail"
            value={registerData.contactEmail}
            type="email"
            name="contactEmail"
            handleChange={handleRegisterDataChange}
          />
          <FormItem
            itemName="密碼"
            id="password"
            value={registerData.password}
            type="password"
            name="password"
            handleChange={handleRegisterDataChange}
          />
          <FormItem
            itemName="再次確認密碼"
            id="checkPassword"
            value={registerData.checkPassword}
            type="password"
            name="checkPassword"
            handleChange={handleRegisterDataChange}
          />
          <Btn>註冊</Btn>
        </FormContainer>
      </Container>
    </Wrapper>
  );
}

export default RegisterPage;
