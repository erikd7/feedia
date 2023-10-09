import store from "../../store/store";
import { ROUTES } from "../constants/navigation";
import {
  get as getLocalStorage,
  set as setLocalStorage,
  remove as removeLocalStorage
} from "../localStorage";

const LOCAL_STORAGE_USER_KEY = "user";

export const signIn = token => {
  if (token) {
    store.dispatch("user/setToken", token);
  }
};

export const validate = () => {
  return store.getters["user/isTokenValid"];
};

export const getLocalUserInfo = () => {
  return getLocalStorage(LOCAL_STORAGE_USER_KEY);
};

export const setLocalUserInfo = userInfo => {
  store.dispatch("user/setUser", userInfo);
  return setLocalStorage(LOCAL_STORAGE_USER_KEY, userInfo, {}, true);
};

export const removeLocalUserInfo = () => {
  return removeLocalStorage(LOCAL_STORAGE_USER_KEY);
};

export const signOut = async router => {
  //Remove token and user info from Vuex store and local storage
  await store.dispatch("user/signOut");

  //Redirect to login page
  if (router) {
    router.push(ROUTES.LOGIN);
  }
};
