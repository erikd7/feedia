//Navigation Guards https://router.vuejs.org/guide/advanced/navigation-guards.html
import store from "../store/store";
import { getLocalToken } from "../util/auth/token";
import {
  signIn,
  validate,
  getLocalUserInfo,
  setLocalUserInfo
} from "../util/auth/actions";
import { ROUTES } from "../util/constants/navigation";
import { getUserInfo } from "../http-clients/user";
import { APP_NAME } from "../util/constants/base";

export function redirectToRoot(to, _from, next) {
  if (to.matched.length === 0) {
    next("/");
  } else {
    next();
  }
}

export function renameTitle(to, _from, next) {
  document.title = `${APP_NAME} | ${to.name}`;
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

  //Use token to sign in
  signIn(token);

  next();
}

//Block access to restricted routes if no token
export function authenticate(to, _from, next) {
  //If doesn't require auth (defaults to require auth)
  if (to.matched.some(route => route.meta.requireAuth === false)) {
    next();
  }

  //If token is valid
  const isTokenValid = validate();

  //Validate token
  if (isTokenValid) {
    next();
  } else {
    //Redirect to the login page
    next(ROUTES.LOGIN);
  }
}

//Get user info if not already in local storage
export function getSetUserInfo(_to, _from, next) {
  //Get existing user info from local storage
  const localUser = getLocalUserInfo();

  //Get user info from API if not in local storage
  if (!localUser) {
    getUserInfo().then(userInfo => {
      //Set retrieved user info in local storage
      setLocalUserInfo(userInfo);
      //Set store value
      store.dispatch("user/setUser", userInfo);
    });
  }

  store.dispatch("user/setUser", localUser);

  next();
}
