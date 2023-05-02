const express = require("express");
const { proxyMiddleware, corsMiddleware } = require("./proxy.js");
const path = require("path");

const app = express();

const staticPath = path.join(__dirname, "../dist");

// Serve static files
app.use(express.static(staticPath));

//Proxy requests to /api with CORS
app.use("/api", proxyMiddleware, corsMiddleware);

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
