import proxy from "express-http-proxy";

const createProxy = (redirectUrl, proxyOptions) => (req, res, next) => {
  console.log(`Proxying request from ${req.originalUrl} to ${redirectUrl}.`);

  proxy(redirectUrl, proxyOptions)(req, res, next);
};

const useProxy = (app, pathMatch, redirectUrl, proxyOptions) => {
  app.use(pathMatch, createProxy(redirectUrl, proxyOptions));
};

export default useProxy;
