import React, { useState } from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
import HeroAnimatedBg from "../components/HeroAnimatedBg";
import doctorImg from "../images/doctor-img.webp";
import treatmentImg from "../images/treatment-approach.webp";
import treatmentImg1 from "../images/strenghening-excises.webp";
import treatmentImg2 from "../images/medication.webp";

import SpineExplained from "../components/SpineExplained";
import SymptomsHorizontal from "../components/SymptomsHorizontal";
import SpineConditions from "../components/SpineConditions";
import Breadcrumb from "../components/Breadcrumb";
import SpinePreloader from "../components/SpinePreloader";

const AnimatedHeroTitle = ({ startAnimation }) => {
  const lines = ["Your Spine Supports Every", "Movement You Make"];
  let letterIndex = 0;

  return (
    <h1
      className={`hero-animated-title ${startAnimation ? "title-animate" : "title-wait"
        }`}
      aria-label="Your Spine Supports Every Movement You Make"
    >
      {lines.map((line, lineIndex) => (
        <span className="hero-title-line" key={lineIndex} aria-hidden="true">
          {line.split(" ").map((word, wordIndex) => (
            <span className="hero-title-word" key={wordIndex}>
              {word.split("").map((letter, index) => {
                const delay = letterIndex * 0.035;
                letterIndex += 1;

                return (
                  <span
                    className="hero-title-letter"
                    key={`${lineIndex}-${wordIndex}-${index}`}
                    style={{
                      animationDelay: startAnimation ? `${delay}s` : "0s",
                    }}
                  >
                    {letter}
                  </span>
                );
              })}

              {wordIndex !== line.split(" ").length - 1 && (
                <span className="hero-title-space">&nbsp;</span>
              )}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
};

const HomePage = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);

    setTimeout(() => {
      setStartHeroAnimation(true);
    }, 120);
  };


  return (
    <>
      {showPreloader && (
        <SpinePreloader onComplete={handlePreloaderComplete} />
      )}

      <Layout>
        <section
          className={`hero-section ${startHeroAnimation ? "hero-ready" : "hero-wait"
            }`}
        >
          <HeroAnimatedBg />

          <div className="hero-content">
            <AnimatedHeroTitle startAnimation={startHeroAnimation} />

            <p className="hero-animated-para">
              The spine supports posture, balance, and almost every movement the
              body makes. When something affects it whether a slipped disc, nerve
              compression, or degenerative change, symptoms can begin to appear
              in different ways.
            </p>

            <Link to="/contact" className="common-btn hero-animated-btn">
              <span className="common-btn-text">Book a Consultation</span>
              <span className="common-btn-icon">→</span>
            </Link>
          </div>

          <Breadcrumb items={[]} />
        </section>

        <section className="about-doctor-section" id="about">
          <div className="container">
            <h2 data-aos="fade-up">About Your Spine Saviour</h2>

            <div className="about-doctor-grid">
              <div className="doctor-image-wrap">
                <div className="doctor-bg-card"></div>
                <img
                  src={doctorImg}
                  alt="Dr. Manojkumar Gaddikeri"
                  className="doctor-img"
                  loading="lazy"
                />
              </div>

              <div className="doctor-content">
                <h3 data-aos="fade-up">
                  Dr. Manojkumar Gaddikeri - Orthopaedic Spine Surgeon
                </h3>

                <h4 data-aos="fade-up">
                  MBBS, MS (Ortho), DNB, ASSI Spine Fellow (Gold Medal)
                </h4>

                <p data-aos="fade-up">
                  Dr. Gaddikeri specialises in diagnosing and treating conditions
                  affecting the spine. His practice focuses on both non-surgical
                  spine care and surgical treatment when required.
                </p>

                <p data-aos="fade-up">
                  A large part of spine care involves careful diagnosis,
                  identifying the exact structure responsible for symptoms, and
                  guiding patients through the most appropriate treatment
                  approach.
                </p>

                <p data-aos="fade-up">
                  Many spine problems improve with physiotherapy, rehabilitation,
                  and medication. When surgery becomes necessary, modern
                  techniques allow targeted procedures designed to relieve nerve
                  pressure and restore stability in the spine.
                </p>

                <Link to="/about" className="common-btn" data-aos="fade-up">
                  <span className="common-btn-text">Read More</span>
                  <span className="common-btn-icon">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SpineExplained />
        <SymptomsHorizontal />
        <SpineConditions />

        <section className="treatment-approach-section" id="treatments">
          <div className="container">
            <h2 data-aos="fade-up">Treatment Approach</h2>

            <p data-aos="fade-up" className="treatment-intro">
              Spine treatment does not always involve surgery.
              <br />
              In many cases, symptoms can improve through conservative care such
              as
            </p>

            <ul data-aos="fade-up">
              <li>
                <div className="treatment-image-wrap">
                  <img src={treatmentImg} alt="Physiotherapy spine treatment" loading="lazy" />
                  <h3>Physiotherapy</h3>
                </div>
              </li>

              <li>
                <div className="treatment-image-wrap">
                  <img
                    src={treatmentImg1}
                    alt="Strengthening exercises spine treatment"
                    loading="lazy"
                  />
                  <h3>strengthening exercises</h3>
                </div>
              </li>

              <li>
                <div className="treatment-image-wrap">
                  <img src={treatmentImg2} alt="Medication spine treatment" loading="lazy" />
                  <h3>medication</h3>
                </div>
              </li>
            </ul>

            <p className="treatment-description" data-aos="fade-up">
              When structural issues in the spine require surgical treatment,
              minimally invasive techniques can allow smaller incisions and
              faster recovery compared to traditional approaches. Treatment
              decisions are based on the diagnosis, severity of symptoms, and how
              the condition is affecting daily life.
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default HomePage;