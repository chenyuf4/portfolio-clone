import CanvasBlock from "features/Webgl/CanvasBlock/CanvasBlock";
import Home from "features/Home/Home";
import { useEffect, useRef, useCallback, useState } from "react";
import normalizeWheel from "normalize-wheel";
import {
  DESKTOP_THRESHOLD,
  HEIGHT_THRESHOLD,
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
    query: `(min-width: ${DESKTOP_THRESHOLD}px)`,
  });
  const isHeightEnough = useMediaQuery({
    query: `(min-height: ${HEIGHT_THRESHOLD}px)`,
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
  const pageStateRef = useRef(PAGE_STATE.home);
  const [animating, setAnimating] = useState(false);
  const onWheelHandler = useCallback(
    (e) => {
      if (
        pageStateRef.current !== PAGE_STATE.home ||
        !isDesktopOrLaptop ||
        !isHeightEnough
      )
        return;
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
    [isDesktopOrLaptop, isHeightEnough, scrollLimit]
  );

  useEffect(() => {
    window.addEventListener("wheel", onWheelHandler);
    return () => {
      window.removeEventListener("wheel", onWheelHandler);
    };
  }, [onWheelHandler]);

  useEffect(() => {
    if (animating) return;
    if (!isDesktopOrLaptop) {
      if (pageStateRef.current !== PAGE_STATE.about) {
        //when page is small, we need to hide home page and show about page
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
        // hide about and close btn
        gsap.set("#aboutBtn", {
          transform: "translateY(-100%)",
        });
        gsap.set("#closeBtn", {
          transform: "translateY(100%)",
        });
      } else {
        // if we already at about page, we only hide about and close button
        gsap.set("#aboutBtn", {
          transform: "translateY(-100%)",
        });
        gsap.set("#closeBtn", {
          transform: "translateY(100%)",
        });
      }
    } else if (pageStateRef.current === PAGE_STATE.home) {
      // if page is large enough, we need to hide about page
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
  }, [animating, isDesktopOrLaptop, isHeightEnough]);

  return (
    <>
      <CanvasBlock
        scrollPosRef={scrollPosRef}
        isScrolling={isScrolling}
        setIsScrolling={setIsScrolling}
      />
      <Home pageStateRef={pageStateRef} />
      {/* <Route exact={true} path="/about"> */}
      <About />
      <HeaderBtn
        pageStateRef={pageStateRef}
        animating={animating}
        setAnimating={setAnimating}
      />
      {/* </Route> */}
    </>
  );
};

export default AppHome;
