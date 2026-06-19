import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Breadcrumb from "../components/Breadcrumb";

const placeholderImage = "https://placehold.co/600x400?text=No+Image";

const SpineTreatmentDetailTemplate = ({ data }) => {
  const treatment = data.wpSpineCondition;

  const heroImage =
    treatment.featuredImage?.node?.sourceUrl || placeholderImage;

  return (
    <Layout>
      <main className="treatment-detail-page">

        {/* Hero — same style as About page */}
        <section className="about-hero-section">
          <div className="about-hero-bg">
            <img src={heroImage} alt={treatment.title} loading="lazy"/>
          </div>

          <div className="about-hero-content">
            <h1>{treatment.title}</h1>
          </div>

          <Breadcrumb items={[
            { label: "Spine Conditions", link: "/spine-conditions" },
            { label: treatment.title }
          ]} />
        </section>

        {/* Content */}
        <section className="treatment-detail-content">
          <div className="container">
            <div className="treatment-detail-wrap">

            <div dangerouslySetInnerHTML={{ __html: treatment.content }} />
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default SpineTreatmentDetailTemplate;

export const query = graphql`
  query SpineTreatmentDetailQuery($slug: String!) {
    wpSpineCondition(slug: { eq: $slug }) {
      title
      content
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;