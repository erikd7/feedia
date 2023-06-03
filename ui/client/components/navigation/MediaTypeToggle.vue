<template>
  <div
    class="relative self-start"
    @mouseover="
      () => {
        hovered = true;
      }
    "
    @mouseleave="
      () => {
        hovered = false;
      }
    "
    v-click-away="
      () => {
        hovered = false;
      }
    "
    @click="stopEvent"
  >
    <SpeedDial
      :model="items"
      class="t-0"
      :class="{ 'p-speeddial-opened': hovered }"
      type="linear"
      :radius="50"
      buttonClass="toggle-button p-button-outlined"
      direction="down"
      :transitionDelay="40"
      showIcon="fa fa-plus-circle"
      hideIcon="fa fa-regular fa-circle-xmark"
    >
      <template #button="{ toggle }">
        <button @click="toggle">
          <CurrentMediaTypes :allowRemove="true" />
        </button>
      </template>
      <template #item="{ item }">
        <div class="hover-grow">
          <button @click="item.command" :title="item.label">
            <MediaTypeIcon
              :icon="item.icon"
              :showRemove="
                isMediaTypeSelected(item.key) &&
                currentMediaTypesDisplay?.length > 1
              "
              :remove="() => removeMediaType(item.key)"
            />
          </button>
        </div>
      </template>
    </SpeedDial>
  </div>
</template>

<script>
import SpeedDial from "primevue/speeddial";
import CurrentMediaTypes from "./CurrentMediaTypes";
import MediaTypeIcon from "./MediaTypeIcon";
import { PlusCircleIcon } from "@heroicons/vue/24/solid";
import { MEDIA_TYPE_DISPLAY } from "../../util/constants/base";
import { mapState, mapActions, mapGetters } from "vuex";
import { stopEvent } from "../../util/event";

export default {
  data() {
    return {
      hovered: false
    };
  },
  components: { SpeedDial, CurrentMediaTypes, MediaTypeIcon, PlusCircleIcon },
  computed: {
    ...mapState(["currentMediaTypes"]),
    ...mapGetters(["currentMediaTypesHash"]),
    items() {
      return Object.entries(MEDIA_TYPE_DISPLAY)
        .filter(([key]) => !this.currentMediaTypesHash[key])
        .map(([key, info]) => ({
          key: key,
          label: info.name,
          icon: info.icon,
          command: () => {
            this.addMediaType(key);
          }
        }));
    },
    currentMediaTypesDisplay() {
      return this.currentMediaTypes.map(mt => ({
        ...MEDIA_TYPE_DISPLAY[mt],
        key: mt
      }));
    }
  },
  methods: {
    ...mapActions(["addMediaType", "removeMediaType"]),
    stopEvent,
    isMediaTypeSelected(key) {
      return this.currentMediaTypesHash[key];
    }
  }
};
</script>
<style scoped>
.toggle-button {
  width: 35px;
  height: 35px;
}
:deep(.p-speeddial) {
  top: 0;
  left: 0;
}
:deep(.p-speeddial-button) {
  width: 35px !important;
  height: 35px !important;
}
:deep(.p-speeddial-item) {
  z-index: 1000;
}
:deep(.p-speeddial-action) {
  width: 30px !important;
  height: 30px !important;
}
:deep(.p-speeddial-opened) {
  @apply shadow-md;
  background-color: white;
  border-radius: 10px;
}
.speeddial-hover .p-speeddial-items {
  display: block;
}
</style>
