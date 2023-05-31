<template>
  <div>
    <font-awesome-icon icon="fa-solid fa-xmark" />
    <SpeedDial
      :model="items"
      class=""
      type="semi-circle"
      :radius="40"
      buttonClass="toggle-button p-button-outlined"
      direction="down"
      :transitionDelay="40"
      showIcon="fa fa-plus-circle"
      hideIcon="fa fa-regular fa-circle-xmark"
    >
      <template #button="{ toggle }">
        <button @click="toggle">
          <font-awesome-icon icon="fa-solid fa-plus-circle" />
        </button>
      </template>
      <template #item="{ item, onClick }">
        <button @click="onClick" :title="item.label">
          a<font-awesome-icon :icon="['far', 'circle-xmark']" />
        </button>
      </template>
    </SpeedDial>
  </div>
</template>

<script>
import SpeedDial from "primevue/speeddial";
import { MEDIA_TYPE_DISPLAY } from "../../util/constants/base";
import { mapState, mapActions } from "vuex";

export default {
  components: { SpeedDial },
  computed: {
    ...mapState(["currentMediaTypes"]),
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
