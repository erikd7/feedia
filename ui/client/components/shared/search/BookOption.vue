<template>
  <div class="flex flex-row">
    <div class="vertical-center-flex pr-2">
      <MediaTypeIcon
        v-if="showMediaType"
        :icon="MEDIA_TYPE_DISPLAY.BOOK.icon"
      />
    </div>
    <div class="text-left text-ellipsis flex-grow">
      <div class="font-semibold">{{ callClassFn(option, "displayTitle") }}</div>
      <div class="flex flex-row justify-between text-sm">
        <div>{{ callClassFn(option, "displayFirstNAuthors") }}</div>
        <div>{{ callClassFn(option, "displayFirstPublishYear") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import MediaTypeIcon from "../../navigation/MediaTypeIcon";
import { MEDIA_TYPE_DISPLAY } from "../../../util/constants/base";
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
    callClassFn
  },
  computed: {
    MEDIA_TYPE_DISPLAY() {
      return MEDIA_TYPE_DISPLAY;
    }
  }
};
</script>
