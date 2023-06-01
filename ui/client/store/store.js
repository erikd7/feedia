import Vuex from "vuex";
import searchStore from "./search";
import navigationStore from "./navigation";
import { MEDIA_TYPES } from "../util/constants/base";

//Vuex store
const store = Vuex.createStore({
  modules: {
    navigation: navigationStore,
    search: searchStore
  },
  state() {
    return {
      primaryMediaType: MEDIA_TYPES.BOOK,
      currentMediaTypes: [MEDIA_TYPES.BOOK]
    };
  },
  getters: {
    currentMediaTypesHash(state) {
      return state.currentMediaTypes.reduce(
        (map, mt) => ({ ...map, [mt]: mt }),
        {}
      );
    }
  },
  mutations: {
    currentMediaTypes(state, mediaTypes) {
      state.currentMediaTypes = mediaTypes;
    }
  },
  actions: {
    addMediaType({ state, commit }, newMediaType) {
      if (!state.currentMediaTypes.includes(newMediaType)) {
        commit("currentMediaTypes", [...state.currentMediaTypes, newMediaType]);
      }
    }
  }
});

export default store;
