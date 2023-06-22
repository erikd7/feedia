<template>
  <div class="rounded overflow-hidden shadow-lg px-2 py-2">
    <div class="flex flex-row">
      <div class="flex flex-column">
        <MoviePoster :movie="movie">
          <template v-slot:coverAction="{ hovered }">
            <MediaTypeIcon v-if="hovered" :mediaType="mediaType" />
          </template>
        </MoviePoster>
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
          <p class="text-gray-700 text-base italic text-ellipses">
            {{ truncate(description, 300) }}
          </p>
        </div>
        <div class="mobile-hide card-section space-x-1 space-y-1">
          <Chip
            v-for="genre in movie.genres"
            :title="genre"
            :label="truncate(genre, 30)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MediaTypeIcon from "../../navigation/MediaTypeIcon.vue";
import MoviePoster from "../image/MoviePoster";
import Chip from "primevue/chip";
import DotSeparatedInfo from "../info/DotSeparatedInfo.vue";
import { MEDIA_TYPES } from "../../../util/constants/base";
import { truncate } from "../../../util/format/text";
import { levels as fieldLevels } from "../../../util/constants/fields";

export default {
  components: { MediaTypeIcon, MoviePoster, Chip, DotSeparatedInfo },
  props: {
    index: {
      type: Number,
      required: true
    },
    movie: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    truncate,
    getDetails() {
      //Retrieve details if they aren't already set
      if (
        !this.movie.dataLevel ||
        fieldLevels.indexOf(this.movie.dataLevel) <
          fieldLevels.indexOf("details")
      ) {
        this.movie.addDetails();
      }
    }
  },
  watch: {
    //Watch a field that is included in additional details fetch
    //runtime() {
    //this.getDetails();
    //}
  },
  created() {
    //Retrieve details if they aren't already set
    this.getDetails();
  },
  computed: {
    id() {
      return this.movie.tmdbId;
    },
    mediaType() {
      return MEDIA_TYPES.MOVIE;
    },
    title() {
      return this.movie.displayTitle();
    },
    director() {
      return "Edgar Wright";
    },
    year() {
      return this.movie.displayYear();
    },
    runtime() {
      return this.movie.displayRuntime();
    },
    description() {
      return this.movie.displayDescription();
    }
  }
};
</script>
<style scoped>
.p-dataview-content > div > div {
  width: 100% !important;
}
.card-section {
  padding: 5px;
}
.card-section:first-child {
  padding-top: 0;
}

.card-section:last-child {
  padding-bottom: 0;
}
</style>
