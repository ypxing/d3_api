'use strict'
var path = require("path")

var webpack = require('webpack')

module.exports = {
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
  },
  output: {
    library: 'ReactD3Render',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
