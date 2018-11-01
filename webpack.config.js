const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const parts = require("./webpack.parts");
const PATHS = {
  app: path.join(__dirname, "src"),
  build:path.join(__dirname, "dist"),
}

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
        template: "./src/index.tpl.html"
      }),
    ]
  },
  // {
  //   optimization: {
  //     splitChunks: {
  //       chunks: "initial",
  //     },
  //   },
  // },
  // parts.loadFont(),
  parts.loadJavaScript({ include: PATHS.app }),
  
]);

const productionConfig = merge([ 
  {
    output: {
      chunkFilename: "[name].[chunkhash:4].js",
      filename: "[name].[chunkhash:4].js",
    },
  },
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix()],
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[hash:4].[ext]",
    },
  }),
  parts.clean(PATHS.build),
  parts.attachRevision(),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true,
    },
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};