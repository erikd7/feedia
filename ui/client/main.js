import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import "./public/themes/index.css";
import "./public/themes/main.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import VueCookies from "vue-cookies";
import "./registerServiceWorker";
import PrimeVue from "primevue/config";

library.add(faUserSecret);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(VueCookies);

app.use(PrimeVue, { ripple: true });

app.mount("#app");
