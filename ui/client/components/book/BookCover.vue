<template>
  <div class="image-size">
    <Image
      :imageSource="coverUrl"
      :cacheLocation="coverName"
      imageClass="rounded-md"
    >
      <template v-slot:imageAction="slotProps">
        <slot name="coverAction" v-bind="slotProps" />
      </template>
    </Image>
  </div>
</template>

<script>
import Image from "../shared/image/Image";

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
<style>
.image-size {
  @apply w-44;
}
@media only screen and (max-width: 650px) {
  .image-size {
    @apply w-28;
  }
}
</style>
