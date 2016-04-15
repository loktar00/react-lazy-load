let visible = false;

// ignore parameters; just return what you're told
function inViewport() {
  return visible;
}

// allows us to set visibility in mock
inViewport.__setVisible = (newVisible) => {
  visible = true;
}

inViewport.__reset = () => {
  visible = false;
}

module.exports = inViewport;
