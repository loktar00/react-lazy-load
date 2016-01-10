import webpackAsset from './webpackAsset';

export default (req, res) => {
  res.render('template', { webpackAsset });
};