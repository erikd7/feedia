import { get, post, put } from "../util/http.js";
import config from "../../config/build.js";

const { proxyPath } = config.api;
const { host } = config.proxy;

const basePath = "/title";

export const getTitleInfo = async id => {
  const result = await get(host, [proxyPath, basePath, id]);
  if (result.ok) {
    return result.data; // {[dataSourceKey]: externalId}
  } else {
    throw Error(result.message);
  }
};

export const getTitleIdsByExternalIds = async externalIds => {
  const subPath = "/get-by-external";

  const body = { externalTitles: externalIds };

  const result = await post(host, [proxyPath, basePath, subPath], body);
  if (result.ok) {
    return result.data; // {[dataSourceKey]: externalId}
  } else {
    throw Error(result.message);
  }
};

export const loadTitleByExternalId = async (
  dataSource,
  externalId,
  mediaType,
  title
) => {
  const subPath = "/load-by-external";

  const body = { dataSource, externalId, mediaType, title };

  const result = await post(host, [proxyPath, basePath, subPath], body);
  if (result.ok) {
    return result.data; // {titleId: string}
  } else {
    throw Error(result.message);
  }
};

export const getRatingInfo = async titleId => {
  const subPath = "/rating";

  const result = await get(host, [proxyPath, basePath, titleId, subPath]);
  if (result.ok) {
    return result.data; // {titleId: string}
  } else {
    throw Error(result.message);
  }
};

export const setUserTitleRating = async (titleId, rating) => {
  const subPath = "/rating";
  const body = {
    rating
  };

  const result = await put(host, [proxyPath, basePath, titleId, subPath], body);

  if (result.ok) {
    return result.data; // {titleId, rating, ratings, userRating}
  } else {
    throw Error(result.message);
  }
};
