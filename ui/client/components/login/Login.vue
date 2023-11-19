<template>
  <div
    class="min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <h1
        class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
      >
        Welcome to {{ APP_NAME }}!
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600">
        Books, movies, and more. All in one place.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <div v-if="!isTokenValid">
          <Button label="Log in with Google" @click="openLoginRedirect" />
        </div>
        <div v-else>
          <Button label="Get Started" @click="openGetStarted" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../../config/build";
import { APP_NAME } from "../../util/constants/base";
import Button from "primevue/button";
import { mapGetters } from "vuex";
import { ROUTES } from "../../util/constants/navigation";

export default {
  components: { Button },
  methods: {
    openLoginRedirect() {
      window.location.href = this.redirectUrl;
    },
    openGetStarted() {
      this.$router.push(ROUTES.FEED);
    }
  },
  computed: {
    ...mapGetters("user", ["isTokenValid"]),
    APP_NAME() {
      return APP_NAME;
    },
    redirectUrl() {
      return config.auth.google.redirectUrl;
    }
  }
};
</script>
