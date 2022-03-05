import "./App.scss";
import CanvasBlock from "features/Webgl/CanvasBlock/CanvasBlock";
import Home from "features/Home/Home";
import { useEffect, useRef, useCallback, useState } from "react";
import normalizeWheel from "normalize-wheel";
import { imagesArr, IMAGE_BLOCK_WIDTH, IMAGE_GAP } from "utils/format";
const App = () => {
  const numImages = imagesArr.length;
  const scrollLimit = (numImages - 1) * (IMAGE_BLOCK_WIDTH + IMAGE_GAP);
  const scrollPosRef = useRef({
    current: 0,
    target: 0,
    latency: 0,
  });
  const zPosRef = useRef(
    Array.from({ length: numImages }).map((item) => ({
      current: 0,
      target: 0,
    }))
  );

  const [isScrolling, setIsScrolling] = useState(false);

  const onWheelHandler = useCallback(
    (e) => {
      setIsScrolling(true);
      const { pixelX, pixelY } = normalizeWheel(e);
      const relativeSpeed = Math.min(
        Math.max(Math.abs(pixelX), Math.abs(pixelY)),
        100
      );
      const scrollSpeed = relativeSpeed * 0.01;

      let direction = "L";
      let horizonal = true;
      if (Math.abs(pixelY) > Math.abs(pixelX)) {
        horizonal = false;
      }
      if (horizonal) {
        if (pixelX < 0) {
          direction = "R";
        } else {
          direction = "L";
        }
      } else {
        if (pixelY < 0) {
          direction = "R";
        } else {
          direction = "L";
        }
      }

      // update target position
      let target =
        scrollPosRef.current.target +
        (direction === "L" ? -scrollSpeed : scrollSpeed);
      target = Math.max(-scrollLimit, Math.min(0, target));
      scrollPosRef.current.target = target;
    },
    [scrollLimit]
  );

  useEffect(() => {
    window.addEventListener("wheel", onWheelHandler);
    return () => {
      window.removeEventListener("wheel", onWheelHandler);
    };
  }, [onWheelHandler]);

  return (
    <>
      <CanvasBlock
        scrollPosRef={scrollPosRef}
        zPosRef={zPosRef}
        isScrolling={isScrolling}
        setIsScrolling={setIsScrolling}
      />
      <Home />
    </>
  );
};

export default App;
