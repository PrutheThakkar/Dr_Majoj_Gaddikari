import React, { useState } from "react";
import Layout from "../components/layout";

import contactHero from "../images/about-hero.webp";
import Breadcrumb from "../components/Breadcrumb";

const ConsultationHoursIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <circle cx="40" cy="40" r="40" fill="#d6e97b" />
    <g stroke="#4b5726" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="40" cy="38" r="23" /><circle cx="40" cy="36" r="16" />
      <path d="M40 25v12l8 5M37 53v8m6-8v8m-8 0h10" />
    </g>
  </svg>
);
const AppointmentDeskIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <circle cx="40" cy="40" r="40" fill="#d6e97b" />
    <g stroke="#4b5726" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="40" cy="26" r="5" /><path d="m36 31-6 5v10m14-15 6 5v10M35 37v7h10v-7M26 46h28v16H26zM33 40l7 3 7-3M39 33l1 5 1-5" />
    </g>
  </svg>
);
const WhatToBringIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <circle cx="40" cy="40" r="40" fill="#d6e97b" />
    <g stroke="#4b5726" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="20" y="29" width="41" height="31" rx="3" /><path d="M30 29v-7h20v7M20 40h41M27 40V29h12l7 7v4M30 33h8m-8 4h9M35 40v5h10v-5" />
    </g>
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
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    preferredDate: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};

    const firstName = formValues.firstName.trim();
    const lastName = formValues.lastName.trim();
    const phone = formValues.phone.trim();
    const message = formValues.message.trim();

    const phoneRegex = /^[0-9]{10}$/;

    if (!firstName) {
      errors.firstName = "First name is required";
    }

    if (!lastName) {
      errors.lastName = "Last name is required";
    }

    if (!formValues.preferredDate) {
      errors.preferredDate = "Preferred date is required";
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
          phone: formValues.phone.trim(),
          message: formValues.preferredDate
            ? `Preferred date: ${formValues.preferredDate}\n\n${formValues.message.trim()}`
            : formValues.message.trim(),
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
            phone: "",
        preferredDate: "",
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
              <h2>Book A Consultation</h2>

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

              </div>

              <div className="contact-main-right">
                <h2>Get In Touch</h2>

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
                    <div className="contact-field">
                      <input
                        type="text"
                        onFocus={(event) => { event.currentTarget.type = "date"; }}
                        onBlur={(event) => { if (!event.currentTarget.value) event.currentTarget.type = "text"; }}
                        placeholder="Preferred Date*"
                        name="preferredDate"
                        aria-label="Preferred date"
                        value={formValues.preferredDate}
                        onChange={handleChange}
                      />
                      {formErrors.preferredDate && <span className="field-error">{formErrors.preferredDate}</span>}
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