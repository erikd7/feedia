import useProxy from "./proxy-helper.mjs";
import config from "./config.mjs";

const { host, proxyPath } = config.api;

const proxyOptions = {};

export default function setupTmdbProxy(app) {
  useProxy(app, proxyPath, host, proxyOptions);
}