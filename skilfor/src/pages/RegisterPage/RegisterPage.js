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

function RegisterPage() {
  const {
    username,
    email,
    contactEmail,
    password,
    checkPassword,
    errorMessage,
    handleRegister,
    handleUsernameChange,
    handleEmailChange,
    handleContactEmailChange,
    handleIdentityToggle,
    handlePasswordChange,
    handleCheckPasswordChange,
  } = useRegister();
  return (
    <Wrapper>
      <Container>
        <Title>註冊帳戶</Title>
        <FormContainer onSubmit={handleRegister}>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <FormItem
            itemName="使用者名稱"
            id="username"
            value={username}
            type="text"
            handleChange={handleUsernameChange}
          />
          <FormItemContainer>
            <ItemName>登入身分</ItemName>
            <RadioFormItem
              radioItemName="學生"
              value="student"
              type="radio"
              name="identity"
              handleClick={handleIdentityToggle}
            />
            <RadioFormItem
              radioItemName="老師"
              value="teacher"
              type="radio"
              name="identity"
              handleClick={handleIdentityToggle}
            />
          </FormItemContainer>
          <FormItem
            itemName="登入用 Email"
            id="email"
            value={email}
            type="email"
            handleChange={handleEmailChange}
          />
          <FormItem
            itemName="聯絡用 Email"
            id="contactEmail"
            value={contactEmail}
            type="email"
            handleChange={handleContactEmailChange}
          />
          <FormItem
            itemName="密碼"
            id="password"
            value={password}
            type="password"
            handleChange={handlePasswordChange}
          />
          <FormItem
            itemName="再次確認密碼"
            id="checkPassword"
            value={checkPassword}
            type="password"
            handleChange={handleCheckPasswordChange}
          />
          <Btn>註冊</Btn>
        </FormContainer>
      </Container>
    </Wrapper>
  );
}

export default RegisterPage;
