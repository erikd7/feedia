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
        options.compiler = require("vue-template-babel-compiler");
        return options;
      });
  }
};
