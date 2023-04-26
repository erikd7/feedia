const proxy = require("express-http-proxy");
const cors = require("cors");

module.exports = function setupProxy(app) {
  //Proxy requests to /api with CORS
  app.use("/api", proxy("http://localhost:4000"), cors());
};
