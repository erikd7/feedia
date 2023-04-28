const express = require("express");

const app = express();

// Proxy requests to /api to http://example.com/api
app.use((_req, _res, next) => {
  console.log(`server coming thru 4000`); /* //!DELETE */
  next();
});

app.use((_req, res) => {
  res.status(204).send();
});

// Start the server
app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
