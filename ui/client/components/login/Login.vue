<template>
  <div>
    This is the login page
    <br /><br /><br /><br />
    <button @click="openRedirect">Log In with Google</button>
  </div>
</template>

<script>
import config from "../../../config/build";

export default {
  components: {},
  methods: {
    openRedirect() {
      window.location.href = this.redirectUrl;
    }
  },
  computed: {
    redirectUrl() {
      return config.auth.google.redirectUrl;
    }
  }
};
</script>
