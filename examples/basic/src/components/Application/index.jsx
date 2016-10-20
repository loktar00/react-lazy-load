import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

import './style.css';

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

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raf: null,
    };
  }

  componentWillMount() {
    this.setState({raf: onScrollRAF.instance()});
  }

  componentWillUnmount() {
    this.state.raf.cancel();
  }
  render() {
    return (
      <div>
        Scroll to load images.
        <div className="filler" />
          <LazyLoad
            height={362}
            offsetVertical={300}
            setScroll={
              lazyLoadHandler => {
                this.state.raf.scroll(lazyLoadHandler);
              }}
            onContentVisible={() => console.log('I am within the offset from the viewport!')}
            onLoad={() => console.log('I have been lazyloaded!')}
          >

          <img src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg' />
        </LazyLoad>
        <div className="filler" />
      </div>
    );
  }
}

export default Application;
