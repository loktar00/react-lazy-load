jest.mock('../utils/inViewport');
jest.mock('../utils/parentScroll');
jest.mock('lodash.debounce');
jest.mock('../utils/deferAnimation');
jest.unmock('../LazyLoad.jsx');
jest.unmock('lodash.throttle');
jest.unmock('eventlistener');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import LazyLoad from '../LazyLoad.jsx';
import { __setVisible, __reset as resetVisible } from '../utils/inViewport';
import { __scroll, __reset as resetScroll } from '../utils/parentScroll';
import { __step, __synchronize } from '../utils/deferAnimation';

describe('LazyLoad', () => {
  beforeEach(() => {
    resetVisible();
    resetScroll();
    __synchronize(false);
  });

  it('doesn\'t load children if it\'s not visible', () => {
    __synchronize();
    const loader = TestUtils.renderIntoDocument(
      <LazyLoad><div>{'Child'}</div></LazyLoad>
    );

    const loaderNode = ReactDOM.findDOMNode(loader);
    expect(loaderNode.textContent).toEqual('');
  });

  it('loads children if it\'s visible', () => {
    __synchronize();
    __setVisible(true);
    const loader = TestUtils.renderIntoDocument(
      <LazyLoad><div>{'Child'}</div></LazyLoad>
    );

    const loaderNode = ReactDOM.findDOMNode(loader);
    expect(loaderNode.textContent).toEqual('Child');
  });

  it('re-evaluates on scroll', () => {
    __synchronize();
    const loader = TestUtils.renderIntoDocument(
      <LazyLoad><div>{'Child'}</div></LazyLoad>
    );
    const loaderNode = ReactDOM.findDOMNode(loader);

    expect(loaderNode.textContent).toEqual('');
    __setVisible(true);
    __scroll();

    expect(loaderNode.textContent).toEqual('Child');
  });

  it('only re-evaluates during requested animation frame', () => {
    const loader = TestUtils.renderIntoDocument(
      <LazyLoad><div>{'Child'}</div></LazyLoad>
    );

    const loaderNode = ReactDOM.findDOMNode(loader);
    __setVisible(true);
    __scroll();

    expect(loaderNode.textContent).toEqual('');

    __step();

    expect(loaderNode.textContent).toEqual('Child');
  });
});
