import React from 'react';
import LazyLoad from 'react-lazy-load';

import './style.css';

const App = () => (
    <div>
        Scroll to load images.
        <div className="filler" />
        <LazyLoad height={762} offsetVertical={300}>
            <img src="http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg" alt="feb 20" />
        </LazyLoad>
        <div className="filler" />
        <LazyLoad height={683} offsetVertical={300}>
            <img src="http://apod.nasa.gov/apod/image/1502/2015_02_20_conj_bourque1024.jpg" alt="2015" />
        </LazyLoad>
        <div className="filler" />
        <div className="scrollable-container">
            <div className="filler" />
            <div className="filler" />
            <div className="filler" />
            <LazyLoad height={480}>
                <img src="http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif" alt="Mars Plume" />
            </LazyLoad>
        </div>
        <div className="filler" />
        <LazyLoad height={720} offsetVertical={300}>
            <img src="http://apod.nasa.gov/apod/image/1502/ToadSky_Lane_1080_annotated.jpg" alt="Toad SKy" />
        </LazyLoad>
        <div className="filler" />
    </div>
);

export default App;
