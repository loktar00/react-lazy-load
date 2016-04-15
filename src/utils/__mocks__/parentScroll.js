const eventNode = {
  addEventListener(eventName, scrollHandler) {
    if (eventName === 'scroll') {
      parentScroll.__scrollHandler = scrollHandler;
    }
  }
};

function parentScroll() {
  return eventNode;
}

parentScroll.__scroll = () => {
  parentScroll.__scrollHandler();
};

parentScroll.__reset = () => {
  parentScroll.__scrollHandler = () => {};
};

module.exports = parentScroll;
