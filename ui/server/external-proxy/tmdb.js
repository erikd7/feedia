const proxy = require("express-http-proxy");

const url = "https://api.themoviedb.org";

const tmdbProxy = (req, res, next) => {
  console.log(`Proxying request from ${req.originalUrl} to ${url}.`);

  proxy(url, {
    proxyReqOptDecorator: function (proxyReqOpts) {
      proxyReqOpts.headers.Authorization = "Bearer " + process.env.TMDB_TOKEN; //Add auth header

      return proxyReqOpts;
    }
  })(req, res, next);
};

module.exports = function setupTmdbProxy(app) {
  app.use("/api/tmdb", tmdbProxy);
};
