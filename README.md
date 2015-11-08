React Lazy Load Component
=========================

Really simple component that renders children elements when they enter the viewport.

[![Dependency Status](https://david-dm.org/loktar00/react-lazy-load.svg?style=flat-square)](https://david-dm.org/loktar00/react-lazy-load)
[![NPM downloads](https://img.shields.io/npm/dm/react-lazy-load.svg?style=flat-square)](https://www.npmjs.com/package/react-lazy-load)

## Installation
React Lazy Load requires **React 0.14 or later.**

```
npm install --save react-lazy-load
```

## Usage

```jsx
import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

class MyComponent extends Component {
  render() {
    return (
      <LazyLoad>
        <div>some content</div>
      </LazyLoad>
    );
  }
}
```

## Props

### height={String|Number}

This is used to set the elements height even when it contains no content.

```jsx
<LazyLoad height={100}>
  <div>some content</div>
</LazyLoad>
```

### threshold={Number}

By default content is loaded when it appears on the screen. If you want content to load earlier use threshold parameter. Setting threshold to 200 causes image to load 200 pixels before it appears on viewport.

```jsx
<LazyLoad threshold={200}>
  <div>some content</div>
</LazyLoad>
```
