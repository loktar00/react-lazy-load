import express from 'express';
import morgan from 'morgan';

import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import webpackConfig from '../webpack/development';

import config from '../config';
import render from './render';

const application = express();
const compiler = webpack(webpackConfig);

application.set('views', __dirname);
application.set('view engine', 'ejs');
application.use(morgan('combined'));
application.use(express.static(config.STATIC_ASSETS_PATH));
application.use(webpackDev(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true },
}));
application.use(webpackHot(compiler));

application.get('*', render);
application.listen(process.env.PORT || config.PORT);