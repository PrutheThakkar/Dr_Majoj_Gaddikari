import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import aboutHero from "../images/about-hero.webp";
import doctorImg from "../images/about-dr.webp";

const expertiseItems = [
  "Slipped Or Herniated Discs",
  "Sciatica And Nerve Compression",
  "Spinal Stenosis",
  "Degenerative Disc Disease",
  "Scoliosis And Spinal Deformities",
  "Spine Trauma And Fractures",
  "Minimally Invasive Spine Surgery",
  "Endoscopic Spine Procedures",
];

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

const diagnosisSteps = [
  {
    number: "1",
    title: "Detailed Discussion Of Symptoms",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "2",
    title: "Physical Examination",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "3",
    title: "Review Of MRI Or CT Scans",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "4",
    title: "Explanation Of Diagnosis",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "5",
    title: "Discussion Of Treatment Options",
    image:
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200&q=80",
  },
];

const ConsultationDiagnosisScroll = () => {
  const sectionRef = useRef(null);

  const activeIndexRef = useRef(0);
  const revealedIndexRef = useRef(0);
  const revealedProgressRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedIndex, setRevealedIndex] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${diagnosisSteps.length * 520}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (diagnosisSteps.length - 1),
          duration: { min: 0.18, max: 0.35 },
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const nextIndex = Math.min(
            diagnosisSteps.length - 1,
            Math.round(self.progress * (diagnosisSteps.length - 1))
          );

          if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }

          if (nextIndex > revealedIndexRef.current) {
            revealedIndexRef.current = nextIndex;
            setRevealedIndex(nextIndex);
          }

          const nextLineProgress = self.progress * 100;

          if (nextLineProgress > revealedProgressRef.current) {
            revealedProgressRef.current = nextLineProgress;
            setLineProgress(nextLineProgress);
          }
        },
        onLeaveBack: () => {
          activeIndexRef.current = 0;
          revealedIndexRef.current = 0;
          revealedProgressRef.current = 0;

          setActiveIndex(0);
          setRevealedIndex(0);
          setLineProgress(0);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="consultation-diagnosis-scroll" ref={sectionRef}>
      <div className="consultation-diagnosis-inner">
        <h2>Consultation And Diagnosis</h2>

        <p className="consultation-diagnosis-intro">
          A spine consultation involves understanding the patient’s symptoms as
          well as reviewing imaging studies.
        </p>

        <div className="diagnosis-scroll-card">
          <div className="diagnosis-scroll-image-wrap">
            <img
              key={activeIndex}
              src={diagnosisSteps[activeIndex].image}
              alt={diagnosisSteps[activeIndex].title}
              className="diagnosis-scroll-image"
            />
          </div>

          <div className="diagnosis-steps-wrap">
            <span className="diagnosis-line"></span>

            <span
              className="diagnosis-line-progress"
              style={{ height: `${lineProgress}%` }}
            ></span>

            {diagnosisSteps.map((step, index) => (
              <div
                key={step.number}
                className={`diagnosis-step ${
                  index <= revealedIndex ? "is-complete" : ""
                } ${activeIndex === index ? "active" : ""}`}
              >
                <span className="diagnosis-number">{step.number}</span>
                <h3>{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <Layout>
      <main className="about-page">
        {/* Hero Section */}
        <section className="about-hero-section">
          <div className="about-hero-bg">
            <img src={aboutHero} alt="Spine care background" />
          </div>

          <div className="about-hero-content">
            <h1>About Dr. Gaddikeri</h1>

            <p>
              Dr. Manojkumar Gaddikeri brings a focused and thoughtful approach
              to spine care, with experience in diagnosing and treating a wide
              range of spinal conditions. His work centres on understanding each
              patient’s concerns and offering treatment plans that are precise,
              minimally invasive, and tailored to long-term recovery.
            </p>
          </div>
        </section>

        {/* Doctor Intro Section */}
        <section className="about-doctor-detail-section">
          <div className="container">
            <h2>
              Spine Problems Can Affect How People Move, Work, And Perform
              Everyday Activities
            </h2>

            <div className="about-doctor-image-wrap">
              <img
                src={doctorImg}
                alt="Dr. Manojkumar Gaddikeri"
                className="about-doctor-main-img"
              />
            </div>

            <div className="about-doctor-copy">
              <p>
                Dr. Manojkumar Gaddikeri is an orthopaedic spine surgeon who
                focuses on diagnosing and treating conditions affecting the
                spine. His work includes managing common spine problems such as
                slipped discs and sciatica, as well as more complex conditions
                involving nerve compression, spinal instability, or deformity.
              </p>

              <p>
                The aim of treatment is to identify the source of symptoms and
                guide patients toward the most effective treatment option.
              </p>
            </div>
          </div>
        </section>

        {/* Medical Background Section */}
        <section className="medical-background-section">
          <div className="container">
            <h2>Medical Background</h2>

            <div className="medical-bg-layout">
              <div className="medical-bg-copy">
                <p>
                  Dr. Gaddikeri trained in orthopaedic surgery before developing
                  a specialised focus on spinal disorders. His experience
                  includes evaluating and treating a wide range of spine
                  conditions across different age groups and activity levels.
                  Over time, his work has focused increasingly on conditions
                  involving nerve compression, disc problems, and degenerative
                  changes in the spine. His training includes experience in
                  advanced spine procedures and minimally invasive surgical
                  techniques.
                </p>
              </div>
            </div>

            <div className="expertise-area-wrap">
              <h2>Areas of Expertise</h2>

              <div className="expertise-grid">
                {expertiseItems.map((item, index) => (
                  <div className="expertise-card" key={index}>
                    <span className="expertise-icon">
                      <svg
                        width="34"
                        height="34"
                        viewBox="0 0 34 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 3C14.8 6.1 14.8 8.5 17 11.5C19.2 14.5 19.2 17 17 20C14.8 23 14.8 25.9 17 31"
                          stroke="#0c3048"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 7H20.5M13 12H23M10.5 17H21.5M13 22H23.5M10 27H20.5"
                          stroke="#0c3048"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>

                    <h3>{item}</h3>
                  </div>
                ))}
              </div>

              <p className="expertise-bottom-text">
                These conditions often require careful evaluation because
                multiple structures in the spine may be involved.
              </p>

              <a href="#contact" className="about-page-btn">
                Book a consultation
              </a>
            </div>
          </div>
        </section>

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

        {/* Consultation Diagnosis Scroll Section */}
        <ConsultationDiagnosisScroll />
      </main>
    </Layout>
  );
};

export default AboutPage;