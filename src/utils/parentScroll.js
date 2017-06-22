const style = (element, prop) => {
  const computedValue = getComputedStyle !== 'undefined' && getComputedStyle(element, null) ?
    getComputedStyle(element, null).getPropertyValue(prop) : null;

  return computedValue || element.style[prop];
}

const overflow = (element) =>
  style(element, 'overflow') + style(element, 'overflow-y') + style(element, 'overflow-x');

const scrollParent = (element) => {
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

export default scrollParent;
