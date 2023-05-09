//Navigation Guards https://router.vuejs.org/guide/advanced/navigation-guards.html
import store from "../store/store";

export function redirectToRoot(to, _from, next) {
  if (to.matched.length === 0) {
    next("/");
  } else {
    next();
  }
}

export function renameTitle(to, _from, next) {
  document.title = `Feedia | ${to.name}`;
  next();
}

export function updateRouteStore(to) {
  store.dispatch("navigation/setCurrentRoute", to.path);
}
