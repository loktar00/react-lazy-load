import React from 'react';
import LazyLoad from 'react-lazy-load';

import './style.css';

const App = () => (
    <main className="main-container">
        <h1>Basic Examples, Scroll to load images.</h1>
        <LazyLoad width={1024} height={762} threshold={0.99}>
            <img src="http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg" alt="feb 20" />
        </LazyLoad>
        <LazyLoad height={683}>
            <img src="http://apod.nasa.gov/apod/image/1502/2015_02_20_conj_bourque1024.jpg" alt="2015" />
        </LazyLoad>
        <h2>Testing within an internal container</h2>
        <div className="scrollable-container">
            <LazyLoad height={480}>
                <img src="http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif" alt="Mars Plume" />
            </LazyLoad>
        </div>
        <h2>Offset of 300</h2>
        <LazyLoad height={720} offset={300}>
            <img src="http://apod.nasa.gov/apod/image/1502/ToadSky_Lane_1080_annotated.jpg" alt="Toad SKy" />
        </LazyLoad>
        <h2>Horizontal Test, Sroll to the right</h2>
        <div className="horizontal-scroll">
            <LazyLoad height={683}>
                <img src="http://apod.nasa.gov/apod/image/1502/2015_02_20_conj_bourque1024.jpg" alt="Mars Plume" />
            </LazyLoad>
        </div>
    </main>
);

export default App;
