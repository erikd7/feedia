import {
  parse,
  validate,
  setLocalToken,
  deleteLocalToken
} from "../util/auth/token";
import { removeLocalUserInfo } from "../util/auth/actions";

//Store for user and auth info
const store = {
  namespaced: true,
  state() {
    return {
      token: null,
      user: null
    };
  },
  getters: {
    token(state) {
      return state.token;
    },
    parsedToken(state) {
      if (state.token) {
        return parse(state.token);
      }
      return null;
    },
    isTokenValid(state) {
      return validate(state.token);
    },
    user(state) {
      return state.user;
    }
  },
  mutations: {
    token(state, token) {
      state.token = token;
    },
    user(state, user) {
      state.user = user;
    }
  },
  actions: {
    setToken({ commit }, token) {
      //Set raw token
      commit("token", token);

      //Set the token in local storage
      setLocalToken(token);
    },
    setUser({ commit }, user) {
      commit("user", user);
    },
    deleteUser({ commit }) {
      commit("user", null);
    },
    deleteStoreToken({ dispatch }) {
      dispatch("setToken", null);
    },
    deleteLocalToken() {
      deleteLocalToken();
    },
    signOut({ dispatch }) {
      dispatch("deleteUser");
      dispatch("deleteStoreToken");

      //Delete local storage values
      dispatch("deleteLocalToken");
      removeLocalUserInfo();
    }
  }
};

export default store;
