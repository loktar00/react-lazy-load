import path from 'path';
import webpack from 'webpack';

import common from './common';
import config from '../config';

common.module.loaders.push({
  test: /\.css$/,
  loaders: ['style-loader', 'css-loader', 'postcss-loader'],
  include: common.root,
});

export default {
  devtool: 'eval',

  postcss: common.postcss,

  entry: {
    vendor: common.entry.vendor,
    bundle: ['webpack-hot-middleware/client', common.entry.bundle],
  },

  output: {
    path: path.join(process.cwd(), 'tmp/webpack'),
    filename: '[name].js',
    chunkFilename: '[id]-[name].js',
    publicPath: config.ASSETS_PUBLIC_PATH + '/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  ],

  resolve: common.resolve,

  module: common.module,
};