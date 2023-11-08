import axios from "axios";
import { getLocalToken } from "./auth/token";

const defaultHeaders = {};
const getAuthHeaderString = token => `Bearer ${token}`;
const getAuthHeaders = (useTokenAuth, token = getLocalToken()) => {
  if (useTokenAuth)
    return {
      Authorization: getAuthHeaderString(token)
    };
};
const http = axios.create({
  headers: {
    common: defaultHeaders
  }
});

// Axios method wrappers
export const get = (...args) => getter(true, ...args);
export const getNoAuth = (...args) => getter(false, ...args);
const getter = async (
  useTokenAuth,
  host,
  paths,
  queryParams,
  { responseType = "json" } = {}
) => {
  let url;
  try {
    url = urlBuilder(host, paths, queryParams);
    const response = await http.get(url, {
      params: queryParams,
      responseType,
      headers: getAuthHeaders(useTokenAuth)
    });

    return responseHandler(response);
  } catch (error) {
    console.error(`Error in axios GET at url '${url}'. Message: ${error}`);
    return { ok: false, message: error.message };
  }
};

export const post = (...args) => poster(true, ...args);
const poster = async (useTokenAuth, host, paths, body, queryParams) => {
  let url;
  try {
    url = urlBuilder(host, paths, queryParams);
    const response = await http.post(url, body, {
      headers: getAuthHeaders(useTokenAuth)
    });

    return responseHandler(response);
  } catch (error) {
    console.error(`Error in axios POST at url '${url}'. Message: ${error}`);
    return { ok: false, message: error.message };
  }
};

export const patch = (...args) => patcher(true, ...args);
const patcher = async (useTokenAuth, host, paths, body, queryParams) => {
  let url;
  try {
    url = urlBuilder(host, paths, queryParams);
    const response = await http.patch(url, body, {
      headers: getAuthHeaders(useTokenAuth)
    });

    return responseHandler(response);
  } catch (error) {
    console.error(`Error in axios PATCH at url '${url}'. Message: ${error}`);
    return { ok: false, message: error.message };
  }
};

export const put = (...args) => putter(true, ...args);
const putter = async (useTokenAuth, host, paths, body, queryParams) => {
  let url;
  try {
    url = urlBuilder(host, paths, queryParams);
    const response = await http.put(url, body, {
      headers: getAuthHeaders(useTokenAuth)
    });

    return responseHandler(response);
  } catch (error) {
    console.error(`Error in axios PUT at url '${url}'. Message: ${error}`);
    return { ok: false, message: error.message };
  }
};

export const urlBuilder = (host, paths = [], queryParams = {}) => {
  let url = host;

  //Add paths (replace multiple slashes with one slash)
  const path = ("/" + paths.join("/")).replace(/\/+/g, "/");

  url += path;

  //Add query params
  if (Object.keys(queryParams).length > 0) {
    url += "?";
    url += Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  return url;
};

const responseHandler = response => {
  if (response.status === 200 || response.status === 204) {
    if (response.data) {
      return { ok: true, data: response.data };
    } else {
      return {
        ok: true,
        data: []
      };
    }
  }

  return { ok: false, message: response.message };
};
