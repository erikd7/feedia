<template>
  <component :is="wrapper" v-bind="{ title: movie }">
    <template v-slot:photo>
      <MoviePoster :movie="movie">
        <template v-slot:coverAction="{ hovered }">
          <div v-show="hovered">
            <ActionBar :title="movie" />
          </div>
        </template>
      </MoviePoster>
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
  </component>
</template>

<script>
import MoviePoster from "./MoviePoster";
import Chip from "primevue/chip";
import DotSeparatedInfo from "../shared/info/DotSeparatedInfo";
import { truncate } from "../../util/format/text";
import Movie from "../../classes/Movie";
import ActionBar from "../title/action/ActionBar";

export default {
  components: { MoviePoster, ActionBar, Chip, DotSeparatedInfo },
  props: {
    wrapper: {
      type: Object,
      default: () => <></>
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
