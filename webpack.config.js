var webpack = require('webpack');
var path = require('path');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react',
};

var reactDOMExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom',
}

module.exports = {
  entry: ['./src/LazyLoad.jsx'],
  output: {
    library: 'LazyLoad',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    filename: 'LazyLoad.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?stage=0',
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: {
    'react': reactExternal,
    'react-dom': reactDOMExternal,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.DedupePlugin(),
  ]
}