const proxy = require("express-http-proxy");

const url = "https://api.themoviedb.org";

module.exports = (req, res, next) => {
  console.log(`Proxying request from ${req.originalUrl} to ${url}.`);

  proxy(url, {
    proxyReqOptDecorator: function (proxyReqOpts) {
      proxyReqOpts.headers.Authorization = "Bearer " + process.env.TMDB_TOKEN; //Add auth header

      console.log(`headers are now`, proxyReqOpts.headers); /* //!DELETE */
      return proxyReqOpts;
    }
  })(req, res, next);
};
