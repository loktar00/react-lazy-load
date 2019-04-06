import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { add, remove } from 'eventlistener';
import {debounce, throttle} from 'lodash';

import parentScroll from './utils/parentScroll';
import inViewport from './utils/inViewport';

var _testId = 1;

export default class LazyLoad extends Component {
  constructor(props) {
    super(props);

    this.lazyLoadHandler = this.lazyLoadHandler.bind(this);

    if (props.throttle > 0) {
      if (props.debounce) {
        this.lazyLoadHandler = debounce(this.lazyLoadHandler, props.throttle);
      } else {
        this.lazyLoadHandler = throttle(this.lazyLoadHandler, props.throttle);
      }
    }

    this.state = { visible: false };
    this.testID = ++_testId;
  }

    

  componentDidMount() {
    this._mounted = true;
    const eventNode = this.getEventNode();

    this.lazyLoadHandler();

    if (this.lazyLoadHandler.flush) {
      this.lazyLoadHandler.flush();
    }

    add(window, 'resize', this.lazyLoadHandler);
    add(eventNode, 'scroll', this.lazyLoadHandler);
  }

  componentWillReceiveProps() {
    if (!this.state.visible) {
      this.lazyLoadHandler();
    }
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return nextState.visible;
  }

  componentWillUnmount() {

    //console.debug('[lazy-load]', this.testID, 'componentWillUnmount');

    this._mounted = false;
    if (this.lazyLoadHandler.cancel) {
      this.lazyLoadHandler.cancel();
    }

    this.detachListeners();
  }

  getEventNode() {
    return parentScroll(findDOMNode(this));
  }

  getOffset() {
    const {
      offset, offsetVertical, offsetHorizontal,
      offsetTop, offsetBottom, offsetLeft, offsetRight, threshold,
    } = this.props;

    const _offsetAll = threshold || offset;
    const _offsetVertical = offsetVertical || _offsetAll;
    const _offsetHorizontal = offsetHorizontal || _offsetAll;

    return {
      top: offsetTop || _offsetVertical,
      bottom: offsetBottom || _offsetVertical,
      left: offsetLeft || _offsetHorizontal,
      right: offsetRight || _offsetHorizontal,
    };
  }

  lazyLoadHandler() {
    if (!this._mounted) {
      return;
    }
    const offset = this.getOffset();
    const node = findDOMNode(this);
    const eventNode = this.getEventNode();

    const { onContentVisible, unmountIfInvisible } = this.props;
    const {visible} = this.state;

    const isInViewPort =  inViewport(node, eventNode, offset);

    //console.debug('[lazy-load]', this.testID, 'isInViewPort->',isInViewPort);

    if (isInViewPort) {
    
        if(!visible){
            //console.debug('[lazy-load]', this.testID, 'setting Visible : true');
            this.setState({ visible: true }, () => {
                if (onContentVisible) {
                    onContentVisible();
                }
            });
        }
        
        if(!unmountIfInvisible)
            this.detachListeners();
    }else{
        
        if(unmountIfInvisible && visible){
            //console.debug('[lazy-load]', this.testID, 'setting Visible : false');
            this.setState({ visible: false });

            //we need to force update cause the compononeis outside ViewPort so render won;t be called
            this.forceUpdate();
        }
    }
        
  }

  detachListeners() {
    const eventNode = this.getEventNode();
    //console.debug('[lazy-load]', this.testID, 'detachListeners');

    remove(window, 'resize', this.lazyLoadHandler);
    remove(eventNode, 'scroll', this.lazyLoadHandler);
  }

  render() {
    const { children, className, height, width } = this.props;
    const { visible } = this.state;

    //console.debug('[lazy-load]', this.testID, 'Render: ', visible);

    const elStyles = { height, width };
    const elClasses = (
      'LazyLoad' +
      (visible ? ' is-visible' : '') +
      (className ? ` ${className}` : '')
    );

    return React.createElement(this.props.elementType, {
      className: elClasses,
      style: elStyles,
    }, visible && Children.only(children));
  }
}

LazyLoad.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  debounce: PropTypes.bool,
  elementType: PropTypes.string,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  offset: PropTypes.number,
  offsetBottom: PropTypes.number,
  offsetHorizontal: PropTypes.number,
  offsetLeft: PropTypes.number,
  offsetRight: PropTypes.number,
  offsetTop: PropTypes.number,
  offsetVertical: PropTypes.number,
  threshold: PropTypes.number,
  throttle: PropTypes.number,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onContentVisible: PropTypes.func,
  unmountIfInvisible: PropTypes.bool
};

LazyLoad.defaultProps = {
  elementType: 'div',
  debounce: true,
  offset: 0,
  offsetBottom: 0,
  offsetHorizontal: 0,
  offsetLeft: 0,
  offsetRight: 0,
  offsetTop: 0,
  offsetVertical: 0,
  throttle: 250,
  unmountIfInvisible: false
};
