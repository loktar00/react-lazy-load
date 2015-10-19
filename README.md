## React Lazy Load Component

Really simple component that renders children elements when they enter the viewport.

## Install

```
npm install --save react-lazy-load
```

## Usage

```jsx
import React from 'react';
import LazyLoad from 'react-lazy-load';

class MyComponent {
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