import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import ViewportDimensions from './ViewportDimensions';

const viewportDimensions = new ViewportDimensions();

export default class LazyLoad extends Component {
  state = {
    visible: false,
  }
  componentDidMount() {
    this.removeViewportListener = viewportDimensions.addListener(this.onWindowScroll.bind(this));
    this.onWindowScroll();
  }
  componentDidUpdate() {
    if (!this.state.visible) this.onWindowScroll();
  }
  componentWillUnmount() {
    this.removeViewportListener();
  }
  onWindowScroll() {
    if (this.isInViewport()) {
      this.setState({ visible: true });
      this.removeViewportListener();
    }
  }
  isInViewport() {
    const { threshold } = this.props;

    const bounds = findDOMNode(this).getBoundingClientRect();
    const scrollTop = window.pageYOffset;
    const top = bounds.top + scrollTop;
    const height = bounds.bottom - bounds.top;

    return (top === 0 || (top <= (scrollTop + window.innerHeight + threshold)
                      && (top + height) > (scrollTop - threshold)));
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
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  threshold: PropTypes.number,
};
LazyLoad.defaultProps = {
  threshold: 0,
};
