const setupProxy = require("./server/proxy");

module.exports = {
  pages: {
    index: {
      title: "Feedia",
      entry: "client/main"
    }
  },
  pwa: {
    name: "Feedia"
  },
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        //options.compiler = require("vue-template-babel-compiler");
        return options;
      });
  },
  devServer: {
    //https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares
    setupMiddlewares: (middlewares, { app }) => {
      setupProxy(app);

      return middlewares;
    }
  }
};
