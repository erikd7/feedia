import store from "../../store/store";
import { ROUTES } from "../constants/navigation";

export const signIn = token => {
  if (token) {
    store.dispatch("user/setToken", token);
  }
};

export const validate = () => {
  return store.getters["user/isTokenValid"];
};

export const getLoginInfo = () => {
  return store.getters["user/parsedToken"];
};

export const signOut = async router => {
  //Remove token from Vuex store and local storage
  await store.dispatch("user/signOut");

  //Redirect to login page
  if (router) {
    router.push(ROUTES.LOGIN);
  }
};
