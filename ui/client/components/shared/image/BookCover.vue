<template>
  <Image
    :imageSource="coverUrl"
    :cacheLocation="coverName"
    imageClass="rounded-md"
  />
</template>

<script>
import Image from "./Image";

export default {
  components: {
    Image
  },
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  computed: {
    coverName() {
      return this.book.getCoverName();
    },
    coverUrl() {
      return this.book.getCoverUrl();
    }
  }
};
</script>
