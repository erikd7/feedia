#!/usr/bin/env node
import app from "../app";
import buildDeps from "../config/deps";
import debug from "debug";
import http from "http";

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

buildDeps(app).then(() => {
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  console.log(`Listening on port ${port}...`);
});

//Normalize a port into a number, string, or false
function normalizePort(val: any) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

//Event listener for HTTP server "error" event.
function onError(error: Error) {
  //@ts-ignore
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  //@ts-ignore
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

//Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  //@ts-ignore
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
