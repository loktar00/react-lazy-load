const React = require('react');
const { findDOMNode } = require('react-dom');
const { Children, Component, PropTypes } = React;

const { add, remove } = require('eventlistener');
const debounce = require('lodash.debounce');

const parentScroll = require('./utils/parentScroll');
const inViewport = require('./utils/inViewport');

class LazyLoad extends Component {
  constructor(props) {
    super(props);

    this.lazyLoadHandler = this.lazyLoadHandler.bind(this);

    if (props.debounce) {
      this.lazyLoadHandler = debounce(this.lazyLoadHandler, props.throttle);
    }

    this.state = { visible: false };
  }
  componentDidMount() {
    const eventNode = this.getEventNode();

    this.lazyLoadHandler();

    if (this.lazyLoadHandler.flush) {
      this.lazyLoadHandler.flush();
    }

    add(window, 'resize', this.lazyLoadHandler);
    add(eventNode, 'scroll', this.lazyLoadHandler);
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return nextState.visible;
  }
  componentWillUnmount() {
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
    const offset = this.getOffset();
    const node = findDOMNode(this);
    const eventNode = this.getEventNode();

    if (inViewport(node, eventNode, offset)) {
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
  threshold: PropTypes.number,
  throttle: PropTypes.number,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onContentVisible: PropTypes.func,
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

module.exports = LazyLoad;
