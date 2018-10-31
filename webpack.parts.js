const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 抽离css 用于生产环境
exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].css",
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