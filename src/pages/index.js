import React from "react";
import Layout from "../components/layout";

import heroImage from "../images/spine-hero.webp";
import doctorImg from "../images/doctor-img.webp";
import treatmentImg from "../images/treatment-approach.webp";

import SpineExplained from "../components/SpineExplained";
import SymptomsHorizontal from "../components/SymptomsHorizontal";
import SpineConditions from "../components/SpineConditions";
import Breadcrumb from "../components/Breadcrumb";

const HomePage = () => {
  return (
    <Layout>
      <section className="hero-section">
        <div className="hero-bg">
          <img src={heroImage} alt="Spine care visual" />
        </div>

        <div className="hero-content">
          <h1>
            Your Spine Supports <br />Every Movement You Make
          </h1>

          <p>
            The spine supports posture, balance, and almost every movement the body makes.
            When something affects it whether a slipped disc, nerve compression, or
            degenerative change, symptoms can begin to appear in different ways.
          </p>

          <a href="/contact" className="hero-btn">
            Book a consultation
          </a>
        </div>

        <Breadcrumb items={[]} />
      </section>

      <section className="about-doctor-section" id="about">
        <div className="container">
          <h2>About Your Spine Saviour</h2>

          <div className="about-doctor-grid">
            <div className="doctor-image-wrap">
              <div className="doctor-bg-card"></div>
              <img
                src={doctorImg}
                alt="Dr. Manojkumar Gaddikeri"
                className="doctor-img"
              />
            </div>

            <div className="doctor-content">
              <h3>Dr. Manojkumar Gaddikeri - Orthopaedic Spine Surgeon</h3>
              <h4>MBBS, MS (Ortho), DNB, ASSI Spine Fellow (Gold Medal)</h4>

              <p>
                Dr. Gaddikeri specialises in diagnosing and treating conditions affecting the spine.
                His practice focuses on both non-surgical spine care and surgical treatment when required.
              </p>

              <p>
                A large part of spine care involves careful diagnosis, identifying the exact structure responsible for symptoms, and guiding patients
                through the most appropriate treatment approach.
              </p>

              <p>
                Many spine problems improve with physiotherapy, rehabilitation, and medication. When surgery becomes necessary, modern techniques allow targeted procedures designed to relieve nerve pressure and restore stability in the spine.
              </p>

              <a href="#about" className="learn-btn">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <SpineExplained />
      <SymptomsHorizontal />
      <SpineConditions />

      <section className="treatment-approach-section" id="treatments">
        <div className="container">
          <h2>Treatment Approach</h2>

          <p className="treatment-intro">
            Spine treatment does not always involve surgery.
            <br />
            In many cases, symptoms can improve through conservative care such as
          </p>

          <div className="treatment-image-wrap">
            <img src={treatmentImg} alt="Physiotherapy spine treatment" />
          </div>

          <h3>Physiotherapy</h3>

          <p className="treatment-description">
            When structural issues in the spine require surgical treatment, minimally invasive techniques can allow smaller incisions and faster recovery compared to traditional approaches.
            Treatment decisions are based on the diagnosis, severity of symptoms, and how the condition is affecting daily life.
          </p>
        </div>
      </section>
    </Layout> 
  );
};

export default HomePage;