<template>
  <div>
    This is the book details page
    <div>info: {{ info }}</div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  }
};
</script>
