<template>
  <div class="kebab-menu cursor-pointer p-1">
    <div class="kebab-dot" />
    <div class="kebab-dot" />
    <div class="kebab-dot" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.kebab-menu {
  position: relative;
}

.kebab-dot {
  background-color: white;
  border-color: black;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  margin: 4px 0;
}
</style>
