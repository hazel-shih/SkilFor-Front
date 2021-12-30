import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, getMyUserData } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext, AuthLoadingContext } from "../../contexts";

export default function useLogin() {
  const { setUser } = useContext(AuthContext);
  const { setIsLoading } = useContext(AuthLoadingContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    identity: "",
    password: "",
  });

  const handleLoginSubmit = (e) => {
    setIsLoading(true);
    setErrorMessage("");
    e.preventDefault();

    for (const [inputName, value] of Object.entries(loginData)) {
      if (value.trim().length === 0) {
        if (inputName === "email") {
          setErrorMessage("請輸入登入用 Email");
        }
        if (inputName === "password") {
          setErrorMessage("請輸入密碼");
        }
        if (inputName === "identity") {
          setErrorMessage("請選擇身分");
        }
        setIsLoading(false);
        scrollTop();
        return;
      }
    }

    if (loginData.email === "skilforAdmin@gmail.com") {
      setLoginData({
        ...loginData,
        identity: "administrator",
      });
    }

    login(loginData, setErrorMessage).then((data) => {
      if (!data) {
        setIsLoading(false);
        scrollTop();
        return setErrorMessage("網站更新中請稍後再登入");
      }
      if (data.success === false) {
        setIsLoading(false);
        scrollTop();
        return setErrorMessage(data.errMessage);
      }
      setAuthToken(data.token);
      getMyUserData().then((response) => {
        if (!response || !response.success) {
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

  const handleLoginDataChange = (e) => {
    setErrorMessage("");
    const { name: inputName, value } = e.target;
    setLoginData({
      ...loginData,
      [inputName]: value,
    });
  };

  return {
    handleLoginSubmit,
    loginData,
    handleLoginDataChange,
    errorMessage,
  };
}
