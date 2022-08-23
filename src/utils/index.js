/*
* Finds element's position relative to the whole document,
* rather than to the viewport as it is the case with .getBoundingClientRect().
*/
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();

    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

const isHidden = element => element.offsetParent === null;

export function inViewport(element, container, customOffset) {
    if (isHidden(element)) {
        return false;
    }

    let top;
    let bottom;
    let left;
    let right;

    if (typeof container === 'undefined' || container === window) {
        top = window.pageYOffset;
        left = window.pageXOffset;
        bottom = top + window.innerHeight;
        right = left + window.innerWidth;
    } else {
        if (!inViewport(container, window, customOffset)) return false;

        const containerPosition = getElementPosition(container);

        top = containerPosition.top;
        left = containerPosition.left;
        bottom = top + container.offsetHeight;
        right = left + container.offsetWidth;
    }

    const elementPosition = getElementPosition(element);

    return (
        top <= elementPosition.top + element.offsetHeight + customOffset.top
      && bottom >= elementPosition.top - customOffset.bottom
      && left <= elementPosition.left + element.offsetWidth + customOffset.left
      && right >= elementPosition.left - customOffset.right
    );
}

const style = (element, prop) => (typeof getComputedStyle !== 'undefined'
    ? getComputedStyle(element, null).getPropertyValue(prop)
    : element.style.getPropertyValue(prop));

const overflow = element => style(element, 'overflow') + style(element, 'overflow-y') + style(element, 'overflow-x');

export const scrollParent = element => {
    if (!(element instanceof HTMLElement)) {
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
