import React, { useEffect } from "react";
import Header from "./HeaderNew";
import Footer from "./Footer";

import "../css/common.css";
import "../css/home.css";
import "../css/about.css";
import "../css/blog.css";
import "../css/spine-conditions.css";
import "../css/patient-journey.css";
import "../css/contact.css";
import "../css/ui-fixer.css";

import AOS from "aos";
import "aos/dist/aos.css";

import Lenis from "lenis";
import "lenis/dist/lenis.css";

const Layout = ({ children }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });

    AOS.refresh();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;