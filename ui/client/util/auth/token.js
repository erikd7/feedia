import decodeJwt from "jwt-decode";
import {
  get as getLocalStorage,
  set as setLocalStorage
} from "../localStorage";

const LOCAL_STORAGE_TOKEN_KEY = "token";

export const parse = token => {
  let parsedToken;
  try {
    parsedToken = decodeJwt(token);
  } catch {
    parsedToken = null;
  }

  return parsedToken;
};

export const validate = token => {
  const parsedToken = parse(token);

  return Boolean(parsedToken?.id);
};

export const getLocalToken = () => {
  return getLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
};

export const setLocalToken = token => {
  return setLocalStorage(LOCAL_STORAGE_TOKEN_KEY, token, {}, true);
};
