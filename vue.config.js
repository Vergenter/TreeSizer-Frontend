module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/TreeSizer-Frontend/" : "/",
  configureWebpack: {
    devtool: "source-map"
    // other configuration stuff here
  }
};
