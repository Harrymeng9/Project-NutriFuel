var path = require("path");
var SRC_DIR = path.join(__dirname, "/MainApp/client/src");
var DIST_DIR = path.join(__dirname, "/MainApp/client/dist");

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(?:jsx|mjs|cjs|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  }
};