import React, { Children, Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { add, remove } from 'eventlistener';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import parentScroll from './utils/parentScroll';
import inViewport from './utils/inViewport';
import onScrollRAF from './utils/RAF.js';

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

    this.state = {
      visible: false,
      readyTrigger: true,
      raf: null,
    };
  }

  componentWillMount() {
    this.setState({raf: onScrollRAF.instance()});
  }

  componentDidMount() {
    const eventNode = this.getEventNode();

    this.lazyLoadHandler();

    if (this.lazyLoadHandler.flush) {
      this.lazyLoadHandler.flush();
    }
    add(window, 'resize', this.lazyLoadHandler);

    if (!this.props.setScroll && this.props.setScroll !== undefined) {
      add(eventNode, 'scroll', this.lazyLoadHandler);
    } else if (!this.props.useRAF) {
      this.props.setScroll(this.lazyLoadHandler);
    } else {
      this.state.raf.scroll(this.lazyLoadHandler);
    }
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
    if (this.lazyLoadHandler.cancel) {
      this.lazyLoadHandler.cancel();
    }
    this.state.raf.cancel();
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
    const offset = this.getOffset();
    const node = findDOMNode(this);
    const eventNode = this.getEventNode();
    const inView = inViewport(node, eventNode, offset);

    if (this.state.readyTrigger) {
      if (inView) {
        this.triggerOnContentVisible(false);
        if (!this.state.visible) {
          this.triggerOnLoad();
        }
      }
    } else {
      if (!inView) {
        this.triggerOnContentVisible(true);
      }
    }
  }

  triggerOnLoad() {
    const { onLoad } = this.props;
    this.setState({ 'visible': true }, () => {
      if (onLoad) {
        onLoad();
      }
    });
  }

  // currently fires event on enter viewport, remove if for both or create new if to find only exit
  triggerOnContentVisible(bool) {
    const { onContentVisible } = this.props;
    this.setState({ 'readyTrigger': bool }, () => {
      if (onContentVisible && !bool) {
        onContentVisible();
      }
    });
  }

  detachListeners() {
    const eventNode = this.getEventNode();

    remove(window, 'resize', this.lazyLoadHandler);
    remove(eventNode, 'scroll', this.lazyLoadHandler);
  }

  render() {
    const { children, className, height, width } = this.props;
    const { visible } = this.state;

    const elStyles = { height, width };
    const elClasses = (
      'LazyLoad' +
      (visible ? ' is-visible' : '') +
      (className ? ` ${className}` : '')
    );

    return (
      <div className={elClasses} style={elStyles}>
        {visible && Children.only(children)}
      </div>
    );
  }
}

LazyLoad.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  debounce: PropTypes.bool,
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
  setScroll: PropTypes.func,
  threshold: PropTypes.number,
  throttle: PropTypes.number,
  useRAF: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onContentVisible: PropTypes.func,
  onLoad: PropTypes.func,
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
  useRAF: false,
};
