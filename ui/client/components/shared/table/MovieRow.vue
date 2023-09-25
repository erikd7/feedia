<template>
  <Row v-bind="rowProps">
    <template v-slot:photo>
      <div>
        <MoviePoster :movie="movie">
          <template v-slot:coverAction="{ hovered }">
            <MediaTypeIcon v-if="hovered" :mediaType="mediaType" />
          </template>
        </MoviePoster>
      </div>
    </template>
    <template v-slot:title>
      {{ title }}
    </template>
    <template v-slot:subHeader>
      <DotSeparatedInfo :info="[director, year, runtime]" />
    </template>
    <template v-slot:body>
      <div
        v-if="description"
        :title="`Description of ${title}`"
        class="card-section"
      >
        <p class="text-base italic text-ellipses">
          {{ truncate(description, 300) }}
        </p>
      </div>
    </template>
    <template v-slot:footer>
      <div class="mobile-hide card-section space-x-1 space-y-1">
        <Chip
          v-for="genre in movie.genres"
          :title="genre"
          :label="truncate(genre, 30)"
        />
      </div>
    </template>
  </Row>
</template>

<script>
import MediaTypeIcon from "../../navigation/MediaTypeIcon.vue";
import MoviePoster from "../image/MoviePoster";
import Chip from "primevue/chip";
import DotSeparatedInfo from "../info/DotSeparatedInfo.vue";
import { MEDIA_TYPES } from "../../../util/constants/base";
import { truncate } from "../../../util/format/text";
import Row from "./Row.vue";

export default {
  components: { MediaTypeIcon, MoviePoster, Chip, DotSeparatedInfo, Row },
  props: {
    index: {
      type: Number,
      required: true
    },
    movie: {
      type: Object,
      default: () => {}
    },
    rowProps: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    truncate,
    getDetails() {
      //Retrieve details if they aren't already set
      this.movie.addDetails(true);
    }
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
    }
  }
};
</script>
<style scoped>
.p-dataview-content > div > div {
  width: 100% !important;
}
</style>
