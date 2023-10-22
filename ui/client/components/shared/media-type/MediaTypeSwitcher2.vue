<template>
  <div>
    <div v-for="mediaTypeOption in mediaTypeOptions">
      <template v-if="isSelectedMediaType(mediaTypeOption)">
        <slot :name="mediaTypeOption" />
      </template>
    </div>
  </div>
</template>

<script>
import { MEDIA_TYPES } from "../../../util/constants/base";

export default {
  props: {
    mediaType: {
      type: String,
      required: true
    }
  },
  computed: {
    mediaTypeOptions() {
      return Object.values(MEDIA_TYPES);
    }
  },
  methods: {
    isSelectedMediaType(mediaTypeOption) {
      return mediaTypeOption?.toUpperCase() === this.mediaType?.toUpperCase();
    }
  }
};
</script>
