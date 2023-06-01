//Store for search and search results
const store = {
  namespaced: true,
  state() {
    return {
      currentRoute: "/",
      navExpanded: false
    };
  },
  getters: {
    currentRoute(state) {
      return state.currentRoute;
    }
  },
  mutations: {
    currentRoute(state, currentRoute) {
      state.currentRoute = currentRoute;
    },
    navExpanded(state, navExpanded) {
      state.navExpanded = navExpanded;
    }
  },
  actions: {
    setCurrentRoute({ commit }, newRoute) {
      commit("currentRoute", newRoute);
    },
    toggleExpanded({ commit, state }, event) {
      if (typeof event === "boolean") {
        commit("navExpanded", event);
      }
      commit("navExpanded", !state.navExpanded);
    },
    toggleOffExpanded({ state, commit }) {
      if (state.navExpanded) {
        commit("navExpanded", false);
      }
    }
  }
};

export default store;
