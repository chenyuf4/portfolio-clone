import CanvasBlock from "features/Webgl/CanvasBlock/CanvasBlock";
import Home from "features/Home/Home";
import { useEffect, useRef, useCallback, useState } from "react";
import normalizeWheel from "normalize-wheel";
import {
  imagesArr,
  IMAGE_BLOCK_WIDTH,
  IMAGE_GAP,
  PAGE_STATE,
} from "utils/format";
import { useMediaQuery } from "react-responsive";
import About from "features/About/About";
import { Route, useHistory } from "react-router-dom";
import HeaderBtn from "features/HeaderBtn/HeaderBtn";
import gsap from "gsap";
const AppHome = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isHeightEnough = useMediaQuery({
    query: "(min-height: 550px)",
  });
  const history = useHistory();
  const numImages = imagesArr.length;
  const scrollLimit = (numImages - 1) * (IMAGE_BLOCK_WIDTH + IMAGE_GAP);
  const scrollPosRef = useRef({
    current: 0,
    target: 0,
    latency: 0,
  });

  const [isScrolling, setIsScrolling] = useState(false);
  const [pageState, setPageState] = useState(PAGE_STATE.home);

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
    pageState === PAGE_STATE.home &&
      window.addEventListener("wheel", onWheelHandler);
    PAGE_STATE === PAGE_STATE.about &&
      window.removeEventListener("wheel", onWheelHandler);
    return () => {
      window.removeEventListener("wheel", onWheelHandler);
    };
  }, [onWheelHandler, pageState]);

  useEffect(() => {
    if (!isDesktopOrLaptop) {
      if (pageState !== PAGE_STATE.about) {
        gsap.set("#aboutContainer", { opacity: 1 });
        gsap.set(".about-text-animate", { transform: "translateX(0%)" });
        isHeightEnough &&
          gsap.set("#introContainer > div > div", {
            transform: "translateY(0%)",
          });
        isHeightEnough &&
          gsap.set("#aboutSocialApp > div > div", {
            transform: "translateY(0%)",
          });
        gsap.set("#rightsContainer > div > div", {
          transform: "translateY(0%)",
        });
        gsap.set("#aboutBtn", {
          transform: "translateY(-100%)",
        });
        gsap.set("#closeBtn", {
          transform: "translateY(100%)",
        });
      } else {
        gsap.set("#aboutBtn", {
          transform: "translateY(-100%)",
        });
        gsap.set("#closeBtn", {
          transform: "translateY(100%)",
        });
      }
    } else if (pageState === PAGE_STATE.home) {
      gsap.set("#aboutContainer", { opacity: 0 });
      gsap.set("#aboutBtn", {
        transform: "translateY(0%)",
      });
      gsap.set("#closeBtn", {
        transform: "translateY(100%)",
      });
    } else {
      gsap.set("#aboutBtn", {
        transform: "translateY(-100%)",
      });
      gsap.set("#closeBtn", {
        transform: "translateY(0%)",
      });
    }
  }, [history, isDesktopOrLaptop, isHeightEnough, pageState]);

  return (
    <>
      <CanvasBlock
        scrollPosRef={scrollPosRef}
        isScrolling={isScrolling}
        setIsScrolling={setIsScrolling}
      />
      <Home pageState={pageState} setPageState={setPageState} />
      {/* <Route exact={true} path="/about"> */}
      <About pageState={pageState} setPageState={setPageState} />
      <HeaderBtn pageState={pageState} setPageState={setPageState} />
      {/* </Route> */}
    </>
  );
};

export default AppHome;
