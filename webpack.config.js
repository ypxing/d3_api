var path = require("path")

module.exports = {
  entry: ['webpack-dev-server/client?http://0.0.0.0:3003', 'webpack/hot/only-dev-server', path.join(__dirname, "src", "entry.js")],
  output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.coffee', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
      }
    ]
  }
};
