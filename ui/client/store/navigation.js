//Store for search and search results
const store = {
  namespaced: true,
  state() {
    return {
      currentRoute: "/"
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
    }
  },
  actions: {
    setCurrentRoute({ commit }, newRoute) {
      commit("currentRoute", newRoute);
    }
  }
};

export default store;
