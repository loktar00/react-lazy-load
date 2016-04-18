const functionQueue = [];
let synchronize = false;

function deferAnimation(fn) {
  if (synchronize) {
    fn();
  } else {
    functionQueue.push(fn);
  }
}

deferAnimation.__step = (num = 5) => {
  // run up to 5 from the function queue
  functionQueue.splice(0, num).forEach(fn => fn());
};

deferAnimation.__stepAll = () => {
  const copy = functionQueue.map(fn => fn);
  functionQueue.length = 0;
  copy.forEach(fn => fn());
};

// allow setting of synchronized mode where functions get executed immediately
deferAnimation.__synchronize = (mode = true) => {
  synchronize = mode;
};

module.exports = deferAnimation;
