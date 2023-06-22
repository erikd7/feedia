<template>
  <div class="w-full flex flex-col items-center">
    <ProgressSpinner />
    <div v-if="message">
      {{ message }}
    </div>
  </div>
</template>
<script>
import ProgressSpinner from "primevue/progressspinner";

export default {
  components: {
    ProgressSpinner
  },
  props: {
    message: {
      type: String
    }
  }
};
</script>
