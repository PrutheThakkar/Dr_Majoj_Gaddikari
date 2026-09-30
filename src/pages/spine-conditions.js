import React, { useEffect, useRef } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import spineConditionsHero from "../images/about-hero.webp";
import Breadcrumb from "../components/Breadcrumb";
import spineTumorsIcon from "../images/Spine-Tumors.svg";

// Condition Icon Component (Using SVG code from `svgCode`)
const ConditionIcon = ({ svgCode, title }) => {
  if (/spine tumou?rs?/i.test(title)) {
    return (
      <span className="condition-icon">
        <img src={spineTumorsIcon} alt="" width="88" height="88" />
      </span>
    );
  }
  return (
    <span className="condition-icon" dangerouslySetInnerHTML={{ __html: svgCode }} />
  );
};

const SpineConditionsPage = ({ data }) => {
  const cardsRef = useRef(null);

  useEffect(() => {
    const list = cardsRef.current;
    const header = document.querySelector(".site-header");
    const cards = Array.from(list.children);
    const updateStack = () => {
      const top = (header?.getBoundingClientRect().height || 80) + 20;
      list.style.setProperty("--stack-top", `${top}px`);
      // Tall cards stay in normal flow so none of their content is trapped.
      cards.forEach((card) => {
        card.classList.toggle("can-stack", card.offsetHeight < window.innerHeight - top - 24);
      });
    };
    updateStack();
    const observer = new ResizeObserver(updateStack);
    cards.forEach((card) => observer.observe(card));
    if (header) observer.observe(header);
    window.addEventListener("resize", updateStack);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStack);
    };
  }, []);
  // Sort conditions in descending order by menuOrder
  const conditions = data.allWpSpineCondition.nodes.sort((a, b) => {
    if (a.menuOrder < b.menuOrder) {
      return -1; // a comes before b
    }
    if (a.menuOrder > b.menuOrder) {
      return 1; // b comes before a
    }
    return 0; // no change
  });

  return (
    <Layout>
      <main className="spine-conditions-page">
        {/* Hero Section */}
        <section className="conditions-hero-section">
          <img
            src={spineConditionsHero}
            alt="Understanding spine conditions"
            className="conditions-hero-bg"
            loading="lazy"
          />
          <div className="conditions-hero-content">
            <h1>
              Understanding <br />
              Spine Conditions
            </h1>
            <p>
              Understanding the underlying cause of spine pain is the first step
              toward effective treatment and long-term recovery.
            </p>
          </div>
          <Breadcrumb items={[{ label: "Spine Conditions" }]} />

        </section>

        {/* Conditions List Section */}
        <section className="conditions-list-section">
          <div className="container">
            <h2>Spine Conditions</h2>
            <p className="conditions-section-intro">
              Comprehensive evaluation and treatment for a wide range of spinal
              disorders affecting the neck, back, and nerves.
            </p>

            <div className="conditions-list-wrap conditions-card-stack" ref={cardsRef}>
              {conditions.map((condition, index) => (
                <div className="condition-row" key={index}>
                  <div className="condition-left">
                    {/* Render the icon using the svgCode */}
                    <ConditionIcon title={condition.title} svgCode={condition.spineConditionsPost.svgCode} />

                    <h2>{condition.title}</h2>
                    <div
                      className="condition-content"
                      dangerouslySetInnerHTML={{
                        __html: condition.content, // Using content here
                      }}
                    />
                  </div>

                  <div className="condition-right">
                    <ul className="treatment-option-list">
                      <li className="treatment-option">
                        <span>Slip Disc / Disc Herniation Treatment</span>
                        {/* <span className="arrow">→</span> */}
                      </li>

                      <li className="treatment-option">
                        <span>Endoscopic Surgery</span>
                        {/* <span className="arrow">→</span> */}
                      </li>

                      <li className="treatment-option">
                        <span>Minimally Invasive Spine Surgery (MISS)</span>
                        {/* <span className="arrow">→</span> */}
                      </li>
                    </ul>

                    <Link
                      to={`/spine-condition/${condition.slug}/`}
                      className=" common-btn"
                    >
                       <span className="common-btn-text">View All Options</span>
                       <span className="common-btn-icon">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default SpineConditionsPage;

export const query = graphql`
  query MyQuery {
    allWpSpineCondition(filter: {menuOrder: {ne: null}}) {
      nodes {
        title
        slug
        spineConditionId
        content
        menuOrder
        spineConditionsPost {
          svgCode
         desciption
        }
      }
    }
  }
`;
