<template>
  <div class="text-left text-ellipsis">
    <div class="font-semibold">{{ callClassFn(option, "displayTitle") }}</div>
    <div class="flex flex-row justify-between text-sm">
      <div>{{ callClassFn(option, "displayFirstNAuthors") }}</div>
      <div>{{ callClassFn(option, "displayFirstPublishYear") }}</div>
    </div>
  </div>
</template>

<script>
import { callClassFn } from "../../../util/class";

export default {
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  methods: {
    callClassFn
  }
};
</script>
