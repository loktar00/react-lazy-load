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
  id?: string,
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
        id: undefined,
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

        const node = this.wrapper?.current;

        if (node instanceof HTMLElement) {
            this.elementObserver.observe(node);
        }
    }

    shouldComponentUpdate(_:Props, nextState: State) {
        return nextState.visible;
    }

    componentWillUnmount() {
        const node = this.wrapper?.current;
        if (node && node instanceof HTMLElement) {
            this.elementObserver?.unobserve(node);
        }
    }

    getEventNode() {
        return scrollParent(this.wrapper?.current);
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
            const node = this.wrapper?.current;
            if (node && node instanceof HTMLElement) {
                this.elementObserver?.unobserve(node);
            }
        }
    };

    render() {
        const {
            children, id, className, height, width, elementType
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
            id,
            className: elClasses,
            style: elStyles,
            ref: this.wrapper
        }, visible && Children.only(children));
    }
}
