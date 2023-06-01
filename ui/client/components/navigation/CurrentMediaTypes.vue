<template>
  <div class="flex flex-row">
    <div v-for="mediaType in currentMediaTypesDisplay" :key="mediaType.name">
      <component
        :is="mediaType.icon"
        :title="mediaType.name"
        class="icon-base"
      />
    </div>
  </div>
</template>

<script>
import { MEDIA_TYPE_DISPLAY } from "../../util/constants/base";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["currentMediaTypes"]),
    currentMediaTypesDisplay() {
      return this.currentMediaTypes.map(mt => MEDIA_TYPE_DISPLAY[mt]);
    },
    items() {
      return Object.entries(MEDIA_TYPE_DISPLAY).map(([key, info]) => ({
        label: info.name,
        icon: info.icon,
        command: () => console.log("clicked " + key)
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
</style>
