import Vuex from "vuex";
import searchStore from "./search";
import navigationStore from "./navigation";
import detailsStore from "./details";
import { MEDIA_TYPES } from "../util/constants/base";
import { get as getLocal, set as setLocal } from "../util/localStorage";
import config from "../config/build";

const setLocalCurrentMediatypes = mediaTypes => {
  setLocal("currentMediaTypes", mediaTypes, { expirationUnits: "d" }, true);
};

//Vuex store
const store = Vuex.createStore({
  modules: {
    navigation: navigationStore,
    search: searchStore,
    details: detailsStore
  },
  state() {
    return {
      primaryMediaType: MEDIA_TYPES.BOOK,
      currentMediaTypes:
        getLocal("currentMediaTypes") || config.mediaTypes.default
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
        const mediaTypes = [...state.currentMediaTypes, newMediaType];
        commit("currentMediaTypes", mediaTypes);
        setLocalCurrentMediatypes(mediaTypes);
      }
    },
    removeMediaType({ state, commit }, mediaTypeKey) {
      const indexToRemove = state.currentMediaTypes.indexOf(mediaTypeKey);
      if (indexToRemove > -1) {
        state.currentMediaTypes.splice(indexToRemove, 1);
        commit("currentMediaTypes", state.currentMediaTypes);
        setLocalCurrentMediatypes(state.currentMediaTypes);
      }
    }
  }
});

export default store;
