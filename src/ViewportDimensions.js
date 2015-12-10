function throttle(fn, threshold = 250) {
  let last;
  let deferTimer;
  return (...args) => {
    const context = this;
    const now = +new Date;
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

function attempt(callback) {
  try {
    return callback();
  } catch (error) {
    return error;
  }
}

export default class ViewportDimensions {
  constructor(threshold = 250) {
    this.callbacks = [];
    this.onWindowScroll = throttle(() => this.onWindowScroll(), threshold);
    window.addEventListener('scroll', this.onWindowScroll);
    window.addEventListener('resize', this.onWindowScroll);
  }
  destroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
    window.removeEventListener('resize', this.onWindowScroll);
  }
  addListener(callback) {
    this.callbacks = this.callbacks.concat(callback);
    return () => this.removeListener(callback);
  }
  removeListener(callback) {
    this.callbacks = this.callbacks.filter(c => c !== callback);
  }
  onWindowScroll() {
    this.callbacks.forEach(callback => attempt(callback));
  }
}
