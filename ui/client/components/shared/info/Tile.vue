<template>
  <div class="tile m-1 w-20 h-min rounded-lg">
    <div class="px-2 py-1 rounded-t-lg text-xs text-center">
      <slot name="header" />
    </div>
    <div class="p-2 font-bold text-center bg-white rounded-b-lg">
      <div>
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.tile {
  background-color: #b5cbe3;
  border: 1px solid #b5cbe3;
}
</style>
