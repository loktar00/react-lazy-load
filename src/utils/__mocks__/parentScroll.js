function parentScroll() {
  return {
    addEventListener(eventName, scrollHandler) {
      if (eventName === 'scroll') {
        parentScroll.__scrollHandler = scrollHandler;
      }
    },
  };
}

parentScroll.__scroll = () => {
  parentScroll.__scrollHandler();
};

parentScroll.__reset = () => {
  parentScroll.__scrollHandler = () => {};
};

module.exports = parentScroll;
