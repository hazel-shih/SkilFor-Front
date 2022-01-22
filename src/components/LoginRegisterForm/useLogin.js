import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, getMyUserData, getCartItems } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import {
  AuthCartContext,
  AuthContext,
  AuthLoadingContext,
} from "../../contexts";
import { scrollTop } from "../../utils";
import { useTranslation } from "react-i18next";

export default function useLogin() {
  const { user, setUser } = useContext(AuthContext);
  const { setIsLoading } = useContext(AuthLoadingContext);
  const { setCartNumber } = useContext(AuthCartContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    identity: "",
    password: "",
  });
  const { t } = useTranslation();

  const handleLoginSubmit = (e) => {
    setIsLoading(true);
    setErrorMessage("");
    e.preventDefault();

    for (const [inputName, value] of Object.entries(loginData)) {
      if (value.trim().length === 0) {
        if (inputName === "email") {
          setErrorMessage(`${t("請輸入登入用 email")}`);
        }
        if (inputName === "password") {
          setErrorMessage(`${t("請輸入密碼")}`);
        }
        if (inputName === "identity") {
          setErrorMessage(`${t("請選擇身分")}`);
        }
        setIsLoading(false);
        scrollTop();
        return;
      }
    }

    login(loginData, setErrorMessage).then((data) => {
      if (!data) {
        setIsLoading(false);
        scrollTop();
        return setErrorMessage(`${t("網站更新中請稍後再登入")}`);
      }
      if (data.success === false) {
        setIsLoading(false);
        scrollTop();
        return setErrorMessage(t(data.errMessage));
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
      getCartItems().then((json) => {
        if (!json || !json.success || json.data.length === 0) {
          if (!user || user.identity !== "student") {
            console.log("here");
            return;
          } else return setCartNumber("0");
        }
        return setCartNumber(json.data.length);
      });
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
    setLoginData,
    loginData,
    handleLoginDataChange,
    errorMessage,
  };
}
