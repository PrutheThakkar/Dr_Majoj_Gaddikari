import React from "react";
import logo from "../images/Manoj-Website-Logo.svg";

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="logo-wrap">
          <img src={logo} alt="Dr. Manojkumar Gaddikeri" />
        </a>

        <nav className="main-nav">
          <a href="/about">About</a>
          <a href="#spine-conditions">Spine Conditions</a>
          <a href="#treatments">Treatments</a>
          <a href="#patient-journey">Patient Journey</a>
          <a href="#insights">Insights</a>
        </nav>

        <a href="#contact" className="header-btn">
          Reach Out
        </a>
      </div>
    </header>
  );
};

export default Header;