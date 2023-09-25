<template>
  <div
    class="rounded overflow-hidden shadow-lg px-2 py-2 cursor-pointer text-main"
    @click="onClickRow"
  >
    <div class="flex flex-row px-2 py-2">
      <div class="flex flex-column">
        <slot name="photo" />
      </div>
      <div class="flex flex-column justify-between">
        <div class="card-section">
          <p class="font-bold text-xl">
            <slot name="title" />
          </p>
          <slot name="subHeader" />
        </div>
        <slot name="body" />
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onClickRow: {
      type: Function,
      default: () => {}
    }
  }
};
</script>
