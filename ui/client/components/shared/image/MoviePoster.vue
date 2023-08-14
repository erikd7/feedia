<template>
  <div class="image-size">
    <Image
      :imageSource="posterUrl"
      :cacheLocation="posterName"
      imageClass="rounded-md"
    >
      <template v-slot:imageAction="slotProps">
        <slot name="coverAction" v-bind="slotProps" />
      </template>
    </Image>
  </div>
</template>

<script>
import Image from "./Image";

export default {
  components: {
    Image
  },
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    posterName() {
      return this.movie.getPosterName();
    },
    posterUrl() {
      return this.movie.getPosterUrl();
    }
  }
};
</script>
