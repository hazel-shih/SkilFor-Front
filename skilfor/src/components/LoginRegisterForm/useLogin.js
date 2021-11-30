import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, getMyUserData } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";

export default function useLogin() {
  const { setUser, setIsLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identity, setIdentity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    setIsLoading(true);
    setErrorMessage("");
    e.preventDefault();

    if (email === "") {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage("請輸入Email");
    } else if (password === "") {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage("請輸入密碼");
    } else if (identity === "") {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage("請選擇身分");
    }

    login(identity, email, password).then((data) => {
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
          setAuthToken("");
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

  const handleEmailChange = (e) => {
    setErrorMessage("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setErrorMessage("");
    setPassword(e.target.value);
  };

  const handleIdentityToggle = (e) => {
    setErrorMessage("");
    setIdentity(e.target.value);
  };

  return {
    email,
    password,
    identity,
    errorMessage,
    handleLogin,
    handleEmailChange,
    handlePasswordChange,
    handleIdentityToggle,
  };
}
