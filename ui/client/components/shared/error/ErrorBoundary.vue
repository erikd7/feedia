<template>
  <div v-if="error" class="middle error text-4xl">
    <p>
      <i class="text-red-600 fa fa-exclamation-triangle m-1" />
      <a class="text-4xl">Shoot, something went wrong.</a>
    </p>
    <p class="text-lg">{{ error.message }}</p>
  </div>
  <slot v-else />
</template>

<script>
export default {
  data() {
    return {
      error: null
    };
  },
  errorCaptured(error, vm, info) {
    this.error = error; //Set the error
    console.error(error, vm, info); //Log the error to the console
    return false; //Prevent error from propagating
  }
};
</script>
