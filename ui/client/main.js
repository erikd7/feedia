//Basic
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueCookies from "vue-cookies";
import store from "./store/store";

//Plugins
import { mixin as clickaway } from "vue3-click-away";
import MobileMixin from "./components/shared/mixins/MobileMixin";
import ConfigMixin from "./components/shared/mixins/ConfigMixin";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import Tooltip from "primevue/tooltip";
import FocusTrap from "primevue/focustrap";

//Helpers
import { getEnv } from "../config/build";

//Style
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

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

const app = createApp(App);

//Basic
app.use(router);
app.use(VueCookies);
app.use(store);

//Plugins
app.mixin(clickaway);
app.mixin(ConfigMixin);
app.mixin(MobileMixin);
app.use(ToastService);
app.use(ConfirmationService);
app.directive("tooltip", Tooltip);
app.directive("focustrap", FocusTrap);

//Style
app.component("font-awesome-icon", FontAwesomeIcon);
library.add(faPencil);
library.add(faTrash);

app.use(PrimeVue, { ripple: true });

app.mount("#app");
