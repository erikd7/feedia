import { parse, validate, setLocalToken } from "../util/auth/token";

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
      commit("token", token);

      //Set the token in local storage
      setLocalToken(token);
    },
    getParsedToken({ getters }) {
      return getters.parsedToken;
    },
    getIsTokenValid({ getters }) {
      return getters.isTokenValid;
    }
  }
};

export default store;
