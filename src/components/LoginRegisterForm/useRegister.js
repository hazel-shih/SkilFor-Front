import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { getMyUserData } from "../../WebAPI";
import { AuthContext, AuthLoadingContext } from "../../contexts";

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

  const handleRegisterSubmit = (e) => {
    setIsLoading(true);
    setErrorMessage("");
    e.preventDefault();

    for (const [inputName, value] of Object.entries(registerData)) {
      if (value.trim().length === 0) {
        if (inputName === "username") {
          setErrorMessage("請輸入使用者名稱");
        }
        if (inputName === "identity") {
          setErrorMessage("請選擇註冊身分");
        }
        if (inputName === "email") {
          setErrorMessage("請輸入登入用Email");
        }
        if (inputName === "contactEmail") {
          setErrorMessage("請輸入聯絡用Email");
        }
        if (inputName === "password") {
          setErrorMessage("請輸入密碼");
        }
        if (inputName === "checkPassword") {
          setErrorMessage("請再次輸入密碼");
        }
        setIsLoading(false);
        scrollTop();
        return;
      }
    }
    if (registerData.password !== registerData.checkPassword) {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage("密碼不相符");
    }

    register(registerData, setErrorMessage).then((data) => {
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
