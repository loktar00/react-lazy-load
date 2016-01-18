const isHidden = require('./isHidden');

module.exports = (element, view) => {
  if (isHidden(element)) {
    return false;
  }

  const box = element.getBoundingClientRect();
  return (
    box.right >= view.left &&
    box.bottom >= view.top &&
    box.left <= view.right &&
    box.top <= view.bottom
  );
};