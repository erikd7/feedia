<template>
  <component
    v-if="mediaTypeComponent"
    :is="mediaTypeComponent"
    v-bind="passedProps"
  />
</template>

<script>
export default {
  props: {
    mediaType: {
      type: String,
      required: true
    },
    componentsByMediaType: {
      type: Object,
      required: true
    },
    passedProps: {
      type: Object,
      default: {}
    }
  },
  computed: {
    mediaTypeComponent() {
      return this.componentsByMediaType[this.mediaType.toUpperCase()];
    }
  }
};
</script>
