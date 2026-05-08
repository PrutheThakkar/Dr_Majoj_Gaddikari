import React, { useState } from "react";
import Layout from "../components/layout";

import contactHero from "../images/about-hero.webp";
import consultationImg from "../images/about-hero.webp";

const contactCards = [
  {
    title: "Consultation Hours",
    text: (
      <>
        Monday – Saturday <br />
        Timings As Per Hospital Schedule
      </>
    ),
  },
  {
    title: "Appointment Desk",
    text: <>Phone: +91 9986631541</>,
  },
  {
    title: "What To Bring",
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
    email: "",
    preferredDate: "",
    inquiryType: "",
    message: "",
  });

  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          phone: formValues.phone,
          email: formValues.email,
          message: `
Preferred Date: ${formValues.preferredDate}
Type of Inquiry: ${formValues.inquiryType}

Message:
${formValues.message}
          `,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data?.message || "Something went wrong");
      }

      setFormValues({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        preferredDate: "",
        inquiryType: "",
        message: "",
      });

      setFormMessage("Thank you. Your consultation request has been sent.");
    } catch (error) {
      console.error("Contact form error:", error);
      setFormMessage(
        "There was an error sending your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <main className="contact-page">
        {/* Hero */}
        <section className="contact-hero-section">
          <img
            src={contactHero}
            alt="Book a consultation"
            className="contact-hero-bg"
          />

          <div className="contact-hero-content">
            <h1>Book A Consultation</h1>

            <p>
              Speak with our team for appointments, spine evaluation, and
              consultation support.
            </p>
          </div>
        </section>

        {/* Book Consultation */}
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
              {contactCards.map((item, index) => (
                <div className="consultation-info-card" key={index}>
                  <span className="consultation-info-icon">
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 4C15.2 6.6 15.2 9.2 17 11.8C18.8 14.4 18.8 17 17 19.6C15.2 22.2 15.2 25.1 17 30"
                        stroke="#102f45"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11 8H20.5M13.5 13H23M11.5 18H21.5M13.5 23H23M11 28H20.5"
                        stroke="#102f45"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            <div className="contact-main-card">
              <div className="contact-main-left">
                <img
                  src={consultationImg}
                  alt="Doctor consultation"
                  className="contact-consultation-img"
                />

                <h3>
                  Visit Wockhardt Hospitals, Mira Road for consultations,
                  evaluation, and advanced spine care
                </h3>

                <a
                  href="https://www.google.com/maps/search/Wockhardt+Hospitals+Mira+Road"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-small-btn"
                >
                  Get Direction
                </a>
              </div>

              <div className="contact-main-right">
                <h2>Get in Touch</h2>

                <form className="contact-booking-form" onSubmit={handleSubmit}>
                  <div className="contact-form-grid">
                    <input
                      type="text"
                      name="firstName"
                      value={formValues.firstName}
                      onChange={handleChange}
                      placeholder="First Name*"
                      required
                    />

                    <input
                      type="text"
                      name="lastName"
                      value={formValues.lastName}
                      onChange={handleChange}
                      placeholder="Last Name*"
                      required
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      placeholder="Phone Number*"
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="Email*"
                      required
                    />

                    <input
                      type="text"
                      name="preferredDate"
                      value={formValues.preferredDate}
                      onChange={handleChange}
                      placeholder="Preferred Date*"
                      required
                    />

                    <input
                      type="text"
                      name="inquiryType"
                      value={formValues.inquiryType}
                      onChange={handleChange}
                      placeholder="Type of Inquiry*"
                      required
                    />
                  </div>

                  <textarea
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                    placeholder="Your Message*"
                    rows="7"
                    required
                  ></textarea>

                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Book a Consultation"}
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