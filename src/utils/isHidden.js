const isHidden = (element) =>
  element.offsetParent === null;

export default isHidden;