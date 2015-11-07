import './style.css'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazy-load';

class Application extends Component {
  render() {
    return (
      <div>
        Scroll to load images.
        <div className="filler" />
        <LazyLoad height={762} threshold={100}>
          <img src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg' />
        </LazyLoad>
        <div className="filler" />
        <LazyLoad height={683}>
          <img src='http://apod.nasa.gov/apod/image/1502/2015_02_20_conj_bourque1024.jpg' />
        </LazyLoad>
        <div className="filler" />
        <LazyLoad height={480}>
          <img src='http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif' />
        </LazyLoad>
        <div className="filler" />
        <LazyLoad height={720}>
          <img src='http://apod.nasa.gov/apod/image/1502/ToadSky_Lane_1080_annotated.jpg' />
        </LazyLoad>
        <div className="filler" />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('root'));