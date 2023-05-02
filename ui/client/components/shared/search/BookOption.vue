<template>
  <div class="text-left text-ellipsis">
    <div class="font-semibold">{{ option.title }}</div>
    <div class="flex flex-row justify-between text-sm">
      <div>{{ option.authors?.join(", ") }}</div>
      <div>{{ getYearFromDate(option.publishedDate) }}</div>
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
  },
  data() {
    return {};
  },
  methods: {
    getYearFromDate(dateString) {
      const regex = /(\d{4})/g;
      const matches = dateString.match(regex);

      if (matches && matches.length > 0) {
        return parseInt(matches[0]);
      } else {
        return null;
      }
    }
  }
};
</script>
