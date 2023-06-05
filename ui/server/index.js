const express = require("express");
const setupProxy = require("./proxy.js");
const path = require("path");

const setupTmdbProxy = require("./external-proxy/tmdb.js");

const app = express();

const staticPath = path.join(__dirname, "../dist");

// Serve static files
app.use(express.static(staticPath));

//External proxies
setupTmdbProxy(app);

//Proxy requests to /api with CORS
setupProxy(app);

// Start the server
app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
