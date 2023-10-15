import useProxy from "../proxy-helper.mjs";
import config from "../config.mjs";

const { host, proxyPath } = config.external.openLibrary;

export default function setupOpenLibraryProxy(app) {
  useProxy(app, proxyPath, host);
}
