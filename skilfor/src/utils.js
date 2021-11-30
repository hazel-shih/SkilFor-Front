export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TOKEN_NAME = "token";

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => {
  localStorage.getItem(TOKEN_NAME);
};
