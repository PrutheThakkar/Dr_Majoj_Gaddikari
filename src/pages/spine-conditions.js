import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import spineConditionsHero from "../images/about-hero.webp";
import Breadcrumb from "../components/Breadcrumb";

// Condition Icon Component (Using SVG code from `svgCode`)
const ConditionIcon = ({ svgCode }) => {
  return (
    <span className="condition-icon" dangerouslySetInnerHTML={{ __html: svgCode }} />
  );
};

const SpineConditionsPage = ({ data }) => {
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

            <div className="conditions-list-wrap">
              {conditions.map((condition, index) => (
                <div className="condition-row" key={index}>
                  <div className="condition-left">
                    {/* Render the icon using the svgCode */}
                    <ConditionIcon svgCode={condition.spineConditionsPost.svgCode} />

                    <h2>{condition.title}</h2>
                    <div
                      className="condition-content"
                      dangerouslySetInnerHTML={{
                        __html: condition.content, // Using content here
                      }}
                    />
                  </div>

                  <div className="condition-right">
                    <h4>Major Treatment Approaches</h4>

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
                      className="view-treatment-btn"
                    >
                      View All Treatment Options
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