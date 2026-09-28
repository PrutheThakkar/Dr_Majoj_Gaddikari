import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
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

const defaultHeroTitle = "Your Spine Supports Every Movement You Make";

const cleanText = (value) => {
  if (!value) return "";

  return String(value)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
};

const getHeroTitleLines = (title) => {
  const text = cleanText(title) || defaultHeroTitle;

  const explicitLines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (explicitLines.length > 1) return explicitLines;

  const words = text.split(" ");
  const middle = Math.ceil(words.length / 2);

  return [
    words.slice(0, middle).join(" "),
    words.slice(middle).join(" "),
  ].filter(Boolean);
};

const AnimatedHeroTitle = ({ startAnimation, title }) => {
  const lines = getHeroTitleLines(title);
  let letterIndex = 0;

  return (
    <h1
      className={`hero-animated-title ${
        startAnimation ? "title-animate" : "title-wait"
      }`}
      aria-label={lines.join(" ")}
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

const HomePage = ({ data }) => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);

  const pageData = data?.allWpPage?.edges?.[0]?.node?.homePagenew;

  const bannerImage = getImage(pageData?.bannerImageDesk?.node?.gatsbyImage);
  const bannerAlt = pageData?.bannerImageDesk?.node?.altText || "";

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
          className={`hero-section ${
            startHeroAnimation ? "hero-ready" : "hero-wait"
          }`}
        >
          <HeroAnimatedBg />

          {bannerImage && (
            <GatsbyImage
              image={bannerImage}
              alt={bannerAlt}
              className="hero-banner-image"
            />
          )}

          <div className="hero-content">
            <AnimatedHeroTitle
              startAnimation={startHeroAnimation}
              title={pageData?.homePageBannerTitle}
            />

            <p
              className="hero-animated-para"
              dangerouslySetInnerHTML={{
                __html:
                  pageData?.homePageBannerPara ,
              }}
            />

            <Link to="/contact" className="common-btn hero-animated-btn">
              <span className="common-btn-text">Book a Consultation</span>
              <span className="common-btn-icon">→</span>
            </Link>
          </div>

          <Breadcrumb items={[]} />
        </section>

        <section className="about-doctor-section" id="about">
          <div className="container">
            <h2 data-aos="fade-up">
              {pageData?.aboutSectionTitle?.replace("About Your Spine Saviour", "About The Doctor") || "About The Doctor"}
            </h2>

            <div className="about-doctor-grid">
              <div className="doctor-image-wrap">
                <img
                  src={doctorImg}
                  alt="Dr. Manojkumar Gaddikeri"
                  className="doctor-img"
                  loading="lazy"
                />
              </div>

              <div className="doctor-content">
                <h3 data-aos="fade-up">
                  {cleanText(pageData?.aboutSectionSubtitle).split(/\s+[-–—]\s+/)[0] ||
                    "Dr. Manojkumar Gaddikeri"}
                </h3>

                <p className="doctor-specialty" data-aos="fade-up">
                  Orthopaedic Spine Surgeon
                </p>

                {pageData?.aboutSectionParagraph && (
                  <div
                    data-aos="fade-up"
                    className="about-section-paragraph"
                    dangerouslySetInnerHTML={{
                      __html: pageData.aboutSectionParagraph,
                    }}
                  />
                )}

                <dl className="doctor-credentials" data-aos="fade-up">
                  {[
                    ["9+", "Years Of Experience"],
                    ["5000+", "Patients Treated"],
                    ["Gold Medal", "ASSI Spine Fellowship"],
                    ["Advanced", "Minimally Invasive Surgery"],
                  ].map(([value, label]) => (
                    <div className="doctor-credential" key={label}>
                      <dt>{value}</dt>
                      <dd>{label}</dd>
                    </div>
                  ))}
                </dl>

                <Link to="/about" className="common-btn" data-aos="fade-up">
                  <span className="common-btn-text">View Full Profile</span>
                  <span className="common-btn-icon">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SpineExplained />

        <SymptomsHorizontal symptomsList={pageData?.symptomsList} />

        <SpineConditions />

        <section className="treatment-approach-section" id="treatments">
          <div className="container">
            <h2 data-aos="fade-up">Treatment Approach</h2>

            <p data-aos="fade-up" className="treatment-intro">
              Spine treatment does not always involve surgery. In many cases, symptoms can improve through conservative care such
              as
            </p>

            <ul data-aos="fade-up">
              <li>
                <div className="treatment-image-wrap">
                  <img
                    src={treatmentImg}
                    alt="Physiotherapy spine treatment"
                    loading="lazy"
                  />
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
                  <h3>Strengthening exercises</h3>
                </div>
              </li>

              <li>
                <div className="treatment-image-wrap">
                  <img
                    src={treatmentImg2}
                    alt="Medication spine treatment"
                    loading="lazy"
                  />
                  <h3>Medication</h3>
                </div>
              </li>
            </ul>

            {/* <p className="treatment-description" data-aos="fade-up">
              When structural issues in the spine require surgical treatment,
              minimally invasive techniques can allow smaller incisions and
              faster recovery compared to traditional approaches. Treatment
              decisions are based on the diagnosis, severity of symptoms, and how
              the condition is affecting daily life.
            </p> */}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default HomePage;

export const query = graphql`
  query HomePageQuery {
    allWpPage(filter: { databaseId: { eq: 69 } }) {
      edges {
        node {
          id
          databaseId
          title
          homePagenew {
            homePageBannerTitle
            homePageBannerPara
            bannerImageDesk {
              node {
                altText
                gatsbyImage(
                  layout: FULL_WIDTH
                  width: 1920
                  placeholder: BLURRED
                  quality: 90
                )
              }
            }
            aboutSectionTitle
            aboutSectionSubtitle
            aboutSectionSubtitleText
            aboutSectionParagraph
            symptomsList {
              title
              subtitle
              svg
            }
          }
        }
      }
    }
  }
`;
