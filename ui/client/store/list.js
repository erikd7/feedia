//Store for search and search results
const store = {
  namespaced: true,
  state() {
    return {
      userLists: null,
      selected: null
    };
  },
  getters: {
    userLists(state) {
      return state.userLists;
    },
    selected(state) {
      return state.selected;
    }
  },
  mutations: {
    userLists(state, userLists) {
      state.userLists = userLists;
    },
    selected(state, selected) {
      state.selected = selected;
    }
  },
  actions: {
    setUserLists({ commit }, userLists) {
      commit("userLists", userLists);
    },
    setSelected({ commit }, selected) {
      commit("selected", selected);
    }
  }
};

export default store;
