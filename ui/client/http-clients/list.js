import { get, put, post, patch } from "../util/http.js";
import config from "../../config/build.js";

const { proxyPath } = config.api;
const { host } = config.proxy;

const basePath = "/user/list";

export const getUserLists = async () => {
  const result = await get(host, [proxyPath, basePath]);
  if (result.ok) {
    return result.data;
  } else {
    throw Error(result.message);
  }
};

export const getList = async id => {
  const result = await get(host, [proxyPath, basePath, id]);
  if (result.ok) {
    return result.data;
  } else {
    throw Error(result.message);
  }
};

export const addTitleToList = async (listId, titleId) => {
  const subpath = "title";
  const body = { titleId };
  const result = await put(host, [proxyPath, basePath, listId, subpath], body);
  if (result.ok) {
    return result.data;
  }
  throw Error(result.message);
};

export const createList = async name => {
  const body = { name };
  const result = await post(host, [proxyPath, basePath], body);
  if (result.ok) {
    return result.data;
  }
  throw Error(result.message);
};

export const updateList = async (id, name) => {
  const body = { name };
  const result = await patch(host, [proxyPath, basePath, id], body);
  if (result.ok) {
    return result.data;
  }
  throw Error(result.message);
};
