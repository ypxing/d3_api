var path = require("path")

module.exports = {
  entry: path.join(__dirname, "src", "entry.js"),
  output: {
      path: path.join(__dirname, "build"),
      filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.coffee', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=react,presets[]=es2015'
      }
    ]
  }
};
