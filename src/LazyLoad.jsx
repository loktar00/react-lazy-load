import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';

export default class LazyLoad extends Component {
  constructor(props) {
    super(props);
    this.onWindowScroll = this.onWindowScroll.bind(this);
  }
  state = {
    visible: false,
  };
  componentDidMount() {
    const eventNode = this.getEventNode();
    eventNode.addEventListener('scroll', this.onWindowScroll);
    eventNode.addEventListener('resize', this.onWindowScroll);
    this.onWindowScroll();
  }
  componentDidUpdate() {
    if (!this.state.visible) {
      this.onWindowScroll();
    } else {
      const { onContentVisible } = this.props;

      if (onContentVisible) {
        onContentVisible();
      }
    }
  }
  componentWillUnmount() {
    this.onVisible();
  }
  onVisible() {
    const eventNode = this.getEventNode();
    eventNode.removeEventListener('scroll', this.onWindowScroll);
    eventNode.removeEventListener('resize', this.onWindowScroll);
  }
  onWindowScroll() {
    const { threshold } = this.props;
    const eventNode = this.getEventNode();

    let scrollTop = 0;
    let innerHeight = 0;

    if (eventNode === window) {
      scrollTop = window.pageYOffset;
      innerHeight = window.innerHeight;
    } else {
      scrollTop = eventNode.scrollTop;
      innerHeight = eventNode.clientHeight;
    }

    const bounds = findDOMNode(this).getBoundingClientRect();
    const top = bounds.top + scrollTop;
    const height = bounds.bottom - bounds.top;

    if (top === 0 || (top <= (scrollTop + innerHeight + threshold)
                      && (top + height) > (scrollTop - threshold))) {
      this.setState({ visible: true });
      this.onVisible();
    }
  }
  getEventNode() {
    if (this.props.eventNode) {
      return this.props.eventNode;
    }

    return window;
  }
  render() {
    const elStyles = {
      height: this.props.height,
    };
    const elClasses = classNames({
      'lazy-load': true,
      'lazy-load-visible': this.state.visible,
    });

    return (
      <div className={elClasses} style={elStyles}>
        {this.state.visible && this.props.children}
      </div>
    );
  }
}

LazyLoad.propTypes = {
  children: PropTypes.node.isRequired,
  eventNode: PropTypes.node,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  threshold: PropTypes.number,
  onContentVisible: PropTypes.func,
};
LazyLoad.defaultProps = {
  threshold: 0,
};
