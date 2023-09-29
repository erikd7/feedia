import useProxy from "../proxy-helper.mjs";
import config from "../config.mjs";

const { host, proxyPath } = config.external.tmdb;

const proxyOptions = {
  proxyReqOptDecorator: function (proxyReqOpts) {
    proxyReqOpts.headers.Authorization = "Bearer " + process.env.TMDB_TOKEN; //Add auth header

    return proxyReqOpts;
  }
};

export default function setupTmdbProxy(app) {
  useProxy(app, proxyPath, host, proxyOptions);
}
