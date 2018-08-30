function shouldRender(condition, toRender) {
  if (condition) {
    return toRender;
  } else {
    return null;
  }
}

module.exports = shouldRender;
