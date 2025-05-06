import { decode } from "universal-base64url";

const deleteToken = () => {
  localStorage.removeItem("TC_AUTH_TOKEN");
};

const setToken = (token) => {
  localStorage.setItem("TC_AUTH_TOKEN", token);
};

const getToken = () => {
  return localStorage.getItem("TC_AUTH_TOKEN");
};

const decodeToken = (token) => {
  const tokenParts = token.split(".");
  const base64urlPayload = tokenParts[1];
  const payload = JSON.parse(decode(base64urlPayload));
  return payload;
};

const isLoggedIn = () => {
  const token = getToken();
  if (token) {
    const payload = decodeToken(token);
    return payload.exp > Date.now() / 1000 ? true : false;
  } else {
    return false;
  }
};

const getBearerToken = () => {
  return "Bearer " + getToken();
};

export {
  deleteToken,
  setToken,
  getToken,
  decodeToken,
  isLoggedIn,
  getBearerToken,
};
