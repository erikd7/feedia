<template>
  <div
    class="icon-container"
    :title="name"
    @mouseover="
      () => {
        showCloseIcon = true;
      }
    "
    @mouseleave="
      () => {
        showCloseIcon = false;
      }
    "
  >
    <component
      :is="icon"
      :class="{
        [iconClass]: true,
        'icon-hover-delete': aggregateShowCloseIcon
      }"
    />
    <XMarkIcon
      v-if="aggregateShowCloseIcon"
      class="transition-smooth close-icon hover-grow"
      @click="
        event => {
          event.preventDefault();
          event.stopPropagation();
          remove(event);
        }
      "
    />
  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/solid";

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
    allowRemove: {
      type: Boolean,
      default: false
    },
    //Override component state to force show remove option
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
    XMarkIcon
  },
  data() {
    return {
      showCloseIcon: false
    };
  },
  computed: {
    aggregateShowCloseIcon() {
      return this.allowRemove && (this.showRemove || this.showCloseIcon);
    }
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
  top: 0;
  left: 0;
  cursor: pointer;
  @apply text-red-700;
}
.icon-hover-delete {
  @apply text-gray-400;
}
</style>
