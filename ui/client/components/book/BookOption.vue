<template>
  <Option>
    <template v-slot:prefix>
      <MediaTypeIcon
        v-if="showMediaType"
        :icon="MEDIA_TYPE_DISPLAY.BOOK.icon"
      />
    </template>
    <template v-slot:title>
      {{ title }}
    </template>
    <template v-slot:subtitle-left>
      {{ authors }}
    </template>
    <template v-slot:subtitle-right> {{ year }}</template>
  </Option>
</template>

<script>
import Option from "../shared/search/Option.vue";
import MediaTypeIcon from "../navigation/MediaTypeIcon.vue";
import { MEDIA_TYPE_DISPLAY } from "../../util/constants/base";
import { callClassFn } from "../../util/class";

export default {
  components: { Option, MediaTypeIcon, MediaTypeIcon },
  props: {
    book: {
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
    },
    title() {
      return this.book.displayTitle();
    },
    authors() {
      return this.book.displayFirstNAuthors();
    },
    year() {
      return this.book.displayFirstPublishYear();
    }
  }
};
</script>
