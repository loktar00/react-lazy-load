const style = (element, prop) => (typeof getComputedStyle !== 'undefined'
    ? getComputedStyle(element, null).getPropertyValue(prop)
    : element.style.getPropertyValue(prop));

const overflow = element => style(element, 'overflow') + style(element, 'overflow-y') + style(element, 'overflow-x');

export default element => {
    if (!element) {
        return window;
    }

    let parent = element;

    while (parent) {
        if (parent === document.body || parent === document.documentElement) {
            break;
        }

        if (!parent.parentNode) {
            break;
        }

        if (/(scroll|auto)/.test(overflow(parent))) {
            return parent;
        }

        parent = parent.parentNode;
    }

    return window;
};
