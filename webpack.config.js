var path = require('path');
var webpack = require('webpack');
var jquery = require('jquery');

module.exports = {
  entry: "./app.js",
  devtool: "source-map",
  output: {
    path: path.resolve("./public"),
    filename: "app.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css", ".json"],
    alias: {
      jquery: jquery,
      $: jquery,
    },
  },
  plugins: [
    //
  ],

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$|.jsx?$/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [require("autoprefixer")],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["./node_modules"],
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 8080,
    host: "localhost",
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    contentBase: "./public",
    open: true,
    proxy: {
      "/api/*": "http://127.0.0.1:5005",
    },
  },
};
