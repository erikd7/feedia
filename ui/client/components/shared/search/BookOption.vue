<template>
  <div class="text-left text-ellipsis">
    <div class="font-semibold">{{ option.title }}</div>
    <div class="flex flex-row justify-between text-sm">
      <div>{{ option.authors }}</div>
      <div>{{ option.publishedYear }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      required: true
    }
  }
};
</script>
