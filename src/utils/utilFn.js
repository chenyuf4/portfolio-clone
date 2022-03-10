export const rotationAngleFn = (percentage, direction = "L") => {
  const angleOffset = Math.PI / 7;
  if (percentage === 0) {
    return direction === "L" ? angleOffset : -angleOffset;
  }
  let derivative = 0;
  if (percentage <= 0.5) {
    derivative = 4 * percentage;
  } else if (percentage >= 1.5) {
    derivative = 4 * percentage - 8;
  } else {
    derivative = (1 - percentage) * 4;
  }
  let offsetValue = angleOffset;
  if (direction === "R") {
    offsetValue = -angleOffset;
  }
  return Math.atan(derivative) + offsetValue;
};
