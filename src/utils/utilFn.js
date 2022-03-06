import { IMAGE_BLOCK_WIDTH, IMAGE_GAP } from "./format";
const scaleRatio = 1;
export const rotationAngleFn = (percentage, direction = "L", uStrength = 1) => {
  if (percentage === 0) {
    return direction === "L"
      ? (Math.PI * uStrength) / 8
      : (-Math.PI * uStrength) / 8;
  }
  let derivative = 0;
  if (percentage <= 0.5) {
    derivative = 4 * percentage;
  } else if (percentage >= 1.5) {
    derivative = 4 * percentage - 8;
  } else {
    derivative = (1 - percentage) * 4;
  }

  let angleOffset = 0;
  const largeOffset = (Math.PI * uStrength) / 8;
  const smallOffset = (Math.PI * uStrength) / 8;
  if (percentage >= 1 && direction === "L") {
    angleOffset = largeOffset;
  } else if (percentage < 1 && direction === "L") {
    angleOffset = smallOffset;
  }

  if (percentage <= 1 && direction === "R") {
    angleOffset = -largeOffset;
  } else if (percentage > 1 && direction === "R") {
    angleOffset = -smallOffset;
  }
  return (
    Math.atan(derivative * uStrength * scaleRatio) +
    angleOffset * uStrength * scaleRatio
  );
};
