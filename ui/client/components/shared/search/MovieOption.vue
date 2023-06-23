<template>
  <div class="flex flex-row cursor-pointer" @click="openDetails">
    <div class="vertical-center-flex pr-2">
      <MediaTypeIcon
        v-if="showMediaType"
        :icon="MEDIA_TYPE_DISPLAY.MOVIE.icon"
      />
    </div>
    <div class="text-left text-ellipsis flex-grow">
      <div class="font-semibold">{{ title }}</div>
      <div class="flex flex-row justify-between text-sm">
        <div>Director placeholder</div>
        <div>{{ year }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import MediaTypeIcon from "../../navigation/MediaTypeIcon";
import { MEDIA_TYPES, MEDIA_TYPE_DISPLAY } from "../../../util/constants/base";
import { callClassFn } from "../../../util/class";

export default {
  components: { MediaTypeIcon, MediaTypeIcon },
  props: {
    option: {
      type: Object,
      required: true
    },
    showMediaType: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    callClassFn,
    openDetails() {
      this.$router.push({
        name: "Details",
        params: {
          mediaType: MEDIA_TYPES.MOVIE.toLowerCase(),
          id: this.option.routeId()
        }
      });
    }
  },
  computed: {
    MEDIA_TYPE_DISPLAY() {
      return MEDIA_TYPE_DISPLAY;
    },
    title() {
      return this.option.displayTitle();
    },
    year() {
      return this.option.displayYear();
    }
  }
};
</script>
