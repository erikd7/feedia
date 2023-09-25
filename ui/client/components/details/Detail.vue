<template>
  <div>
    <div class="flex flex-row">
      <div class="flex flex-column pr-2">
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
        <slot name="infoStrip" />
      </div>
    </div>
    <div class="py-3">
      <slot name="main" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onClickImage: {
      type: Function,
      default: () => {}
    }
  }
};
</script>
