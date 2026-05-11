import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import logo from "../images/Manoj-Website-Logo.svg";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <header className="site-header">
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

         <Link to="/treatments/" activeClassName="active" partiallyActive={true}>
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
      </div>
    </header>
  );
};

export default Header;