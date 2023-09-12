<template>
  <div>
    <div class="flex flex-row">
      <div class="flex flex-column pr-2">
        <MoviePoster :movie="movie" />
      </div>
      <div class="flex flex-column justify-between">
        <div class="card-section">
          <p class="font-bold text-xl">
            {{ title }}
          </p>
          <DotSeparatedInfo :info="[director, year, runtime]" />
        </div>
        <div
          v-if="tagline"
          :title="`Tagline for ${title}`"
          class="card-section"
        >
          <p class="italic text-base text-ellipses">
            {{ truncate(tagline, 100) }}
          </p>
        </div>
        <div
          v-if="description"
          :title="`Description of ${title}`"
          class="card-section"
        >
          <p class="text-base text-ellipses">
            {{ truncate(description, 100) }}
          </p>
        </div>
        <div class="mobile-hide card-section space-x-1 space-y-1">
          <Chip
            v-for="genre in genres"
            :title="genre"
            :label="truncate(genre, 30)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MoviePoster from "../shared/image/MoviePoster";
import Chip from "primevue/chip";
import DotSeparatedInfo from "../shared/info/DotSeparatedInfo";
import { truncate } from "../../util/format/text";
import Movie from "../../classes/Movie";

export default {
  components: { MoviePoster, Chip, DotSeparatedInfo },
  props: {
    id: {
      type: String
    },
    movie: {
      type: Object,
      required: true
    }
  },
  methods: {
    truncate,
    async getDetails(id) {
      this.movie = await Movie.build(id);
    }
  },
  mounted() {
    //If movie is not passed, retrieve it
    if (!this.movie || !Object.keys(this.movie)) {
      this.getDetails(this.id);
    }
  },
  computed: {
    id() {
      return this.movie.tmdbId;
    },
    title() {
      return this.movie.displayTitle();
    },
    director() {
      return this.movie.displayDirectors();
    },
    year() {
      return this.movie.displayYear();
    },
    runtime() {
      return this.movie.displayRuntime();
    },
    description() {
      return this.movie.displayDescription();
    },
    tagline() {
      return this.movie.displayTagline();
    },
    genres() {
      return this.movie.genres;
    }
  }
};
</script>
