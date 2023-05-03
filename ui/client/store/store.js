import Vuex from "vuex";
import searchStore from "./search";

export const mutationTypes = { SEARCH_RESULTS: "searchResults" };

//Vuex store
const store = Vuex.createStore({
  modules: {
    search: searchStore
  }
});

export default store;
