import config from '../config';

export default (asset, extension) =>
  `${config.ASSETS_PUBLIC_PATH}/${asset}.${extension}`