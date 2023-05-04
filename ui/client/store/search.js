//Store for search and search results
const store = {
  namespaced: true,
  state() {
    return {
      results: [],
      selection: null
    };
  },
  mutations: {
    results(state, results) {
      state.results = results;
    },
    selection(state, selection) {
      state.selection = selection;
    }
  },
  getters: {
    currentMediaType(_state, _getters, rootState) {
      return rootState.currentMediaType;
    }
  },
  actions: {
    setResults({ commit }, results) {
      commit("results", results);
    },
    setSelection({ commit }, selection) {
      commit("selection", selection);
    }
  }
};

export default store;
