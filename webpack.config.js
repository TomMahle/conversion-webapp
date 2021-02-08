const path = require("path");

module.exports = {
  entry: "./src/Index.jsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "public"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        loader: "babel-loader",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
