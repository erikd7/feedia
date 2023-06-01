<template>
  <div>
    <SpeedDial
      :model="items"
      class=""
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
          <CurrentMediaTypes />
        </button>
      </template>
      <template #item="{ item }">
        <div class="hover-grow">
          <button @click="item.command" :title="item.label">
            <MediaTypeIcon :icon="item.icon" iconClass="icon-base" />
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
import { MEDIA_TYPE_DISPLAY } from "../../util/constants/base";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: { SpeedDial, CurrentMediaTypes, MediaTypeIcon },
  computed: {
    ...mapState(["currentMediaTypes"]),
    ...mapGetters(["currentMediaTypesHash"]),
    items() {
      return Object.entries(MEDIA_TYPE_DISPLAY)
        .filter(([key]) => !this.currentMediaTypesHash[key])
        .map(([key, info]) => ({
          label: info.name,
          icon: info.icon,
          command: () => {
            this.addMediaType(key);
          }
        }));
    }
  },
  methods: {
    ...mapActions(["addMediaType"])
  }
};
</script>
<style scoped>
.toggle-button {
  width: 35px;
  height: 35px;
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
:deep(.p-speeddial) {
  padding: 5px 10px;
}
:deep(.p-speeddial-opened) {
  @apply shadow-md;
  background-color: white;
}
</style>
