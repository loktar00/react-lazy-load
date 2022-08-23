import React, {
    Children,
    Component,
    createElement,
    ReactNode
} from 'react';
import { findDOMNode } from 'react-dom';
import _debounce from 'lodash/debounce';
import _throttle from 'lodash/throttle';
// eslint-disable-next-line import/extensions
import { scrollParent, inViewport } from './utils/index.js';

type Props = {
  children: ReactNode,
  className?: string,
  debounce?: boolean,
  elementType?: string,
  height?: string | number,
  offset?: number,
  offsetBottom?: number,
  offsetHorizontal?: number,
  offsetLeft?: number,
  offsetRight?: number,
  offsetTop?: number,
  offsetVertical?: number,
  threshold?: number,
  throttle?: number,
  width?: number | string,
  onContentVisible?: () => void,
}

type State = {
    visible: boolean
}

export default class LazyLoad extends Component<Props, State> {
    static defaultProps = {
        elementType: 'div',
        className: '',
        debounce: false,
        offset: 0,
        offsetBottom: 0,
        offsetHorizontal: 0,
        offsetLeft: 0,
        offsetRight: 0,
        offsetTop: 0,
        offsetVertical: 0,
        throttle: 250,
        threshold: 0,
        width: null,
        onContentVisible: null,
        height: null
    };

    mounted: boolean;

    constructor({ throttle, debounce, ...props }: Props) {
        super(props);

        this.lazyLoadHandler = this.lazyLoadHandler.bind(this);
        this.mounted = false;

        if (throttle) {
            if (debounce) {
                this.lazyLoadHandler = _debounce(this.lazyLoadHandler, throttle);
            } else {
                this.lazyLoadHandler = _throttle(this.lazyLoadHandler, throttle);
            }
        }

        this.state = { visible: false };
    }

    componentDidMount() {
        this.mounted = true;
        const eventNode = this.getEventNode();

        this.lazyLoadHandler();

        if (this.lazyLoadHandler.flush) {
            this.lazyLoadHandler.flush();
        }

        window.addEventListener('resize', this.lazyLoadHandler);
        eventNode.addEventListener('scroll', this.lazyLoadHandler);

        if (eventNode !== window) {
            window.addEventListener('scroll', this.lazyLoadHandler);
        }
    }

    shouldComponentUpdate(_:Props, nextState: State) {
        return nextState.visible;
    }

    componentDidUpdate() {
        const { visible } = this.state;

        if (!visible) {
            this.lazyLoadHandler();
        }
    }

    componentWillUnmount() {
        this.mounted = false;

        if (this.lazyLoadHandler.cancel) {
            this.lazyLoadHandler.cancel();
        }

        this.detachListeners();
    }

    getEventNode() {
        return scrollParent(findDOMNode(this));
    }

    getOffset() {
        const {
            offset, offsetVertical, offsetHorizontal,
            offsetTop, offsetBottom, offsetLeft, offsetRight, threshold
        } = this.props;

        const offsetAll = threshold || offset;
        const verticleOffset = offsetVertical || offsetAll;
        const horizontalOffset = offsetHorizontal || offsetAll;

        return {
            top: offsetTop || verticleOffset,
            bottom: offsetBottom || verticleOffset,
            left: offsetLeft || horizontalOffset,
            right: offsetRight || horizontalOffset
        };
    }

    lazyLoadHandler() {
        if (!this.mounted) {
            return;
        }
        const offset = this.getOffset();
        const node = findDOMNode(this);
        const eventNode = this.getEventNode();

        if (inViewport(node, eventNode, offset)) {
            const { onContentVisible } = this.props;

            this.setState({ visible: true }, () => {
                if (onContentVisible) {
                    onContentVisible();
                }
            });
            this.detachListeners();
        }
    }

    detachListeners() {
        const eventNode = this.getEventNode();

        window.removeEventListener('resize', this.lazyLoadHandler);
        eventNode.removeEventListener('scroll', this.lazyLoadHandler);

        if (eventNode !== window) {
            window.removeEventListener('scroll', this.lazyLoadHandler);
        }
    }

    render() {
        const {
            children, className, height, width, elementType
        } = this.props;
        const { visible } = this.state;

        const elStyles = { height, width };
        const elClasses = (
            `LazyLoad${
                visible ? ' is-visible' : ''
            }${className ? ` ${className}` : ''}`
        );

        const componentElementType = elementType || 'div';

        return createElement(componentElementType, {
            className: elClasses,
            style: elStyles
        }, visible && Children.only(children));
    }
}
