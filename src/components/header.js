import React, { useEffect, useRef, useState } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import logo from "../images/Manoj-Website-Logo.svg";

const Header = () => {
  const location = useLocation();
  const headerRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }

    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    const getScrollTop = (event) => {
      const eventScrollTop = event?.target?.scrollTop || 0;

      const windowScrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      const gatsbyWrapperScrollTop =
        document.querySelector("#gatsby-focus-wrapper")?.scrollTop || 0;

      const mainScrollTop = document.querySelector("main")?.scrollTop || 0;

      return Math.max(
        eventScrollTop,
        windowScrollTop,
        gatsbyWrapperScrollTop,
        mainScrollTop
      );
    };

    const handleScroll = (event) => {
      const scrollTop = getScrollTop(event);
      const shouldAddDown = scrollTop > 30;

      setIsDown(shouldAddDown);

      if (headerRef.current) {
        headerRef.current.classList.toggle("down", shouldAddDown);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, true);

    const gatsbyWrapper = document.querySelector("#gatsby-focus-wrapper");
    const mainElement = document.querySelector("main");

    if (gatsbyWrapper) {
      gatsbyWrapper.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, true);

      if (gatsbyWrapper) {
        gatsbyWrapper.removeEventListener("scroll", handleScroll);
      }

      if (mainElement) {
        mainElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`site-header${isDown ? " down" : ""}`}
    >
      <div className="header-inner">
        <Link to="/" className="logo-wrap">
          <img src={logo} alt="Dr. Manojkumar Gaddikeri" />
        </Link>

        <nav className="main-nav">
          <Link to="/about/" activeClassName="active">
            About
          </Link>

          <Link
            to="/spine-conditions/"
            className={isActive("/spine-conditions/") ? "active" : ""}
          >
            Spine Conditions
          </Link>

          <Link
            to="/treatments/"
            activeClassName="active"
            partiallyActive={true}
          >
            Treatments
          </Link>

          <Link to="/patient-journey/" activeClassName="active">
            Patient Journey
          </Link>

          <Link
            to="/insights/"
            className={isActive("/insights/") ? "active" : ""}
          >
            Insights
          </Link>
        </nav>
        <Link
          to="/contact/"
          className={`header-btn ${isActive("/contact/") ? "active" : ""}`}
        >
          Reach Out
        </Link>




        <button
          type="button"
          className={`spine-menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="spine-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      <div className={`mobile-menu-wrap ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-panel">
          <nav className="mobile-nav">
            <Link to="/about/" activeClassName="active">
              About
            </Link>

            <Link
              to="/spine-conditions/"
              className={isActive("/spine-conditions/") ? "active" : ""}
            >
              Spine Conditions
            </Link>

            <Link
              to="/treatments/"
              activeClassName="active"
              partiallyActive={true}
            >
              Treatments
            </Link>

            <Link to="/patient-journey/" activeClassName="active">
              Patient Journey
            </Link>

            <Link
              to="/insights/"
              className={isActive("/insights/") ? "active" : ""}
            >
              Insights
            </Link>

            <Link
              to="/contact/"
              className={`mobile-reach-btn ${isActive("/contact/") ? "active" : ""
                }`}
            >
              Reach Out
            </Link>


          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;