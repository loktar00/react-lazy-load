const onScrollRAF = {
  instance: () => {
    let _requestAnimationFrame = window.requestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.msRequestAnimationFrame
      || window.oRequestAnimationFrame
      // IE fallback
      || function(cb) {
        window.setTimeout(cb, 1000 / 60);
      };

    /* eslint-disable no-param-reassign */
    const doCallbackIfScrolled = ({
      callback,
      lastPos,
    }) => {
      const pageY = window.pageYOffset;
      // call self on next frame if scroll pos unchanged
      if (lastPos === pageY) {
        // cond to term loop if instance().stop called
        if (_requestAnimationFrame) {
          return _requestAnimationFrame(
            doCallbackIfScrolled.bind(null, {callback, lastPos})
          );
        }
        return void 0;
      }
      // reassign to current scroll pos
      lastPos = pageY;
      // call the work func
      if (_requestAnimationFrame) {
        callback();
      }

      // cond to term loop if instance().stop called
      if (_requestAnimationFrame) {
        return _requestAnimationFrame(
          doCallbackIfScrolled.bind(null, {callback, lastPos})
        );
      }
      return void 0;
    };

    const scroll = callback => {
      // initiate to non-zero so work func runs on scroll pos 0
      const startPos = -1;
      // start the RAF loop
      doCallbackIfScrolled({callback, lastPos: startPos});
    };

    const stop = () => {
      _requestAnimationFrame = null;
    };

    return {
      scroll,
      stop,
    };
  },
};

export default onScrollRAF;
