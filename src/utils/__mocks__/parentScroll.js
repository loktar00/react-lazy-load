const scrollHandlers = [];

function parentScroll() {
  return {
    addEventListener(eventName, scrollHandler) {
      if (eventName === 'scroll') {
        scrollHandlers.push(scrollHandler);
      }
    },
  };
}

parentScroll.__scroll = () => {
  scrollHandlers.forEach(fn => fn());
};

module.exports = parentScroll;
