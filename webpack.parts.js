const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require(
  "optimize-css-assets-webpack-plugin"
);
const cssnano = require("cssnano");

// 抽离css 用于生产环境
exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].[contenthash:4].css",
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: [    //使用抽离css
            MiniCssExtractPlugin.loader,
          ].concat(use),
        },
        {
          test:/\.(sass|scss)$/,
          use: [  //使用抽离 sass 
            MiniCssExtractPlugin.loader,
          ].concat(['css-loader','sass-loader'])
        },
      ],
    },
    plugins: [plugin],
  };
};
// 配置server
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: false,
    overlay: true,
  },
});
// 加载css
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ["style-loader", "css-loader"],
      },
      {
        test:/\.(sass|scss)$/,
        use:['style-loader','css-loader','sass-loader']
      },

    ],
  },
});
exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
});
// 加载图片
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options,
        },
      },
    ],
  },
});
// 加载字体
exports.loadFont = ({ include, exclude, options } = {}) => ({
  module: {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: "url-loader",
      options: {
        // Limit at 50k. Above that it emits separate files
        limit: 50000,
        mimetype: "application/font-woff",
        // Output below fonts directory
        name: "./fonts/[name].[ext]",
      }
    },
  },
});
// 加载js
exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use:[
          {
            loader: "babel-loader",
            // options: {
            //   presets: ['react', 'stage-0', ['es2015', { modules: false }]]
            // }
          }
        ]
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});
// 清理dist 文件夹 每次 build  删除dist 重新生成
exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])],
});
  // 版本号 生成
exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});
// 压缩
exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [new UglifyWebpackPlugin({ sourceMap: true })],
  },
});
// 压缩css
exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

// 多页应用 用到了在配置  大功告成