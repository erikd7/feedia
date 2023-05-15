<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <img :src="imageSource" @load="onImageLoad" :class="imageClass" />
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
      isLoading: true
    };
  },
  methods: {
    onImageLoad() {
      this.isLoading = false;
    }
  }
};
</script>
