//Store for search and search results
import { NAV_BAR_SEARCH_INPUT_ID } from "../util/constants/navigation";

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
      if (event?.target?.getAttribute("id") !== NAV_BAR_SEARCH_INPUT_ID) {
        commit("navExpanded", !state.navExpanded);
      }
    },
    toggleOffExpanded({ commit }) {
      commit("navExpanded", false);
    }
  }
};

export default store;
