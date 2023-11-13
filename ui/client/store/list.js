//Store for search and search results
const store = {
  namespaced: true,
  state() {
    return {
      userLists: null
    };
  },
  getters: {
    userLists(state) {
      return state.userLists;
    }
  },
  mutations: {
    userLists(state, userLists) {
      state.userLists = userLists;
    }
  },
  actions: {
    setUserLists({ commit }, userLists) {
      commit("userLists", userLists);
    }
  }
};

export default store;
