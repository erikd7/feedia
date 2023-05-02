const proxy = require("express-http-proxy");
const cors = require("cors");

const url = "http://localhost:4000";

module.exports = function setupProxy(app) {
  //Proxy requests to /api with CORS
  app.use("/api", proxy(url), cors());
};
