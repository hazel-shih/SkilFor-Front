import { getAuthToken } from "./utils";
const BASE_URL = "https://skilforapi.bocyun.tw";

export const login = async (identity, email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/members/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identity,
        email,
        password,
      }),
    });
    /*if (!res.ok) {
      throw new Error(res.statusText);
    }*/
    return await res.json();
  } catch (error) {
    return console.log(error.message);
  }
};

export const getMyUserData = async () => {
  try {
    const token = getAuthToken();
    const res = await fetch(`${BASE_URL}/members/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    return console.log(error.message);
  }
};

export const register = async (
  username,
  identity,
  email,
  contactEmail,
  password,
  checkPassword
) => {
  try {
    const res = await fetch(`${BASE_URL}/members/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        identity,
        email,
        contactEmail,
        password,
        checkPassword,
      }),
    });
    return await res.json();
  } catch (error) {
    return error.message;
  }
};

export const getTeacherInfos = async (setApiEror) => {
  let url = `${BASE_URL}/teacher/info`;
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    setApiEror("發生了一點錯誤，請稍後再試");
    console.log(error.message);
    return error.message;
  }
};

export const getTeacherCourseInfos = async (teacherId) => {
  let url = `${BASE_URL}/teacher/${teacherId}/course/info`;
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    return error.message;
  }
};
