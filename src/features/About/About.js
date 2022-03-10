import clsx from "clsx";
import styles from "./About.module.scss";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";
import { PAGE_STATE } from "utils/format";
const About = ({ pageState, setPageState }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const history = useHistory();
  return (
    <div
      className={clsx(
        "background-dark p-5 text-primary-color",
        styles["about-container"]
      )}
    >
      <div className="h-100 position-relative">
        {isDesktopOrLaptop && (
          <div
            className={clsx(
              "position-absolute JW-font font-md",
              styles["close-btn-container"]
            )}
          >
            <div
              className="cursor-pointer"
              onClick={() => {
                history.push("/");
                setPageState(PAGE_STATE.home);
              }}
            >
              <div className="position-relative line-height-md">CLOSE</div>
              <div className="line">
                <div className="line-color"></div>
              </div>
            </div>
          </div>
        )}
        <div>
          <div
            className={clsx(
              !isDesktopOrLaptop
                ? styles["large-title-sm-window"]
                : styles["large-title-lg-window"],
              "T-font mb-5"
            )}
            style={{ lineHeight: "0.75" }}
          >
            <div>STEP0E7</div>
            <div>101598M</div>
          </div>
          <div
            className="JW-font text-uppercase line-height-sm"
            style={{ fontSize: "11px" }}
          >
            <div className="text-nowrap">
              STEPHEN FAN is a front end beginner at Bytedance. As
            </div>
            <div>a developer, he has many experiences in using different</div>
            <div> front end tools, such as React, Bootstrap, THREE.js</div>
            <div> and WEBGL.</div>
          </div>
        </div>
        <div className={clsx("JW-font", styles["footer-container"])}>
          <div className="line-height-lg mb-5 font-md">
            <div>EMAIL ↗</div>
            <div>INSTAGRAM ↗</div>
            <div>LINKEDIN ↗</div>
            <div>GITHUB ↗</div>
            <div>WECHAT ↗</div>
          </div>
          <div
            className={clsx(
              "d-flex justify-content-between font-sm align-items-end w-100"
            )}
          >
            <div className="intro-container line-height-md">
              <div>FRONT-END BEGINEER</div>
              <div>WORK IN BYTEDANCE</div>
            </div>

            <div className="intro-container line-height-md">
              <div className="text-end">ALL RIGHTS RESERVED</div>
              <div className="text-end">STEPHEN FAN 2022</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
