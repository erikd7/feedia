import {
  parse,
  validate,
  setLocalToken,
  deleteLocalToken
} from "../util/auth/token";

//Store for user and auth info
const store = {
  namespaced: true,
  state() {
    return {
      token: null
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
    }
  },
  mutations: {
    token(state, token) {
      state.token = token;
    }
  },
  actions: {
    setToken({ commit }, token) {
      //Set raw token
      commit("token", token);

      //Set parsed token

      //Set the token in local storage
      setLocalToken(token);
    },
    getParsedToken({ getters }) {
      return getters.parsedToken;
    },
    getIsTokenValid({ getters }) {
      return getters.isTokenValid;
    },
    deleteStoreToken({ dispatch }) {
      dispatch("setToken", null);
    },
    deleteLocalToken() {
      deleteLocalToken();
    },
    signOut({ dispatch }) {
      dispatch("deleteLocalToken");
      dispatch("deleteStoreToken");
    }
  }
};

export default store;
