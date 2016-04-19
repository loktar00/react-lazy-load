jest.mock('../utils/inViewport');
jest.mock('../utils/parentScroll');
jest.mock('lodash.debounce');
jest.unmock('manage-scroll-handlers');
jest.unmock('../LazyLoad.jsx');
jest.unmock('lodash.throttle');

// create a mock for requestAnimationFrame

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import LazyLoad from '../LazyLoad.jsx';
import { __setVisible, __reset as resetVisible } from '../utils/inViewport';
import { __scroll } from '../utils/parentScroll';

describe('LazyLoad', () => {
  beforeEach(() => {
    resetVisible();
  });

  it('doesn\'t load children if it\'s not visible', () => {
    const loader = TestUtils.renderIntoDocument(
      <LazyLoad><div>{'Child'}</div></LazyLoad>
    );

    const loaderNode = ReactDOM.findDOMNode(loader);
    expect(loaderNode.textContent).toEqual('');
  });

  it('loads children if it\'s visible', () => {
    __setVisible(true);
    const loader = TestUtils.renderIntoDocument(
      <LazyLoad><div>{'Child'}</div></LazyLoad>
    );

    const loaderNode = ReactDOM.findDOMNode(loader);
    expect(loaderNode.textContent).toEqual('Child');
  });

  it('re-evaluates on scroll', () => {
    const loader = TestUtils.renderIntoDocument(
      <LazyLoad><div>{'Child'}</div></LazyLoad>
    );
    const loaderNode = ReactDOM.findDOMNode(loader);

    expect(loaderNode.textContent).toEqual('');
    __setVisible(true);
    __scroll();
    jest.runAllTimers();

    expect(loaderNode.textContent).toEqual('Child');
  });
});
