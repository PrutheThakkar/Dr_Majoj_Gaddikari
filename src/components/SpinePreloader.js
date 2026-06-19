import React, { useEffect, useState } from "react";
import smallLogo from "../images/small-logo.svg";

const SpinePreloader = ({ onComplete }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.body.classList.add("preloader-active");

    const timer = setTimeout(() => {
      setIsClosing(true);

      setTimeout(() => {
        document.body.classList.remove("preloader-active");

        if (onComplete) {
          onComplete();
        }
      }, 700);
    }, 2200);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("preloader-active");
    };
  }, [onComplete]);

  return (
    <div className={`spine-preloader ${isClosing ? "is-closing" : ""}`}>
      <div className="preloader-bg-glow"></div>

      <div className="preloader-content">
        <div className="preloader-spine-wrap">
          <svg
            className="preloader-spine-line"
            viewBox="0 0 220 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="spine-path"
              d="M112 18C76 52 74 91 111 124C149 158 148 196 109 226C70 257 71 297 111 328C149 358 151 388 112 406"
            />

            {[45, 80, 118, 157, 196, 236, 276, 316, 356].map((y, index) => (
              <g className="spine-disc" key={index}>
                <ellipse cx="110" cy={y} rx="28" ry="8" />
              </g>
            ))}
          </svg>

          <div className="preloader-logo-circle">
            <img src={smallLogo} alt="Dr. Manojkumar Gaddikeri logo" loading="lazy" />
          </div>
        </div>

        <p className="preloader-text">Preparing spine care experience</p>

        <div className="preloader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default SpinePreloader;