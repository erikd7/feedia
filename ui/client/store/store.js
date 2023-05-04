import Vuex from "vuex";
import searchStore from "./search";
import { MEDIA_TYPES } from "../util/constants/base";

//Vuex store
const store = Vuex.createStore({
  modules: {
    search: searchStore
  },
  state() {
    return {
      currentMediaType: MEDIA_TYPES.BOOK //eventually this will be one of book, movie, etc. and it will have its own setters
    };
  }
});

export default store;
