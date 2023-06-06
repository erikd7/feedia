<template>
  <div>
    <MediaTypeSwitcher
      :mediaType="option.mediaType"
      :componentsByMediaType="componentsByMediaType"
      :passedProps="{ option, showMediaType }"
    />
  </div>
</template>

<script>
import BookOption from "./BookOption";
import MovieOption from "./MovieOption";
import { MEDIA_TYPES } from "../../../util/constants/base";
import { mapState } from "vuex";
import MediaTypeSwitcher from "../media-type/MediaTypeSwitcher.vue";

export default {
  components: {
    BookOption,
    MovieOption,
    MediaTypeSwitcher
  },
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["currentMediaTypes"]),
    componentsByMediaType() {
      return {
        [MEDIA_TYPES.BOOK]: BookOption,
        [MEDIA_TYPES.MOVIE]: MovieOption
      };
    },
    showMediaType() {
      return this.currentMediaTypes?.length > 1; //Show media type options if there are multiple media types
    }
  }
};
</script>
