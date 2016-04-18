module.exports = function deferAnimation(fn) {
  if (!window) return fn;
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    (callback => window.setTimeout(() => callback(Date.now())), 1000 / 60);
};
