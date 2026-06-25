import React, { useState } from "react";
import Layout from "../components/layout";
import { useLocation } from "@reach/router";

import contactHero from "../images/about-hero.webp";
import Breadcrumb from "../components/Breadcrumb";

const ConsultationHoursIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <rect width="80" height="80" rx="40" fill="#AFD300" fillOpacity="0.5" />
    <path
      d="M40 17C27.3 17 17 27.3 17 40C17 52.7 27.3 63 40 63C52.7 63 63 52.7 63 40C63 27.3 52.7 17 40 17ZM40 58C30.1 58 22 49.9 22 40C22 30.1 30.1 22 40 22C49.9 22 58 30.1 58 40C58 49.9 49.9 58 40 58Z"
      fill="#0067A8"
    />
    <path
      d="M42 28H38V42L49 49L51 45.7L42 40.4V28Z"
      fill="#AFD300"
    />
  </svg>
);

const AppointmentDeskIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <rect width="80" height="80" rx="40" fill="#AFD300" fillOpacity="0.5" />
    <path
      d="M25 24H55C57.2 24 59 25.8 59 28V56C59 58.2 57.2 60 55 60H25C22.8 60 21 58.2 21 56V28C21 25.8 22.8 24 25 24Z"
      fill="#0067A8"
    />
    <path d="M29 20H34V30H29V20Z" fill="#AFD300" />
    <path d="M46 20H51V30H46V20Z" fill="#AFD300" />
    <path d="M27 36H53V41H27V36Z" fill="#fff" />
    <path d="M27 46H44V51H27V46Z" fill="#fff" />
  </svg>
);

const WhatToBringIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <rect width="80" height="80" rx="40" fill="#AFD300" fillOpacity="0.5" />
    <path
      d="M27 21H53C55.2 21 57 22.8 57 25V58C57 60.2 55.2 62 53 62H27C24.8 62 23 60.2 23 58V25C23 22.8 24.8 21 27 21Z"
      fill="#0067A8"
    />
    <path d="M31 32H49V36H31V32Z" fill="#fff" />
    <path d="M31 42H49V46H31V42Z" fill="#fff" />
    <path d="M31 52H42V56H31V52Z" fill="#fff" />
    <path
      d="M35 18H45C46.7 18 48 19.3 48 21V25H32V21C32 19.3 33.3 18 35 18Z"
      fill="#AFD300"
    />
  </svg>
);

const contactCards = [
  {
    title: "Consultation Hours",
    Icon: ConsultationHoursIcon,
    text: (
      <>
        Monday – Saturday <br />
        Timings As Per Hospital Schedule
      </>
    ),
  },
  {
    title: "Appointment Desk",
    Icon: AppointmentDeskIcon,
    text: <>Phone: +91 9986631541</>,
  },
  {
    title: "What To Bring",
    Icon: WhatToBringIcon,
    text: (
      <>
        • Previous Medical Reports <br />
        • MRI / CT / X-Ray Scans If Available <br />
        • Current Medication List
      </>
    ),
  },
];

const ContactPage = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};

    const firstName = formValues.firstName.trim();
    const lastName = formValues.lastName.trim();
    const email = formValues.email.trim();
    const phone = formValues.phone.trim();
    const message = formValues.message.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!firstName) {
      errors.firstName = "First name is required";
    }

    if (!lastName) {
      errors.lastName = "Last name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email address";
    }

    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
      errors.phone = "Enter a valid 10 digit phone number";
    }

    if (!message) {
      errors.message = "Message is required";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormMessage("");

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formValues.firstName.trim(),
          lastName: formValues.lastName.trim(),
          email: formValues.email.trim(),
          phone: formValues.phone.trim(),
          message: formValues.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      console.log("API response:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data?.details || data?.message || "Something went wrong"
        );
      }

      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      setFormErrors({});
      setFormMessage("Thank you. Your consultation request has been sent.");
    } catch (error) {
      console.error("Contact form error:", error);

      setFormMessage(
        error?.message ||
          "There was an error sending your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <main className="contact-page">
        <section className="contact-hero-section">
          <img
            src={contactHero}
            alt="Book a consultation"
            className="contact-hero-bg"
            loading="lazy"
          />

          <div className="contact-hero-content">
            <h1>Book A Consultation</h1>

            <p>
              Speak with our team for appointments, spine evaluation, and
              consultation support.
            </p>
          </div>

          <Breadcrumb items={[{ label: "Contact" }]} />
        </section>

        <section className="book-consultation-section" id="contact">
          <div className="container">
            <div className="book-consultation-heading">
              <h2>Book a Consultation</h2>

              <p>
                For appointments or consultation enquiries, patients can contact
                the hospital directly or schedule a visit through the appointment
                desk.
              </p>
            </div>

            <div className="consultation-info-grid">
              {contactCards.map((item) => {
                const Icon = item.Icon;

                return (
                  <div className="consultation-info-card" key={item.title}>
                    <span className="consultation-info-icon">
                      <Icon />
                    </span>

                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="contact-main-card">
              <div className="contact-main-left">
                <div className="map-wrapper">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.824484544444!2d72.8361399!3d19.166667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6c9f8c9f8c9%3A0x3be7c6c9f8c9f8c9!2sWockhardt%20Hospital%2C%20Mira%20Road!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Wockhardt Hospital Mira Road"
                  ></iframe>
                </div>

                <h3>
                  Visit Wockhardt Hospital, Mira Road for advanced spine case.
                </h3>

                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.google.com/maps/search/Wockhardt+Hospitals+Mira+Road"
                  className={`common-btn contact-btn ${
                    isActive("/contact/") ? "active" : ""
                  }`}
                >
                  <span className="common-btn-text">Get Direction</span>
                  <span className="common-btn-icon">→</span>
                </a>
              </div>

              <div className="contact-main-right">
                <h2>Get in Touch</h2>

                <form
                  className="contact-booking-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="contact-form-grid">
                    <div className="contact-field">
                      <input
                        type="text"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={handleChange}
                        placeholder="First Name*"
                      />

                      {formErrors.firstName && (
                        <span className="field-error">
                          {formErrors.firstName}
                        </span>
                      )}
                    </div>

                    <div className="contact-field">
                      <input
                        type="text"
                        name="lastName"
                        value={formValues.lastName}
                        onChange={handleChange}
                        placeholder="Last Name*"
                      />

                      {formErrors.lastName && (
                        <span className="field-error">
                          {formErrors.lastName}
                        </span>
                      )}
                    </div>

                    <div className="contact-field">
                      <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Email*"
                      />

                      {formErrors.email && (
                        <span className="field-error">{formErrors.email}</span>
                      )}
                    </div>

                    <div className="contact-field">
                      <input
                        type="tel"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                        placeholder="Phone Number*"
                      />

                      {formErrors.phone && (
                        <span className="field-error">{formErrors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="contact-field">
                    <textarea
                      name="message"
                      value={formValues.message}
                      onChange={handleChange}
                      placeholder="Your Message*"
                      rows="7"
                    ></textarea>

                    {formErrors.message && (
                      <span className="field-error">{formErrors.message}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="common-btn contact-btn"
                    disabled={isSubmitting}
                  >
                    <span className="common-btn-text">
                      {isSubmitting ? "Sending..." : "Book a Consultation"}
                    </span>
                    <span className="common-btn-icon">→</span>
                  </button>

                  {formMessage && (
                    <p
                      className={`contact-form-message ${
                        formMessage.startsWith("Thank you")
                          ? "success"
                          : "error"
                      }`}
                    >
                      {formMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ContactPage;