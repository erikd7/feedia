<template>
  <div>
    <div class="flex flex-row">
      <div class="flex flex-column pr-2">
        <MoviePoster :movie="info" />
      </div>
      <div class="flex flex-column justify-between">
        <div class="card-section">
          <p class="font-bold text-xl">
            {{ title }}
          </p>
          <DotSeparatedInfo :info="[director, year, runtime]" />
        </div>
        <div
          v-if="description"
          :title="`Description of ${title}`"
          class="card-section"
        >
          <p class="text-gray-700 italic text-base text-ellipses">
            {{ truncate(tagline, 100) }}
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

export default {
  components: { MoviePoster, Chip, DotSeparatedInfo },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  methods: { truncate },
  computed: {
    id() {
      return this.info.tmdbId;
    },
    title() {
      return this.info.displayTitle();
    },
    director() {
      return this.info.displayDirectors();
    },
    year() {
      return this.info.displayYear();
    },
    runtime() {
      return this.info.displayRuntime();
    },
    description() {
      return this.info.displayDescription();
    },
    tagline() {
      return this.info.displayTagline();
    },
    genres() {
      return this.info.genres;
    }
  }
};
</script>
