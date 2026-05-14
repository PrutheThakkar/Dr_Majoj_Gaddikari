import React from "react";
import { Link } from "gatsby";
import logo from "../images/Manoj-Website-Logo.svg";


const Footer = () => {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-cta">
        <h2>
          If spine symptoms are affecting your daily activities,
          <br />a consultation can help identify the cause and explore treatment
          options.
        </h2>

       <a href="/about" className="common-btn">
        <span className="common-btn-text">Learn More</span>
        <span className="common-btn-icon">→</span>
      </a>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <img src={logo} alt="Dr. Manojkumar Gaddikeri" />

          <p>
            Orthopaedic spine surgeon specialising in
            <br />
            personalised, patient-centred spine care
          </p>

          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              ◎
            </a>
            <a href="#" aria-label="LinkedIn">
              in
            </a>
          </div>
        </div>

        <div className="footer-links-wrap">
          <div className="footer-col">
            <h3>Home</h3>
            <a href="/about">About</a>
            <a href="/spine-conditions">Spine Conditions</a>
            <a href="/treatments">Treatments</a>
            <a href="/patient-journey">Patient Journey</a>
          </div>

          <div className="footer-col">
            <h3>Explore</h3>
            <a href="#faq">FAQ</a>
            <a href="#blogs">Blogs</a>
          </div>

          <div className="footer-col footer-contact">
            <h3>Reach Out</h3>

            <a href="#" className="footer-contact-item">
              <span>●</span>
              Wockhardt Hospitals, Mira Road
            </a>

            <a href="mailto:example@email.com" className="footer-contact-item">
              <span>✉</span>
              Email
            </a>

            <a href="tel:+910000000000" className="footer-contact-item">
              <span>☎</span>
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="footer-line"></div>
    </footer>
  );
};

export default Footer;