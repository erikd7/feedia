import proxy from "express-http-proxy";

const defaultProxyOptions = {
  changeOrigin: true,
  userResDecorator: (proxyRes, proxyResData, req) => {
    try {
      console.log(
        `Proxied from\t${req.originalUrl}\n\tto ${proxyRes.headers.location}`
      );
    } catch {
      console.log("Failed to log proxy information.");
    }

    return proxyResData;
  }
};

const createProxy =
  (redirectUrl, proxyOptions = {}) =>
  (req, res, next) => {
    proxy(redirectUrl, { ...defaultProxyOptions, ...proxyOptions })(
      req,
      res,
      next
    );
  };

const useProxy = (app, pathMatch, redirectUrl, proxyOptions) => {
  app.use(pathMatch, createProxy(redirectUrl, proxyOptions));
};

export default useProxy;
