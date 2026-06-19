import React from "react";
import { Link } from "gatsby";
import logo from "../images/Manoj-Website-Logo.svg";


const Footer = () => {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-cta">
        <h2 data-aos="fade-up">
          If spine symptoms are affecting your daily activities,
          <br />a consultation can help identify the cause and explore treatment
          options.
        </h2>

        <a href="/about" className="common-btn">
          <span className="common-btn-text">Learn More</span>
          <span className="common-btn-icon">→</span>
        </a>
      </div>

      <div className="footer-main" data-aos="fade-up">
        <div className="footer-brand">
          <img src={logo} alt="Dr. Manojkumar Gaddikeri" />

          <p>
            Orthopaedic spine surgeon specialising in
            <br />
            personalised, patient-centred spine care
          </p>

          <div className="footer-social">
            <a href="https://www.instagram.com/spinesaviour/" aria-label="Instagram" target="_blank">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.59844 0C0 0 0 0 0 5.60156V13.6016C0 19.2 0 19.2 5.60156 19.2H13.6016C19.2 19.2 19.2 19.2 19.2 13.5984V5.59844C19.2 0 19.2 0 13.5984 0H5.59844ZM15.2 3.2C15.6416 3.2 16 3.5584 16 4C16 4.4416 15.6416 4.8 15.2 4.8C14.7584 4.8 14.4 4.4416 14.4 4C14.4 3.5584 14.7584 3.2 15.2 3.2ZM9.6 4.8C12.2472 4.8 14.4 6.9528 14.4 9.6C14.4 12.2472 12.2472 14.4 9.6 14.4C6.9528 14.4 4.8 12.2472 4.8 9.6C4.8 6.9528 6.9528 4.8 9.6 4.8ZM9.6 6.4C8.75131 6.4 7.93737 6.73714 7.33726 7.33726C6.73714 7.93737 6.4 8.75131 6.4 9.6C6.4 10.4487 6.73714 11.2626 7.33726 11.8627C7.93737 12.4629 8.75131 12.8 9.6 12.8C10.4487 12.8 11.2626 12.4629 11.8627 11.8627C12.4629 11.2626 12.8 10.4487 12.8 9.6C12.8 8.75131 12.4629 7.93737 11.8627 7.33726C11.2626 6.73714 10.4487 6.4 9.6 6.4Z" fill="#005899" />
              </svg>

            </a>
            <a href="https://www.linkedin.com/in/manojkumar-gaddikeri-29a863404" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.4545 0H1.74545C0.781091 0 0 0.781091 0 1.74545V17.4545C0 18.4189 0.781091 19.2 1.74545 19.2H17.4545C18.4189 19.2 19.2 18.4189 19.2 17.4545V1.74545C19.2 0.781091 18.4189 0 17.4545 0ZM6.06895 15.7091H3.4944V7.42516H6.06895V15.7091ZM4.75549 6.24087C3.92553 6.24087 3.2544 5.568 3.2544 4.73978C3.2544 3.91156 3.9264 3.23956 4.75549 3.23956C5.58284 3.23956 6.25571 3.91244 6.25571 4.73978C6.25571 5.568 5.58284 6.24087 4.75549 6.24087ZM15.7126 15.7091H13.1398V11.6806C13.1398 10.7197 13.1223 9.48393 11.8019 9.48393C10.4623 9.48393 10.2563 10.5303 10.2563 11.6108V15.7091H7.68349V7.42516H10.1533V8.55709H10.1882C10.5321 7.90604 11.3716 7.2192 12.624 7.2192C15.2308 7.2192 15.7126 8.93498 15.7126 11.1657V15.7091Z" fill="#005899" />
              </svg>

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
            {/* <a href="">FAQ</a> */}
            <a href="/insights">Blogs</a>
          </div>

          <div className="footer-col footer-contact">
            <h3>Reach Out</h3>

            <a href="#" className="footer-contact-item">
              <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.53162 2.93677C10.7165 1.66727 13.402 1.68946 15.5664 2.99489C17.7095 4.32691 19.012 6.70418 18.9999 9.26144C18.95 11.8019 17.5533 14.19 15.8075 16.0361C14.7998 17.1064 13.6726 18.0528 12.4488 18.856C12.3228 18.9289 12.1848 18.9777 12.0415 19C11.9036 18.9941 11.7693 18.9534 11.6508 18.8814C9.78243 17.6746 8.14333 16.134 6.81233 14.334C5.69859 12.8314 5.06583 11.016 5 9.13442L5.00499 8.86069C5.09592 6.40464 6.4248 4.16093 8.53162 2.93677ZM12.9073 7.03477C12.0191 6.65723 10.995 6.86235 10.3133 7.55435C9.63159 8.24635 9.42664 9.28872 9.79416 10.1948C10.1617 11.1008 11.0292 11.6918 11.9916 11.6918C12.6221 11.6964 13.2282 11.4438 13.6748 10.9905C14.1214 10.5371 14.3715 9.92064 14.3693 9.27838C14.3726 8.29804 13.7955 7.41231 12.9073 7.03477Z" fill="#005899" />
                <path opacity="0.4" d="M12 22C14.7614 22 17 21.5523 17 21C17 20.4477 14.7614 20 12 20C9.23858 20 7 20.4477 7 21C7 21.5523 9.23858 22 12 22Z" fill="#005899" />
              </svg>
              </span>
              Wockhardt Hospitals, Mira Road
            </a>

            <a href="mailto:drmanojgaddikeri@gmail.com" className="footer-contact-item">
              <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_316_5085)">
                  <path d="M20 4H4C2.895 4 2.01 4.895 2.01 6L2 18C2 19.105 2.895 20 4 20H20C21.105 20 22 19.105 22 18V6C22 4.895 21.105 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#005899" />
                </g>
                <defs>
                  <clipPath id="clip0_316_5085">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              </span>
              Email
            </a>

            <a href="tel:+91 9986631541" className="footer-contact-item">
              <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2924 7.13036C10.0581 4.43387 7.24669 3.11079 7.12771 3.05679C7.01648 3.00447 6.89183 2.98775 6.77076 3.00892C3.52514 3.54773 3.03694 5.43785 3.01732 5.5164C2.99061 5.62586 2.99486 5.74059 3.02958 5.84778C6.90078 17.866 14.9462 20.0936 17.5907 20.8264C17.7944 20.8828 17.9624 20.9282 18.09 20.97C18.2356 21.0175 18.3937 21.0083 18.5328 20.9442C18.6137 20.9074 20.5248 20.0065 20.9922 17.0682C21.0129 16.9399 20.9923 16.8084 20.9333 16.6926C20.8916 16.6116 19.8919 14.708 17.1197 14.0354C17.0257 14.0114 16.9272 14.0105 16.8328 14.033C16.7383 14.0554 16.6507 14.1005 16.5776 14.1643C15.703 14.9118 14.4948 15.7083 13.9735 15.7905C10.4788 14.0808 8.52728 10.8001 8.45368 10.1779C8.41075 9.82807 9.21173 8.5995 10.1329 7.60044C10.1908 7.53756 10.2349 7.46325 10.2624 7.38229C10.2898 7.30133 10.3001 7.21551 10.2924 7.13036Z" fill="#005899" />
              </svg>
              </span>
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