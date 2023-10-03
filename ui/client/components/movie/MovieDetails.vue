<template>
  <Detail v-bind="{ ...detailProps, title: movie }">
    <template v-slot:photo>
      <MoviePoster :movie="movie" />
    </template>
    <template v-slot:title>
      {{ title }}
    </template>
    <template v-slot:subHeader>
      <DotSeparatedInfo :info="[director, year, runtime]" />
    </template>
    <template v-slot:main>
      <div v-if="tagline" :title="`Tagline for ${title}`" class="card-section">
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
    </template>
    <template v-slot:infoStrip>
      <div class="mobile-hide card-section space-x-1 space-y-1">
        <Chip
          v-for="genre in genres"
          :title="genre"
          :label="truncate(genre, 30)"
        />
      </div>
    </template>
  </Detail>
</template>

<script>
import Detail from "../details/Detail.vue";
import MoviePoster from "./MoviePoster";
import Chip from "primevue/chip";
import DotSeparatedInfo from "../shared/info/DotSeparatedInfo";
import { truncate } from "../../util/format/text";
import Movie from "../../classes/Movie";

export default {
  components: { Detail, MoviePoster, Chip, DotSeparatedInfo },
  props: {
    id: {
      type: String
    },
    movie: {
      type: Object,
      required: true
    },
    detailProps: {
      type: Object,
      default: () => {}
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
