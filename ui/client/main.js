import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueCookies from "vue-cookies";
import store from "./store/store";

import { getEnv } from "./config/build";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import PrimeVue from "primevue/config";
import "./public/themes/index.css";
import "./public/themes/main.css";
import "primeflex/primeflex.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./registerServiceWorker";

const env = getEnv();
if (env !== "production") {
  console.log(`Building for ${env} environment.`);
}

library.add(faUserSecret);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(VueCookies);

app.use(store);

app.use(PrimeVue, { ripple: true });

app.mount("#app");
