import clsx from "clsx";
import gsap from "gsap";
import styles from "./HeaderBtn.module.scss";
import { PAGE_STATE } from "utils/format";
import { useMediaQuery } from "react-responsive";
import { useState, useRef } from "react";
import { Power4, Power0, Power1, Power3, Power2 } from "gsap/all";
const HeaderBtn = ({ pageState, setPageState }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const [animating, setAnimating] = useState(false);
  const closeBtnRef = useRef();
  return (
    <div
      className={clsx(
        styles["header-container-right"],
        "pt-5 pe-5 text-primary-color"
      )}
    >
      <div className="JW-font font-md">
        <div
          className="position-relative overflow-hidden cursor-pointer"
          onClick={() => {
            // history.push("/about");
            // setPageState(PAGE_STATE.about);
            if (pageState === PAGE_STATE.home && !animating) {
              setAnimating(true);
              const btnTimeline = gsap.timeline();
              const aboutTimeline = gsap.timeline();
              Promise.all([
                gsap.to(".letter-animate", {
                  transform: "translateX(100%)",
                  duration: 0.32,
                  stagger: 0.013,
                }),
                btnTimeline
                  .to("#aboutBtn", {
                    transform: "translateY(-100%)",
                    duration: 0.3,
                  })
                  .fromTo(
                    closeBtnRef.current,
                    {
                      transform: "translateY(100%)",
                    },
                    {
                      transform: "translateY(0%)",
                      duration: 0.3,
                    }
                  ),
                gsap.to("#homeSocialApp > div > div", {
                  transform: "translateY(-100%)",
                  duration: 0.32,
                  stagger: 0.015,
                }),
                aboutTimeline
                  .to("#aboutContainer", {
                    opacity: 1,
                    duration: 0.2,
                    ease: Power3.easeOut,
                  })
                  .fromTo(
                    ".about-text-animate",
                    {
                      transform: "translateX(-100%)",
                    },
                    {
                      transform: "translateX(0%)",
                      duration: 1.2,
                      stagger: 0.025,
                      ease: Power3.easeOut,
                    }
                  )
                  .fromTo(
                    "#introContainer > div > div",
                    {
                      transform: "translateY(100%)",
                    },
                    {
                      transform: "translateY(0%)",
                      duration: 1,
                      stagger: 0.03,
                      ease: Power3.easeOut,
                    },
                    "-=1"
                  )
                  .fromTo(
                    "#aboutSocialApp > div > div",
                    {
                      transform: "translateY(100%)",
                    },
                    {
                      transform: "translateY(0%)",
                      duration: 1.3,
                      stagger: 0.03,
                      ease: Power3.easeOut,
                    },
                    "-=0.9"
                  )
                  .fromTo(
                    "#rightsContainer > div > div",
                    {
                      transform: "translateY(100%)",
                    },
                    {
                      transform: "translateY(0%)",
                      duration: 1,
                      stagger: 0.03,
                      ease: Power3.easeOut,
                    },
                    "-=1.5"
                  ),
              ]).then(() => {
                setAnimating(false);
                setPageState(PAGE_STATE.about);
              });
            } else if (
              closeBtnRef.current &&
              pageState === PAGE_STATE.about &&
              !animating
            ) {
              setAnimating(true);
              const btnTimeline = gsap.timeline();
              Promise.all([
                gsap.fromTo(
                  ".letter-animate",
                  {
                    transform: "translateX(-100%)",
                  },
                  {
                    transform: "translateX(0%)",
                    duration: 0.32,
                    stagger: 0.013,
                    delay: 0.5,
                  }
                ),
                btnTimeline
                  .to(closeBtnRef.current, {
                    transform: "translateY(-100%)",
                    duration: 0.2,
                  })
                  .fromTo(
                    "#aboutBtn",
                    {
                      transform: "translateY(100%)",
                    },
                    {
                      transform: "translateY(0%)",
                      duration: 0.2,
                    }
                  ),
                gsap.fromTo(
                  "#homeSocialApp > div > div",
                  {
                    transform: "translateY(100%)",
                  },
                  {
                    transform: "translateY(0%)",
                    duration: 0.32,
                    stagger: 0.015,
                    delay: 0.5,
                  }
                ),
                gsap.to(".about-text-animate", {
                  transform: "translateX(100%)",
                  duration: 0.5,
                  stagger: 0.01,
                  ease: Power4.easeOut,
                }),
                gsap.to("#introContainer > div > div", {
                  transform: "translateY(-100%)",
                  duration: 0.5,
                  stagger: 0.01,
                  ease: Power4.easeOut,
                }),
                gsap.to("#aboutSocialApp > div > div", {
                  transform: "translateY(-100%)",
                  duration: 0.5,
                  stagger: 0.01,
                  ease: Power4.easeOut,
                }),
                gsap.to("#rightsContainer > div > div", {
                  transform: "translateY(-100%)",
                  duration: 0.5,
                  stagger: 0.01,
                  ease: Power4.easeOut,
                }),
                gsap.to("#aboutContainer", {
                  opacity: 0,
                  duration: 0.2,
                  delay: 0.5,
                  ease: Power4.easeOut,
                }),
              ]).then(() => {
                setAnimating(false);
                setPageState(PAGE_STATE.home);
              });
            }
          }}
        >
          <div id="aboutBtn">
            <div className="position-relative line-height-md">ABOUT</div>
            <div className="line">
              <div className="line-color"></div>
            </div>
          </div>

          <div
            className={clsx("position-absolute JW-font font-md")}
            style={{ top: 0 }}
          >
            {isDesktopOrLaptop && (
              <div ref={closeBtnRef} id="closeBtn">
                <div className="position-relative line-height-md">CLOSE</div>
                <div className="line">
                  <div className="line-color"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBtn;
