const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  devtool: "source-map",

  devServer: {
    static: "./dist",
    port: 8081,
    open: true,
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "SkyCast Weather App",
    }),
    // Reads VISUAL_CROSSING_API_KEY from .env (or system env vars, e.g. in CI)
    new Dotenv({
      systemvars: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
