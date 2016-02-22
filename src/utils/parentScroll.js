const style = (element, prop) =>
  typeof getComputedStyle !== 'undefined'
    ? getComputedStyle(element, null).getPropertyValue(prop)
    : element.style[prop];

const overflow = (element) =>
  style(element, 'overflow') + style(element, 'overflow-y') + style(element, 'overflow-x');

const scrollParent = (element) => {
  if (!(element instanceof HTMLElement)) {
    return window;
  }

  let parent = element;

  while(parent) {
    if (!parent.parentNode) {
      return window;
    }

    if (parent !== document.body && parent!== document.documentElement && /(scroll|auto)/.test(overflow(parent))) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return window;
};

module.exports = scrollParent;