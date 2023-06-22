<template>
  <div class="image-size">
    <div
      v-if="!error"
      class="relative"
      @mouseover="hover"
      @mouseleave="unhover"
    >
      <img
        :src="imageSource"
        :class="imageClass"
        @load="onLoad"
        @error="onError"
      />
      <div v-if="loaded" class="absolute top-0">
        <slot name="imageAction" :hovered="hovered" />
      </div>
    </div>
    <div v-if="!loaded" class="h-full">
      <Skeleton height="100%" />
    </div>
  </div>
</template>
<script>
import Skeleton from "primevue/skeleton";

export default {
  components: {
    Skeleton
  },
  data() {
    return {
      loaded: false,
      hovered: false,
      error: false
    };
  },
  props: {
    imageSource: {
      type: String,
      required: true
    },
    imageClass: {
      type: String,
      default: ""
    }
  },
  methods: {
    onLoad() {
      this.loaded = true;
    },
    onError() {
      this.error = true;
    },
    hover() {
      this.hovered = true;
    },
    unhover() {
      this.hovered = false;
    }
  }
};
</script>
<style>
.image-size {
  width: 180px;
  height: 265px;
}
@media only screen and (max-width: 650px) {
  .image-size {
    @apply w-28;
    @apply h-56;
  }
}
</style>
