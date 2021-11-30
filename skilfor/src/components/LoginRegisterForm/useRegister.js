import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { getMyUserData } from "../../WebAPI";
import { AuthContext } from "../../contexts";

export default function useRegister() {
  const { setUser, setIsLoading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    setIsLoading(true);
    setErrorMessage("");
    e.preventDefault();

    if (username === "") {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage("請輸入使用者名稱");
    } else if (identity === "") {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage("請選擇註冊身分");
    } else if (email === "") {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage("請輸入Email");
    } else if (contactEmail === "") {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage("請輸入聯絡用Email");
    } else if (password === "") {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage("請輸入密碼");
    } else if (checkPassword === "") {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage("請再次輸入密碼");
    } else if (password !== checkPassword) {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage("密碼不相同");
    }

    register(
      username,
      identity,
      email,
      contactEmail,
      password,
      checkPassword
    ).then((data) => {
      if (!data) {
        setIsLoading(false);
        scrollTop();
        return setErrorMessage("伺服器維修中");
      }
      if (data.success === false) {
        setIsLoading(false);
        scrollTop();
        return setErrorMessage(data.errMessage);
      }
      setAuthToken(data.token);
      getMyUserData().then((response) => {
        if (response.success === false) {
          setIsLoading(false);
          scrollTop();
          return setErrorMessage(response.errMessage);
        }
        setUser(response.user);
        setIsLoading(false);
        navigate("/");
      });
    });
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

  const handleContactEmailChange = (e) => {
    setErrorMessage("");
    setContactEmail(e.target.value);
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

  return {
    username,
    email,
    contactEmail,
    identity,
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
  };
}
