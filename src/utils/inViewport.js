const isHidden = (element) =>
  element.offsetParent === null;

const offset = (element) => {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
  };
};

const inViewport = (element, container, customOffset) => {
  if (isHidden(element)) {
    return false;
  }

  let top, left, bottom, right;

  if (typeof container === 'undefined' || container === window) {
    top = window.pageYOffset;
    left = window.pageXOffset;
    bottom = top + window.innerHeight;
    right = left + window.innerWidth;
  } else {
    const containerOffset = offset(container);

    top = containerOffset.top;
    left = containerOffset.left;
    bottom = top + container.offsetHeight;
    right = left + container.offsetWidth;
  }

  const elementOffset = offset(element);

  return (
    top < elementOffset.top + customOffset.bottom + element.offsetHeight &&
    bottom > elementOffset.top - customOffset.top &&
    left < elementOffset.left + customOffset.right + element.offsetWidth &&
    right > elementOffset.left - customOffset.left
  );
};

module.exports = inViewport;