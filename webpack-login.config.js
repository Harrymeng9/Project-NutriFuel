var path = require("path");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");

module.exports = {
  entry: `${SRC_DIR}/login/index.jsx`,
  output: {
    filename: "bundle.js",
    path: `${DIST_DIR}/login`,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
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