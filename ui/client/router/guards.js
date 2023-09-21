//Navigation Guards https://router.vuejs.org/guide/advanced/navigation-guards.html
import store from "../store/store";
import { getLocalToken, validate as validateToken } from "../util/auth/token";
import { ROUTES } from "../util/constants/navigation";

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

//Auth guard to parse token from URL or local storage, store it, and remove it from the URL
export function parseToken(to, _from, next, router) {
  let token;

  //Pull token off of query params
  if (to.query.token) {
    token = to.query.token;

    //Remove token from query params
    const cleanRoute = { ...to };
    delete cleanRoute.query.token;
    router.replace(cleanRoute);
  } else {
    //Pull token from local storage
    const localStorageToken = getLocalToken();
    if (localStorageToken) {
      token = localStorageToken;
    }
  }

  //Save token in store (also saves in local storage)
  if (token) {
    store.dispatch("user/setToken", token);
  }

  next();
}

//Block access to restricted routes if no token
export async function authenticate(to, _from, next) {
  //If doesn't require auth (defaults to require auth)
  if (to.matched.some(route => route.meta.requireAuth === false)) {
    next();
  }

  //If token is valid
  const isTokenValid = await store.dispatch("user/getIsTokenValid");

  //Validate token
  if (isTokenValid) {
    next();
  }

  //Redirect to the login page
  next(ROUTES.LOGIN);
}
