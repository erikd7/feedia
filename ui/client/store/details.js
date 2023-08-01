//Store for search and search results
const store = {
  namespaced: true,
  state() {
    return {
      selected: null
    };
  },
  getters: {
    selected(state) {
      return state.selected;
    }
  },
  mutations: {
    selected(state, selected) {
      state.selected = selected;
    }
  },
  actions: {
    setSelected({ commit }, selected) {
      commit("selected", selected);
    }
  }
};

export default store;
