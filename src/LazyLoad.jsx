import React, { Children, Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import { add, remove } from 'eventlistener';
import debounce from 'lodash.debounce';

import inView from './utils/inView';

class LazyLoad extends Component {
  constructor(props) {
    super(props);

    if (props.debounce) {
      this.lazyLoadHandler = debounce(this.lazyLoadHandler, props.throttle).bind(this);
    } else {
      this.lazyLoadHandler = this.lazyLoadHandler.bind(this);
    }

    this.state = {
      visible: false,
    };
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return nextState.visible;
  }
  componentDidMount() {    
    const eventNode = this.getEventNode();

    add(window, 'resize', this.lazyLoadHandler);
    add(eventNode, 'scroll', this.lazyLoadHandler);
  }
  componentWillUnmount() {
    this.detachListeners();
  }
  getEventNode() {
    return this.props.eventNode || window;
  }
  getOffset() {
    const {
      offset, offsetVertical, offsetHorizontal,
      offsetTop, offsetBottom, offsetLeft, offsetRight,
    } = this.props;

    const _offsetAll = offset;
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
    const offset = this.getOffset();
    const node = findDOMNode(this);
    const eventNode = this.getEventNode();
    const innerHeight = eventNode === window ? eventNode.innerHeight : eventNode.clientHeight;
    const innerWidth = eventNode === window ? eventNode.innerWidth : eventNode.clientWidth;

    const view = {
      left: 0 - offset.left,
      top: 0 - offset.top,
      bottom: innerHeight + offset.bottom,
      right: innerWidth + offset.right,
    };

    if (inView(node, view)) {
      const { onContentVisible } = this.props;

      this.setState({ visible: true });
      this.detachListeners();

      if (onContentVisible) {
        onContentVisible();
      }
    }
  }
  detachListeners() {
    const eventNode = this.getEventNode();

    remove(window, 'resize', this.lazyLoadHandler);
    remove(eventNode, 'scroll', this.lazyLoadHandler);
  }
  render() {
    const { children, height, width } = this.props;
    const { visible } = this.state;

    const elStyles = { height, width };
    const elClasses = 'LazyLoad' + (visible ? ' is-visible' : '');

    return (
      <div className={elClasses} style={elStyles}>
        {visible && Children.only(children)}
      </div>
    );
  }
}

LazyLoad.propTypes = {
  children: PropTypes.node.isRequired,
  debounce: PropTypes.bool,
  eventNode: PropTypes.any,
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
  onContentVisible: PropTypes.func,
  throttle: PropTypes.number,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

LazyLoad.defaultProps = {
  debounce: true,
  offset: 0,
  offsetBottom: 0,
  offsetHorizontal: 0,
  offsetLeft: 0,
  offsetRight: 0,
  offsetTop: 0,
  offsetVertical: 0,
  throttle: 250,
};

export default LazyLoad;
