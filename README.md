React Lazy Load Component x
=========================

React Lazy Load X is an easy to use React component which helps you defer loading content in predictable way with extended functionality. A new hook was added to trigger every time the component is within the offset from the viewport, as well as the option to replace the default scroll listener.  It's fast, works in IE8+, 6KB minified and uses debounce function by default. You can also use component inside scrolling container, such as div with scrollbar. It will be found automatically. Check out an example.

## Installation
React Lazy Load X requires  **React 0.14 or later.**

```
npm install --save react-lazy-load-x
```

## Examples
* [Basic](https://github.com/markology/react-lazy-load-x/tree/master/examples/basic)

## Usage

```jsx
import React from 'react';
import LazyLoad from 'react-lazy-load';

const MyComponent = () => (
  <div>
    Scroll to load images.
    <div className="filler" />
    <LazyLoad height={762} offsetVertical={300}>
      <img src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg' />
    </LazyLoad>
    <div className="filler" />
    <LazyLoad height={683} offsetTop={200}>
      <img src='http://apod.nasa.gov/apod/image/1502/2015_02_20_conj_bourque1024.jpg' />
    </LazyLoad>
    <div className="filler" />
    <LazyLoad height={480} offsetHorizontal={50}>
      <img src='http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif' />
    </LazyLoad>
    <div className="filler" />
    <LazyLoad
      height={720}
      onLoad={() => console.log('look ma I have been lazyloaded!')}
      onContentVisible={() => console.log('look pa I am in the viewport!')}
      defaultScrollEvent={false} // false if overriding default scroll
      setScroll={callbackFn} // overrides default scroll implementation
    >
      <img src='http://apod.nasa.gov/apod/image/1502/ToadSky_Lane_1080_annotated.jpg' />
    </LazyLoad>
    <div className="filler" />
  </div>
);
```

## Props

#### offset
Type: `Number|String` Default: `0`

Aliases: `threshold`

The `offset` option allows you to specify how far below, above, to the left, and to the right of the viewport you want to _begin_ displaying your content. If you specify `0`, your content will be displayed as soon as it is visible in the viewport, if you want to load _1000px_ below or above the viewport, use `1000`.

#### offsetVertical
Type: `Number|String` Default: `offset`'s value

The `offsetVertical` option allows you to specify how far above and below the viewport you want to _begin_ displaying your content.

#### offsetHorizontal
Type: `Number|String` Default: `offset`'s value

The `offsetHorizontal` option allows you to specify how far to the left and right of the viewport you want to _begin_ displaying your contet.

#### offsetTop
Type: `Number|String` Default: `offsetVertical`'s value

The `offsetTop` option allows you to specify how far above the viewport you want to _begin_ displaying your content.

#### offsetBottom
Type: `Number|String` Default: `offsetVertical`'s value

The `offsetBottom` option allows you to specify how far below the viewport you want to _begin_ displaying your content.

#### offsetLeft
Type: `Number|String` Default: `offsetVertical`'s value

The `offsetLeft` option allows you to specify how far to left of the viewport you want to _begin_ displaying your content.

#### offsetRight
Type: `Number|String` Default: `offsetVertical`'s value

The `offsetRight` option allows you to specify how far to the right of the viewport you want to _begin_ displaying your content.

#### throttle
Type: `Number|String` Default: `250`

The throttle is managed by an internal function that prevents performance issues from continuous firing of `scroll` events. Using a throttle will set a small timeout when the user scrolls and will keep throttling until the user stops. The default is `250` milliseconds.

#### debounce
Type: `Boolean` Default: `true`

By default the throttling function is actually a [debounce](https://lodash.com/docs#debounce) function so that the checking function is only triggered after a user stops scrolling. To use traditional throttling where it will only check the loadable content every `throttle` milliseconds, set `debounce` to `false`.

#### height
Type: `String|Number` Default: `100`

This is used to set the elements height even when it has no content.

#### defaultScrollEvent
Type: `Boolean` Default: `true`

This is used to set the elements height even when it has no content.

#### setScroll
Type `Function`

Scroll function to replace the default javascript scroll function. ex: requestAnimationFrame

#### onLoad
Type `Function`

A callback function to execute when the content loads for the first time.

#### onContentVisible
Type `Function`

A callback function to execute every time the content enters the screen.
