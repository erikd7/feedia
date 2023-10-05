import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config.mjs";

import setupTmdbProxy from "./external-proxy/tmdb.mjs";
import setupInternalProxy from "./internal-proxy.mjs";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, "../dist");

//Serve static files
app.use(express.static(staticPath));
//Handle all routes by sending the HTML file (makes Vue router work)
app.get("*", (req, res) => {
  res.sendFile(staticPath + "/index.html");
});
//Enable CORS for /api routes
app.use(
  "/api",
  cors({
    origin: config.ui.host,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);

//External proxies
setupTmdbProxy(app);

//Proxy to internal APIs
setupInternalProxy(app);

//Redirect to root
/*app.use((_req, res) => {
  res.redirect("/");
});*/

// Start the server
app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
