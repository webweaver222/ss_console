const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = (env = {}) => {
  const { mode = "development" } = env;

  const isProd = mode === "production";
  const isDev = mode === "development";

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: "webConsole",
        template: "public/index.html",
      }),
    ];

    if (isProd)
      plugins.push(new MiniCssExtractPlugin({ filename: "main-[hash:8].css" }));

    return plugins;
  };

  return {
    mode: isProd ? "production" : isDev && "development",

    output: {
      path: require("path").resolve(__dirname, "build"),
      filename: isProd ? "main-[hash:8].js" : undefined,
      publicPath: "/console/",
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        //loading images
        {
          test: /\.(png|jpg|gif|ico|jpeg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[name]-[sha1:hash:7].[ext]",
              },
            },
          ],
        },
        // loading fonts
        {
          test: /\.(ttf|otf|eof|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts",
                name: "[name].[ext]",
              },
            },
          ],
        },
        //loading css
        {
          test: /\.css$/,
          use: getStyleLoaders(),
        },
        //loading sass
        {
          test: /\.s[ca]ss$/,
          use: [...getStyleLoaders(), "sass-loader"],
        },
      ],
    },

    plugins: getPlugins(),

    devServer: {
      //host: '0.0.0.0',
      //disableHostCheck: true,
      open: true,
      port: 8000,
      historyApiFallback: true,
      contentBase: isProd ? "./build" : "./",
      hot: true,
      openPage: "",
    },
  };
};
