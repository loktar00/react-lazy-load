import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

import './style.css';

class Application extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Scroll to load images.
        <div className="filler" />
          <LazyLoad
            height={362}
            offsetVertical={300}
            useRAF={true}
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
