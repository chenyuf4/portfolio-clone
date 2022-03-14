import clsx from "clsx";
import styles from "./About.module.scss";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";
import {
  HEIGHT_THRESHOLD,
  DESKTOP_THRESHOLD,
  MEDIUM_DEVICE_THRESHOLD,
} from "utils/format";
const About = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: `(min-width: ${DESKTOP_THRESHOLD}px)`,
  });

  const isMediumDevice = useMediaQuery({
    query: `(min-width: ${MEDIUM_DEVICE_THRESHOLD}px)`,
  });

  const isHeightEnough = useMediaQuery({
    query: `(min-height: ${HEIGHT_THRESHOLD}px)`,
  });

  const history = useHistory();
  return (
    <div
      id="aboutContainer"
      className={clsx(
        "background-dark p-5 text-primary-color",
        styles["about-container"]
      )}
    >
      <div className="h-100 position-relative">
        <div>
          <div
            className={clsx(
              styles["large-title-sm-device"],
              isDesktopOrLaptop && styles["large-title-lg-device"],
              isMediumDevice && styles["large-title-md-device"],
              "T-font mb-5"
            )}
            style={{ lineHeight: "0.75" }}
          >
            <div className="d-flex">
              {"STEP0E7".split("").map((letter, index) => (
                <div className="position-relative overflow-hidden" key={index}>
                  <div className="about-text-animate">
                    <div className={clsx("mb-0 postion-relative")}>
                      {letter}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex">
              {"101598M".split("").map((letter, index) => (
                <div className="position-relative overflow-hidden" key={index}>
                  <div className="about-text-animate">
                    <div className={clsx("mb-0 postion-relative")}>
                      {letter}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {isHeightEnough && (
            <div
              className="JW-font text-uppercase"
              style={{ fontSize: "11px" }}
              id="introContainer"
            >
              <div className="overflow-hidden position-relative">
                <div className="line-height-md">
                  STEPHEN FAN is a front end beginner at Bytedance. As
                </div>
              </div>
              <div className="overflow-hidden position-relative">
                <div className="line-height-md ">
                  a developer, he has many experiences in using different
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="line-height-md ">
                  front end tools, such as React, Bootstrap, THREE.js
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="line-height-sm ">and WEBGL.</div>
              </div>
            </div>
          )}
        </div>
        <div className={clsx("JW-font", styles["footer-container"])}>
          {isHeightEnough && (
            <div className="line-height-lg mb-5 font-md" id="aboutSocialApp">
              <div className="overflow-hidden position-relative">
                <div>EMAIL ↗</div>
              </div>
              <div className="overflow-hidden position-relative">
                <div>INSTAGRAM ↗</div>
              </div>
              <div className="overflow-hidden position-relative">
                <div>LINKEDIN ↗</div>
              </div>
              <div className="overflow-hidden position-relative">
                <div>GITHUB ↗</div>
              </div>
              <div className="overflow-hidden position-relative">
                <div>WECHAT ↗</div>
              </div>
            </div>
          )}
          <div
            className={clsx(
              "d-flex justify-content-between font-sm align-items-end w-100"
            )}
          >
            <div className="intro-container line-height-md">
              <div>FRONT-END BEGINEER</div>
              <div>WORK IN BYTEDANCE</div>
            </div>

            <div
              className="intro-container line-height-md"
              id="rightsContainer"
            >
              <div className="text-end overflow-hidden position-relative">
                <div>ALL RIGHTS RESERVED</div>
              </div>
              <div className="text-end overflow-hidden position-relative">
                <div>STEPHEN FAN 2022</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
