<template>
  <div>
    <img :src="imageSource" />
  </div>
</template>

<script>
export default {
  props: {
    imageSource: {
      type: String,
      required: true
    }
  }
};
</script>
