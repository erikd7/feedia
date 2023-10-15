import useProxy from "./proxy-helper.mjs";
import config from "./config.mjs";

const { host, proxyPath } = config.api;

export default function setupInternalProxy(app) {
  useProxy(app, proxyPath, host);
}
