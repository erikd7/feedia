<template>
  <div
    class="relative self-start"
    @mouseover="
      () => {
        if (hovered) setHovered(true);
      }
    "
    @mouseleave="
      () => {
        setHovered(false);
      }
    "
    v-click-away="
      () => {
        setHovered(false);
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
        <button
          @click="toggle"
          @mouseover="
            () => {
              setHovered(true);
            }
          "
          @mouseleave="
            () => {
              setHovered(false);
            }
          "
        >
          <CurrentMediaTypes :allowRemove="!isMobile" />
        </button>
      </template>
      <template #item="{ item }">
        <div class="hover-grow">
          <button @click="item.command" :title="item.label">
            <MediaTypeIcon
              :icon="item.icon"
              :allowRemove="
                isMediaTypeSelected(item.key) &&
                currentMediaTypesDisplay?.length > 1
              "
              :showRemove="Boolean(isMobile && isMediaTypeSelected(item.key))"
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
      let mediaTypeEntries = Object.entries(MEDIA_TYPE_DISPLAY);
      //In desktop, user deletes from the SpeedDial button. In mobile, user deletes from dropdown, so only filter for desktop
      if (!this.isMobile) {
        mediaTypeEntries = mediaTypeEntries.filter(
          ([key]) => !this.currentMediaTypesHash[key]
        );
      }
      return mediaTypeEntries.map(([key, info]) => ({
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
    setHovered(value) {
      setTimeout(() => {
        this.hovered = value;
      }, 100);
    },
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
