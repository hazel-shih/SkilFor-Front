import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { getMyUserData } from "../../WebAPI";
import { AuthContext } from "../../contexts";

export default function useRegister() {
  const { setUser, setIsLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    identity: "",
    email: "",
    contactEmail: "",
    password: "",
    checkPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegisterSubmit = (e) => {
    setIsLoading(true);
    setErrorMessage("");
    e.preventDefault();

    for (const [inputName, value] of Object.entries(registerData)) {
      if (value.trim().length === 0) {
        if (inputName === "username") {
          setIsLoading(false);
          scrollTop();
          return setErrorMessage("請輸入使用者名稱");
        } else if (inputName === "identity") {
          setIsLoading(false);
          scrollTop();
          return setErrorMessage("請選擇註冊身分");
        } else if (inputName === "email") {
          setIsLoading(false);
          scrollTop();
          return setErrorMessage("請輸入登入用Email");
        } else if (inputName === "contactEmail") {
          setIsLoading(false);
          scrollTop();
          return setErrorMessage("請輸入聯絡用Email");
        } else if (inputName === "password") {
          setIsLoading(false);
          scrollTop();
          return setErrorMessage("請輸入密碼");
        } else if (inputName === "checkPassword") {
          setIsLoading(false);
          scrollTop();
          return setErrorMessage("請再次輸入密碼");
        }
      }
    }
    if (registerData.password !== registerData.checkPassword) {
      setIsLoading(false);
      scrollTop();
      return setErrorMessage("密碼不相同");
    }

    register(
      registerData.username,
      registerData.identity,
      registerData.email,
      registerData.contactEmail,
      registerData.password,
      registerData.checkPassword
    ).then((data) => {
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
