<template>
  <div class="space-x-1">
    <template v-for="value in info">
      <template v-if="getValue(value)">
        <a>{{ getFormattedValue(value) }}</a>
        <a class="hide-last">&#x2022;</a>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Array,
      default: []
    }
  },
  methods: {
    getValue(value) {
      if (typeof value === "object") {
        return value.value;
      }
      return value;
    },
    getFormattedValue(value) {
      if (value?.formatter) {
        return value.formatter(value.value);
      }
      return value;
    }
  }
};
</script>
