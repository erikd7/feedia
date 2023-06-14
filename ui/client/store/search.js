//Store for search and search results
const store = {
  namespaced: true,
  state() {
    return {
      loading: false,
      results: [],
      selection: null
    };
  },
  mutations: {
    loading(state, loading) {
      state.loading = loading;
    },
    results(state, results) {
      state.results = results;
    },
    selection(state, selection) {
      state.selection = selection;
    }
  },
  getters: {
    primaryMediaType(_state, _getters, rootState) {
      return rootState.primaryMediaType;
    }
  },
  actions: {
    setLoading({ commit }, loading) {
      commit("loading", loading);
    },
    setResults({ commit }, results) {
      commit("results", results);
    },
    setSelection({ commit }, selection) {
      commit("selection", selection);
    }
  }
};

export default store;
