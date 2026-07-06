function lerp(value, fromMin, fromMax, toMin, toMax) {
  return toMin + ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin);
}

function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
}

function normalize(value, range) {
  return clamp(lerp(value, range.min, range.max, 0, 1), 0, 1);
}

function smooth(current, target, smooth = a.smooth) {
  return current + (target - current) * (1 - smooth);
}

// Run once, ideally at the top of your sketch
const proto = Object.getPrototypeOf(osc());
proto.scaleScreen = function (amount = 1) {
  return this.scale(amount, innerHeight / innerWidth);
};
