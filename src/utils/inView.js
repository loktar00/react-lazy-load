import isHidden from './isHidden';

const inView = (element, view) => {
  if (isHidden(element)) {
    return false;
  }

  const box = element.getBoundingClientRect();
  console.log(box, view);
  return (
    box.right >= view.left &&
    box.bottom >= view.top &&
    box.left <= view.right &&
    box.top <= view.bottom
  );
};

export default inView;