var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

module.exports = {
  devtool: 'inline-source-map',
  entry: fs.readdirSync(__dirname).reduce(function (entries, dir) {
    var isDraft = dir.charAt(0) === '_';

    if (!isDraft && isDirectory(path.join(__dirname, dir))) {
      entries[dir] = path.join(__dirname, dir, 'index.js');
    }

    return entries;
  }, {}),
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader?stage=0', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  output: {
    path: 'examples/__build__',
    filename: '[name].js',
    publicPath: '/__build__/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react-lazy-load': path.resolve(__dirname + './../src/LazyLoad'),
    },
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ],
};