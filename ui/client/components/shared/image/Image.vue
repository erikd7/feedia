<template>
  <div class="relative" @mouseover="hover" @mouseleave="unhover">
    <div v-if="isLoading">Loading...</div>
    <img :src="imageSource" @load="onImageLoad" :class="imageClass" />
    <div class="absolute top-0">
      <slot name="imageAction" :hovered="hovered" />
    </div>
  </div>
</template>
<script>
export default {
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
  data() {
    return {
      isLoading: true,
      hovered: false
    };
  },
  methods: {
    onImageLoad() {
      this.isLoading = false;
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
