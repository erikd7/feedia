<template>
  <div class="space-x-1">
    <template v-for="(value, index) in info">
      <template v-if="getValue(value)">
        <a>{{ getFormattedValue(value) }}</a>
        <template v-if="index < info.length - 1">
          <a class="space-x-1">&#x2022;</a>
        </template>
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
      return value?.value || value;
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
