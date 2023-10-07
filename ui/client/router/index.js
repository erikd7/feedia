import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/login/Login.vue";
import Feed from "../components/feed/Feed.vue";
import Library from "../components/library/Library.vue";
import Find from "../components/find/Find.vue";
import Details from "../components/details/Details.vue";
import { ROUTES } from "../util/constants/navigation";
import {
  parseToken,
  authenticate,
  getSetUserInfo,
  redirectToRoot,
  renameTitle,
  updateRouteStore
} from "./guards";

export const routes = [
  {
    name: "Login",
    path: ROUTES.LOGIN,
    alias: ROUTES.ROOT,
    component: Login,
    hideTab: true,
    meta: {
      requireAuth: false
    }
  },
  {
    name: "Discover",
    path: ROUTES.FEED,
    component: Feed
  },
  {
    name: "Library",
    path: ROUTES.LIBRARY,
    component: Library
  },
  {
    name: "Find",
    path: ROUTES.FIND,
    alias: ROUTES.SEARCH,
    component: Find
  },
  {
    name: "Details",
    path: ROUTES.DETAILS + "/:mediaType/:id",
    component: Details,
    props: true,
    hideTab: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  parseToken(to, _from, next, router);
});

router.beforeEach(authenticate);

router.beforeEach(getSetUserInfo);

router.beforeEach((to, _from, next) => {
  redirectToRoot(to, _from, () => renameTitle(to, _from, next));
});

router.afterEach(to => {
  updateRouteStore(to);
});

export default router;
