var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var config = Object.create(baseConfig);
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('production'),
  }),
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compressor: {
      screw_ie8: true,
      warnings: false
    },
  }),
];

module.exports = config;