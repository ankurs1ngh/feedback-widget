module.exports = {
    entry: "./src/FeedbackWidget.js",
    output: {
      filename: "widget.bundle.js",
      path: __dirname + "/public",
      library: "FeedbackWidget", // This exposes the module globally
      libraryTarget: "umd", // Ensures compatibility across different environments
    },
    mode: "production",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
  };
  