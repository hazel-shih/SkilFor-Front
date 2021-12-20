import { useEffect, useRef } from "react";
import { getAuthToken } from "../../../utils";
import { useNavigate } from "react-router-dom";

function useCheckToken() {
  const authToken = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    authToken.current = getAuthToken();
    if (!authToken.current) navigate("/");
  }, [navigate]);
  return;
}

export default useCheckToken;
