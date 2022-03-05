import clsx from "clsx";
import styles from "./Home.module.scss";
const Home = () => {
  return (
    <div>
      <div
        className={clsx(
          styles["header-container"],
          "pt-4 ps-5 pe-5 text-primary-color"
        )}
      >
        <div className="w-100 d-flex justify-content-between T-font align-items-center">
          <div className="d-flex">
            {"STEPHEN".split("").map((letter, index) => (
              <div className="position-relative overflow-hidden" key={index}>
                <div className="">
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
          <div className="JW-font font-md">
            <div>
              <div className="position-relative line-height-md">ABOUT</div>
              <div className={styles["line"]}>
                <div className={styles["line-color"]}></div>
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
        <div className="social-app-container line-height-lg">
          <div className="text-end">EMAIL</div>
          <div className="text-end">INSTAGRAM</div>
          <div className="text-end">LINKEDIN</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
