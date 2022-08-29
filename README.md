React Lazy Load Component
=========================

React Lazy Load is an easy-to-use React component which helps you defer loading content in predictable way. It's fast, You can also use component inside scrolling container, such as div with scrollbar. It will be found automatically. Check out an example.

[![build status](https://img.shields.io/travis/loktar00/react-lazy-load.svg?style=flat-square)](https://travis-ci.org/loktar00/react-lazy-load)
[![npm downloads](https://img.shields.io/npm/dm/react-lazy-load.svg?style=flat-square)](https://www.npmjs.com/package/react-lazy-load)

## 4.0 Update
Converted to work with React 18, and updated to use the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

### Breaking changes
* No more debunce, or throttle options as they aren't needed
* Removed individual offset props, offset can be used just like css margin, eg. `offset={'0px 10px 200px 0px'}` or `offset={100}`

### Improvements
Since we're now using the intersection observer we don't need to watch a user scroll, more importantly we don't have to manually calculate if a user can see the element or not.
Also took this oppourtunity to convert over to TS.

## Installation
React Lazy Load requires **React 17 or later.**

```
npm i -S react-lazy-load
```

## Examples
* [In Repo](https://github.com/loktar00/react-lazy-load/tree/master/examples/basic)

## Examples

### Basic Usage
```jsx
import React from 'react';
import LazyLoad from 'react-lazy-load';

const MyComponent = () => (
  <div>
    <LazyLoad height={762}>
      <img src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg' />
    </LazyLoad>
  </div>
)
```

### Loading the image 300px prior to scroll

```jsx
const MyComponent = () => (
  <div>
    <LazyLoad height={762} offset={300}>
      <img src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg' />
    </LazyLoad>
  </div>
)
```

### Loading image only when 95% of it is in the viewport. **note** a width must be specified.

```jsx
const MyComponent = () => (
  <div>
    <LazyLoad height={762} width={400} threshold={0.95}>
      <img src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg' />
    </LazyLoad>
  </div>
)
```

### Performing a side effect once your image is loaded

```jsx
const MyComponent = () => (
  <div>
    <LazyLoad height={762} width={400} threshold={0.95} onContentVisible={() => {console.log('loaded!')}}>
      <img src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg' />
    </LazyLoad>
  </div>
)
```


### Example controlling element transition

There are two primary classes you an use to control the component `LazyLoad` and `is-visible`


```css
/* Example of how to fade our content in */

.LazyLoad {
  opacity: 0;
  transition: all 1s ease-in-out;
}

.is-visible {
  opacity: 1;
}
```

## Props

#### offset
Type: `Number|String` Default: `0`

The `offset` option allows you to specify how far below, above, to the left, and to the right of the viewport you want to _begin_ displaying your content. If you specify `0`, your content will be displayed as soon as it is visible in the viewport, if you want to load _1000px_ below or above the viewport, use `1000`.

#### threshold
Type: `Number` Default: `0`

This `threshold` option allows you to specify how much of the element must be shown on the screen prior to loading. This requires a _width_ and _height_ to be set on the `<LazyLoad>` component in order for the browser to calcualte the viewable area.

#### height
Type: `String|Number`

The `height` option allows you to set the element's height even when it has no content.

#### width
Type: `String|Number`

The `width` option allows you to set the element's width even when it has no content.

#### onContentVisible
Type `Function`

A callback function to execute when the content appears on the screen.


## Building LazyLoad

```
npm run build
```

## Running examples

```
cd examples/basic
npm run dev
```



