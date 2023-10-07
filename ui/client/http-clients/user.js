import { get } from "../util/http.js";
import config from "../../config/build.js";

const { proxyPath } = config.api;
const { host } = config.proxy;

const basePath = "/user";

export const getUserInfo = async () => {
  const result = await get(host, [proxyPath, basePath]);
  if (result.ok) {
    return result.data;
  } else {
    throw Error(result.message);
  }
};
