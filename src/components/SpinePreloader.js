import React, { useEffect, useState } from "react";
import smallLogo from "../images/small-logo.svg";

const SpinePreloader = ({ onComplete }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.body.classList.add("preloader-active");

    let closeTimer;
    const timer = setTimeout(() => {
      setIsClosing(true);

      closeTimer = setTimeout(() => {
        document.body.classList.remove("preloader-active");

        if (onComplete) {
          onComplete();
        }
      }, 700);
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
      document.body.classList.remove("preloader-active");
    };
  }, [onComplete]);

  return (
    <div className={`spine-preloader ${isClosing ? "is-closing" : ""}`} role="status" aria-label="Loading page">
      <div className="preloader-bg-glow"></div>

      <div className="preloader-content">
        <div className="preloader-brand-mark">
          <img
            src={smallLogo}
            alt="Dr. Manojkumar Gaddikeri spine logo"
            width="120"
            height="156"
            loading="eager"
          />
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
