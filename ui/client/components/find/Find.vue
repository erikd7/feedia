<template>
  <div>
    <Loading v-if="loading" message="Loading search results..." />
    <div v-else>
      <SearchResults v-if="results" :results="results" />
      <div
        class="min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
      >
        <div class="text-center">
          <h1
            class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            Enter a search term
          </h1>
          <p class="mt-6 text-base leading-7 text-gray-600">
            Books, movies, and more. All in one place.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResults from "../shared/table/SearchResults";
import Loading from "../shared/Loading";
import { mapState } from "vuex";

export default {
  components: { SearchResults, Loading },
  computed: {
    ...mapState("search", ["results", "selection", "loading"])
  }
};
</script>
