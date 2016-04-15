jest.mock('../utils/inViewport');
jest.unmock('../LazyLoad.jsx');
jest.unmock('lodash.debounce');
jest.unmock('lodash.throttle');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import LazyLoad from '../LazyLoad.jsx';
import inViewport from '../utils/inViewport';

describe('LazyLoad', () => {
  it('doesn\'t load children if it\'s not visible', () => {
    const loader = TestUtils.renderIntoDocument(
      <LazyLoad><div>Child</div></LazyLoad>
    );

    const loaderNode = ReactDOM.findDOMNode(loader);
    expect(loaderNode.textContent).toEqual('');
  });

  it('loads children if it\'s visible', () => {
    inViewport.__setVisible(true);
    const loader = TestUtils.renderIntoDocument(
      <LazyLoad><div>Child</div></LazyLoad>
    );

    const loaderNode = ReactDOM.findDOMNode(loader);
    expect(loaderNode.textContent).toEqual('Child');
  });
});
