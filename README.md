## React Lazy Load Component

Really simple component that renders children elements when they enter the viewport.

## Install

```
npm install --save react-lazy-load
```

## Usage

```
var React = require('react');

var LazyLoad = require('react-lazy-load')


// In your render

return (
    <LazyLoad>
        <div>some content</div>
    </LazyLoad>;
)

```

## Props

### height="String"

This is used to set the elements height even when it contains no content.

```
<LazyLoad height='100px'>
    <div>some content</div>
</LazyLoad>;
```