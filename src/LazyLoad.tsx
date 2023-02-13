import React, {
    Children,
    Component,
    createElement,
    ReactNode,
    RefObject
} from 'react';
// eslint-disable-next-line import/extensions
import scrollParent from './utils/index.js';

type Props = {
  children: ReactNode,
  className?: string,
  elementType?: string,
  height?: string | number,
  offset?: string | number,
  threshold?: number,
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
        offset: 0,
        threshold: 0,
        width: null,
        onContentVisible: null,
        height: null
    };

    elementObserver: IntersectionObserver | null;

    wrapper: RefObject<Component> | null;

    constructor(props: Props) {
        super(props);
        this.elementObserver = null;
        this.wrapper = React.createRef();

        this.state = { visible: false };
    }

    componentDidMount() {
        let eventNode = this.getEventNode();

        if (eventNode === window) {
            eventNode = document.body;
        }
        const { offset, threshold } = this.props;

        const options = {
            rootMargin: typeof offset === 'number' ? `${offset}px` : offset || '0px',
            threshold: threshold || 0
        };

        this.elementObserver = new IntersectionObserver(this.lazyLoadHandler, options);

        const node = this.getRefElement();
        if (node) {
            this.elementObserver.observe(node);
        }
    }

    shouldComponentUpdate(_:Props, nextState: State) {
        return nextState.visible;
    }

    componentWillUnmount() {
        const node = this.getRefElement();
        if (node) {
            this.elementObserver?.unobserve(node);
        }
    }

    getEventNode() {
        return scrollParent(this.wrapper?.current);
    }

    getRefElement(): HTMLElement | null {
        const node = this.wrapper?.current as HTMLElement | null;
        const { elementType } = this.props;
        const toStringExpected = `[object html${elementType}element]`;
        const toStringActual = Object.prototype.toString.call(node).toLocaleLowerCase();

        if (toStringExpected === toStringActual) {
            return node as HTMLElement;
        }

        return null;
    }

    lazyLoadHandler = (entries: IntersectionObserverEntry[]) => {
        const { onContentVisible } = this.props;
        const [entry] = entries;
        const { isIntersecting } = entry;

        if (isIntersecting) {
            this.setState({ visible: true }, () => {
                if (onContentVisible) {
                    onContentVisible();
                }
            });

            // Stop observing
            const node = this.getRefElement();
            if (node) {
                this.elementObserver?.unobserve(node);
            }
        }
    };

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
            style: elStyles,
            ref: this.wrapper
        }, visible && Children.only(children));
    }
}
