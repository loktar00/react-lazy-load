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
    const containerPosition = offset(container);

    top = containerPosition.top;
    left = containerPosition.left;
    bottom = top + container.offsetHeight;
    right = left + container.offsetWidth;
  }

  const elementPosition = offset(element);

  return (
    top <= elementPosition.top + element.offsetHeight + customOffset.top &&
    bottom >= elementPosition.top - customOffset.bottom &&
    left <= elementPosition.left + element.offsetWidth + customOffset.left &&
    right >= elementPosition.left - customOffset.right
  );
};

module.exports = inViewport;
