import getElementPosition from './getElementPosition';

const isHidden = (element) =>
  element.offsetParent === null;

export default function inViewport(element, container, customOffset) {
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
    const containerOffset = getElementPosition(container);

    top = containerOffset.top;
    left = containerOffset.left;
    bottom = top + container.offsetHeight;
    right = left + container.offsetWidth;
  }

  const elementOffset = getElementPosition(element);

  return (
    top < elementOffset.top + customOffset.bottom + element.offsetHeight &&
    bottom > elementOffset.top - customOffset.top &&
    left < elementOffset.left + customOffset.right + element.offsetWidth &&
    right > elementOffset.left - customOffset.left
  );
}
