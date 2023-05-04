import { mappings } from "../util/mapping/by-type";

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
    },
    cleanedResults(state, getters) {
      const mapping =
        mappings[getters.currentMediaType]["httpToSearchDropdown"];
      return state.results.map(mapping);
    },
    formattedResults(state, getters) {
      const mapping = mappings[getters.currentMediaType]["resultsToDataView"];
      return state.results.map(mapping);
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
