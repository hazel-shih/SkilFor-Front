import { getAuthToken } from "./utils";
const BASE_URL = "https://skilforapi.bocyun.tw";

export const login = async (identity, email, password) => {
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
  return await res.json();
};

export const getMyUserData = async () => {
  const token = getAuthToken();
  const res = await fetch(`${BASE_URL}/members/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const register = async (
  username,
  identity,
  email,
  contactEmail,
  password,
  checkPassword
) => {
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
};
