import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AppointmentForm = () => {
  const [formMessage, setFormMessage] = useState("");

  const validationSchema = Yup.object({
    firstName: Yup.string().trim().required("First Name is required"),
    lastName: Yup.string().trim().required("Last Name is required"),
    email: Yup.string()
      .trim()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .trim()
      .matches(/^[0-9]{10}$/, "Enter a valid 10 digit phone number")
      .required("Phone Number is required"),
    message: Yup.string().trim().required("Message is required"),
  });

  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setFormMessage("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          message: values.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      console.log("API response:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data?.details || data?.message || "Something went wrong"
        );
      }

      resetForm();

      setFormMessage(
        "Thank you! Your message has been sent. We'll get back to you shortly."
      );
    } catch (error) {
      console.error("Form submit error:", error);

      setFormMessage(
        error?.message ||
          "There was an error trying to send your message. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="appointment-form" noValidate>
          <div className="form-group">
            <Field type="text" name="firstName" placeholder="First Name" />
            <ErrorMessage name="firstName" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field type="text" name="lastName" placeholder="Last Name" />
            <ErrorMessage name="lastName" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field type="tel" name="phone" placeholder="Phone Number" />
            <ErrorMessage name="phone" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field
              as="textarea"
              name="message"
              rows="3"
              placeholder="Your Message"
            />
            <ErrorMessage name="message" component="div" className="error" />
          </div>

          <div className="btn-wrap">
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Consult Now"}
            </button>
          </div>

          {formMessage && (
            <div
              className={`form-response ${
                formMessage.startsWith("Thank you") ? "success" : "error"
              }`}
            >
              {formMessage}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AppointmentForm;