const path = require('path')

module.exports = {
  publicPath: ".",
  outputDir: "./dist",
  assetsDir: "static", // relative to outputDir. Assuming that this works with Flask backend.
  css: {
    loaderOptions: {
      stylus: {
        import: [path.resolve(__dirname, "src/style/index")],
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@img": path.resolve(__dirname, "src/img"),
        "@js": path.resolve(__dirname, "src/js"),
        "@router": path.resolve(__dirname, "src/router"),
        "@store": path.resolve(__dirname, "src/store"),
        "@components": path.resolve(__dirname, "src/components"),
        "@base": path.resolve(__dirname, "src/components/base"),
        "@modules": path.resolve(__dirname, "src/components/modules"),
        "@layouts": path.resolve(__dirname, "src/components/layouts"),
        "@public": path.resolve(__dirname, "src/components/public"),
        "@auth": path.resolve(__dirname, "src/components/public/auth"),
        "@error": path.resolve(__dirname, "src/components/public/error"),
        "@entry": path.resolve(__dirname, "src/components/public/entry"),
        "@legal": path.resolve(__dirname, "src/components/public/legal"),
        "@private": path.resolve(__dirname, "src/components/private"),
      },
    },
  },
};
