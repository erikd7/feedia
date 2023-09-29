import { post } from "../util/http.js";
import config from "../../config/build.js";

const { proxyPath } = config.api;
const { host } = config.proxy;

const basePath = "/title";

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
