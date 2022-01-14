import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { getMyUserData } from "../../WebAPI";
import { AuthContext, AuthLoadingContext } from "../../contexts";
import { scrollTop } from "../../utils";
import { useTranslation } from "react-i18next";

export default function useRegister() {
  const { setUser } = useContext(AuthContext);
  const { setIsLoading } = useContext(AuthLoadingContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [registerData, setRegisterData] = useState({
    username: "",
    identity: "",
    email: "",
    contactEmail: "",
    password: "",
    checkPassword: "",
  });
  const { t } = useTranslation();
  const handleRegisterSubmit = (e) => {
    setIsLoading(true);
    setErrorMessage("");
    e.preventDefault();

    for (const [inputName, value] of Object.entries(registerData)) {
      if (value.trim().length === 0) {
        if (inputName === "username") {
          setErrorMessage(`${t("請輸入使用者名稱")}`);
        }
        if (inputName === "identity") {
          setErrorMessage(`${t("請選擇身分")}`);
        }
        if (inputName === "email") {
          setErrorMessage(`${t("請輸入登入用 email")}`);
        }
        if (inputName === "contactEmail") {
          setErrorMessage(`${t("請輸入聯絡用 email")}`);
        }
        if (inputName === "password") {
          setErrorMessage(`${t("請輸入密碼")}`);
        }
        if (inputName === "checkPassword") {
          setErrorMessage(`${t("請再次輸入密碼")}`);
        }
        setIsLoading(false);
        scrollTop();
        return;
      }
    }
    if (registerData.password !== registerData.checkPassword) {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage(`${t("密碼不相符")}`);
    }

    register(registerData, setErrorMessage).then((data) => {
      if (!data) {
        setIsLoading(false);
        scrollTop();
        return setErrorMessage(`${t("網站更新中請稍後再登入")}`);
      }
      if (data.success === false) {
        setIsLoading(false);
        scrollTop();
        return setErrorMessage(data.errMessage);
      }
      setAuthToken(data.token);
      getMyUserData().then((response) => {
        if (!response || !response.success) {
          setIsLoading(false);
          scrollTop();
          return setErrorMessage(response.errMessage);
        }
        setUser(response.user);
        setIsLoading(false);
        navigate("/");
        if (registerData.identity === "student") {
          alert(`${t("恭喜成為新會員，您將獲得免費的上課點數 1000 點！")}`);
        }
      });
    });
  };

  const handleRegisterDataChange = (e) => {
    const { name: inputName, value } = e.target;
    setErrorMessage("");
    setRegisterData({
      ...registerData,
      [inputName]: value,
    });
  };

  return {
    handleRegisterSubmit,
    registerData,
    handleRegisterDataChange,
    errorMessage,
  };
}
