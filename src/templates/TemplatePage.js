// src/templates/TemplatePage.js
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Link } from "gatsby";

const TemplatePage = ({ data }) => {
  const condition = data.wpSpineCondition;

  return (
    <Layout>
      <main className="condition-detail-page">
        {/* Hero Section */}
        <section className="condition-detail-hero-section">
          <h1>{condition.title}</h1>
          <div
            className="condition-detail-content"
            dangerouslySetInnerHTML={{
              __html: condition.content,
            }}
          />
        </section>

        {/* Treatment Options Section */}
        <section className="condition-treatment-options">
          <h2>Treatment Options</h2>
          <div className="treatment-option-list">
            {condition.spineConditionsPost.description &&
              condition.spineConditionsPost.description.map((item, index) => (
                <div key={index} className="treatment-option">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
          </div>
        </section>

        {/* Back to conditions list */}
        <Link to="/spine-conditions" className="back-to-list">
          Back to Conditions List
        </Link>
      </main>
    </Layout>
  );
};

export default TemplatePage;

export const query = graphql`
  query($slug: String!) {
    wpSpineCondition(slug: { eq: $slug }) {
      title
      content
      spineConditionsPost {
        description {
          title
          description
        }
      }
    }
  }
`;