const style = (element, prop) =>
  typeof getComputedStyle !== 'undefined'
    ? getComputedStyle(element, null).getPropertyValue(prop)
    : element.style[prop];

const overflow = (element) =>
  style(element, 'overflow') + style(element, 'overflow-y') + style(element, 'overflow-x');

const hasClassName = (className) => (element) => element.classList.contains(className);

const hasValidOverflow = (element) => /(scroll|auto)/.test(overflow(element));

const scrollParent = (element, wrapperClassName) => {
  if (!(element instanceof HTMLElement)) {
    return window;
  }

  const isWrapperElement = wrapperClassName ? hasClassName(wrapperClassName) : hasValidOverflow;

  let parent = element;

  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break;
    }

    if (!parent.parentNode) {
      break;
    }

    if (isWrapperElement(parent)) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return window;
};

export default scrollParent;
