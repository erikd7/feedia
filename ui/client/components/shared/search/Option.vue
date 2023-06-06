<template>
  <div>
    <!--<BookOption /> or <MovieOption />-->
    <component
      :is="OptionComponent"
      :option="option"
      :showMediaType="showMediaTypes"
    />
  </div>
</template>

<script>
import BookOption from "./BookOption";
import MovieOption from "./MovieOption";
import { MEDIA_TYPES } from "../../../util/constants/base";
import { mapState } from "vuex";

export default {
  components: {
    BookOption,
    MovieOption
  },
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["currentMediaTypes"]),
    OptionComponent() {
      switch (this.option.mediaType) {
        case MEDIA_TYPES.MOVIE:
          return MovieOption;
        case MEDIA_TYPES.BOOK:
        default:
          return BookOption;
      }
    },
    showMediaTypes() {
      return this.currentMediaTypes?.length > 1; //Show media type options if there are multiple media types
    }
  }
};
</script>
