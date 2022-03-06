import { IMAGE_BLOCK_WIDTH, IMAGE_GAP } from "./format";
export const rotationAngleFn = (percentage, direction = "L") => {
  if (percentage === 0) {
    return direction === "L" ? Math.PI / 8 : -Math.PI / 8;
  }
  const boundary = 5.5 * IMAGE_BLOCK_WIDTH + 4.5 * IMAGE_GAP;
  let derivative = 0;
  if (percentage <= 0.5) {
    derivative = 4 * percentage;
  } else if (percentage >= 1.5) {
    derivative = 4 * percentage - 8;
  } else {
    derivative = (1 - percentage) * 4;
  }
  let angleOffset = 0;
  if (percentage >= 1 && direction === "L") {
    angleOffset = Math.PI / 2;
  }

  if (percentage <= 1 && direction === "R") {
    angleOffset = -Math.PI / 2;
  }
  return Math.atan(derivative * boundary) + angleOffset;
};
