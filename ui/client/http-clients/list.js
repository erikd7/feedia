import * as http from "../util/http.js";
import config from "../../config/build.js";
import store from "../store/store";

const { proxyPath } = config.api;
const { host } = config.proxy;

const basePath = "/user/list";

export const getUserLists = async (useCache = true) => {
  if (useCache) {
    const userListsStore = store.getters["list/userLists"];
    console.log(`in http getuserlists`, userListsStore); /* //!DELETE */
    if (userListsStore) {
      return userListsStore;
    }
  }
  const result = await http.get(host, [proxyPath, basePath]);
  if (result.ok) {
    store.dispatch("list/setUserLists", result.data);
    return result.data;
  } else {
    throw Error(result.message);
  }
};

export const getList = async id => {
  const result = await http.get(host, [proxyPath, basePath, id]);
  if (result.ok) {
    return result.data;
  } else {
    throw Error(result.message);
  }
};

export const addTitleToList = async (listId, titleId) => {
  const subpath = "title";
  const body = { titleId };
  const result = await http.put(
    host,
    [proxyPath, basePath, listId, subpath],
    body
  );
  if (result.ok) {
    return result.data;
  }
  throw Error(result.message);
};

export const createList = async name => {
  const body = { name };
  const result = await http.post(host, [proxyPath, basePath], body);
  if (result.ok) {
    return result.data;
  }
  throw Error(result.message);
};

export const updateList = async (id, name) => {
  const body = { name };
  const result = await http.patch(host, [proxyPath, basePath, id], body);
  if (result.ok) {
    return result.data;
  }
  throw Error(result.message);
};

export const deleteList = async id => {
  const result = await http._delete(host, [proxyPath, basePath, id]);
  if (result.ok) {
    return result.data;
  }
  throw Error(result.message);
};
