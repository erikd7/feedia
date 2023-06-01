<template>
  <div
    class="icon-container"
    :title="name"
    @mouseover="showCloseIcon = true"
    @mouseleave="showCloseIcon = false"
  >
    <component :is="icon" :class="iconClass" />
    <XCircleIcon
      v-if="showRemove && showCloseIcon"
      class="transition-smooth close-icon"
      @click="remove"
    />
  </div>
</template>

<script>
import { XCircleIcon } from "@heroicons/vue/24/solid";

export default {
  props: {
    icon: {
      type: Function,
      required: true
    },
    name: {
      type: String
    },
    iconClass: {
      type: String,
      default: "icon-base hover-grow"
    },
    showRemove: {
      type: Boolean,
      default: false
    },
    remove: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    XCircleIcon
  },
  data() {
    return {
      showCloseIcon: false
    };
  }
};
</script>

<style scoped>
.icon-container {
  position: relative;
  display: inline-block;
}

.close-icon {
  position: absolute;
  top: -6px;
  left: -6px;
  cursor: pointer;
  @apply w-3;
  @apply text-red-700;
}
</style>
