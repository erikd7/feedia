<template>
  <div>
    <div v-if="currentMediaTypesDisplay?.length" class="flex flex-row">
      <div v-for="mediaType in currentMediaTypesDisplay" :key="mediaType.name">
        <MediaTypeIcon
          :icon="mediaType.icon"
          :name="mediaType.name"
          :allowRemove="allowRemove && currentMediaTypesDisplay?.length > 1"
          :remove="() => removeMediaType(mediaType.key)"
        />
      </div>
    </div>
    <PlusIcon v-if="!currentMediaTypesDisplay?.length" />
  </div>
</template>

<script>
import MediaTypeIcon from "./MediaTypeIcon";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { MEDIA_TYPE_DISPLAY } from "../../util/constants/base";
import { mapState, mapActions } from "vuex";

export default {
  props: {
    allowRemove: {
      type: Boolean,
      default: false
    }
  },
  components: { MediaTypeIcon, PlusIcon },
  computed: {
    ...mapState(["currentMediaTypes"]),
    currentMediaTypesDisplay() {
      return this.currentMediaTypes.map(mt => ({
        ...MEDIA_TYPE_DISPLAY[mt],
        key: mt
      }));
    }
  },
  methods: {
    ...mapActions(["addMediaType", "removeMediaType"])
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
