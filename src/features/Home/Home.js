import clsx from "clsx";
import styles from "./Home.module.scss";
import { useHistory } from "react-router-dom";
import { PAGE_STATE } from "utils/format";
import gsap from "gsap";
const Home = ({ pageState, setPageState }) => {
  const history = useHistory();
  return (
    <div>
      <div
        className={clsx(
          styles["header-container-left"],
          "pt-4 ps-5 pe-5 text-primary-color"
        )}
      >
        <div className="w-100 d-flex justify-content-between T-font">
          <div className="d-flex">
            {"STEPHEN".split("").map((letter, index) => (
              <div className="position-relative overflow-hidden" key={index}>
                <div className="letter-animate">
                  <div
                    className={clsx(
                      "font-title mb-0 postion-relative",
                      styles["font-title-letter-space"]
                    )}
                  >
                    {letter}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          styles["header-container-right"],
          "pt-5 pe-5 text-primary-color"
        )}
      >
        <div className="JW-font font-md">
          <div className="position-relative overflow-hidden">
            <div
              id="aboutBtn"
              className={clsx(
                pageState === PAGE_STATE.home && "cursor-pointer"
              )}
              onClick={() => {
                // history.push("/about");
                // setPageState(PAGE_STATE.about);
                gsap.to(".letter-animate", {
                  transform: "translateX(100%)",
                  duration: 0.32,
                  stagger: 0.013,
                });
                gsap.to("#aboutBtn", {
                  transform: "translateY(-100%)",
                  duration: 0.2,
                });
                gsap.to("#homeSocialApp > div > div", {
                  transform: "translateY(-100%)",
                  duration: 0.32,
                  stagger: 0.015,
                });
                setPageState(PAGE_STATE.about);
              }}
            >
              <div className="position-relative line-height-md">ABOUT</div>
              <div className="line">
                <div className="line-color"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "d-flex justify-content-between JW-font font-md align-items-end w-100 text-primary-color ps-5 pe-5 pb-5",
          styles["footer-container"]
        )}
      >
        <div className="intro-container line-height-md font-sm">
          <div>FRONT-END BEGINEER</div>
          <div>WORK IN BYTEDANCE</div>
        </div>
        <div className="social-app-container line-height-lg" id="homeSocialApp">
          <div className="overflow-hidden position-relative">
            <div className="text-end">EMAIL</div>
          </div>
          <div className="overflow-hidden position-relative">
            <div className="text-end">INSTAGRAM</div>
          </div>
          <div className="overflow-hidden position-relative">
            <div className="text-end">LINKEDIN</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
