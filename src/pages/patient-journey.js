import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SymptomsHorizontal from "../components/SymptomsHorizontal";

import patientJourneyHero from "../images/about-hero.webp";
const surgeryConsideredItems = [
  {
    number: "1",
    title: "Symptoms Persist Despite Non-Surgical Treatment",
  },
  {
    number: "2",
    title: "Nerve Compression Causes Weakness Or Significant Pain",
  },
  {
    number: "3",
    title: "Structural Problems In The Spine Require Correction",
  },
];

const patientOutcomes = [
  {
    icon: "pain",
    title: "Reduced Back Or Neck Pain",
  },
  {
    icon: "mobility",
    title: "Improved Mobility And Flexibility",
  },
  {
    icon: "tingling",
    title: "Relief From Tingling Or Numbness",
  },
  {
    icon: "daily",
    title: "Greater Comfort In Daily Activities",
  },
  {
    icon: "work",
    title: "Easier Return To Work And Routines",
  },
];

const healthFocusItems = [
  {
    number: "1",
    title: "Posture, Ergonomics & Daily Habits",
  },
  {
    number: "2",
    title: "Strengthening & Spine Support Exercises",
  },
  {
    number: "3",
    title: "Early Recognition & Timely Care",
  },
];

const JourneyIcon = () => {
  return (
    <span className="journey-icon">
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
  );
};

const PatientJourneyPage = () => {
  return (
    <Layout>
      <main className="patient-journey-page">
        {/* Hero Section */}
        <section className="patient-journey-hero">
          <img
            src={patientJourneyHero}
            alt="Patient journey spine care"
            className="patient-journey-hero-bg"
          />

          <div className="patient-journey-hero-content">
            <h1>
              Supporting Patients Through <br />
              Every Step Of Spine Care
            </h1>

            <p>
              From the first consultation to recovery and follow-up care, the
              focus is on helping patients feel informed, supported, and
              confident throughout their treatment journey.
            </p>
          </div>
        </section>

        {/* Listening Section */}
        <section className="journey-listening-section">
          <div className="container">
            <h2>Care That Begins With Listening</h2>

            <div className="journey-listening-copy">
              <p>
                Spine conditions can affect everyday life in ways that are often
                difficult to explain: persistent pain, limited movement, or
                symptoms that interrupt sleep, work, or routine activities.
              </p>

              <p>
                Every consultation begins with understanding the patient’s
                symptoms in detail. The goal is not only to identify the
                underlying condition but also to understand how it is affecting
                daily life.
              </p>

              <p>
                Treatment plans are developed after careful clinical evaluation,
                imaging when necessary, and discussion of the available options.
                In many cases, non-surgical treatments are considered first
                before exploring surgical solutions.
              </p>

              <strong>
                The focus is always on clear communication, informed
                decision-making, and care that is tailored to the patient’s
                specific condition.
              </strong>
            </div>
          </div>
        </section>

        {/* Patient Sharing Section */}
     <SymptomsHorizontal />


                {/* Treatment Approach Section */}
        <section className="about-treatment-section">
          <div className="container">
            <h2>Approach To Treatment</h2>

            <p className="about-treatment-intro">
              One of the most common questions patients have is whether surgery
              will be required. In many situations, spine conditions can be
              treated without surgery. Physiotherapy, strengthening exercises,
              posture correction, and medication may help reduce symptoms and
              improve function.
            </p>

            <h3 className="surgery-considered-title">
              Surgery is considered when
            </h3>

            <div className="surgery-considered-grid">
              {surgeryConsideredItems.map((item) => (
                <div className="surgery-considered-card" key={item.number}>
                  <span className="surgery-number">{item.number}</span>
                  <h4>{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default PatientJourneyPage;