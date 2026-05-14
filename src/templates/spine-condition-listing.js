import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Breadcrumb from "../components/Breadcrumb";

const placeholderImage = "https://placehold.co/600x400?text=No+Image";

const SpineConditionListingTemplate = ({ data }) => {
  const condition = data.wpSpineCondition;
  const allConditions = data.allWpSpineCondition.nodes;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Current condition's treatments
  const conditionTreatments = [
    ...(data.primaryChildren?.nodes || []),
    ...(data.extraChildren?.nodes || []),
  ].filter(
    (t, index, self) => index === self.findIndex((x) => x.slug === t.slug)
  );

  // All treatments from every condition (children only = have parentDatabaseId)
  const allTreatments = data.allChildren?.nodes || [];

  // Which treatments to show
  const treatmentsToShow = showAll ? allTreatments : conditionTreatments;

  const heroImage =
    condition.featuredImage?.node?.sourceUrl || placeholderImage;

  return (
    <Layout>
      <main className="spine-condition-listing-page">

        {/* Hero */}
        <section className="about-hero-section">
          <div className="about-hero-bg">
            <img src={heroImage} alt={condition.title} />
          </div>
          <div className="about-hero-content">
            <h1>{showAll ? "All Treatments" : condition.title}</h1>
            {!showAll && (
              <div dangerouslySetInnerHTML={{ __html: condition.content }} />
            )}
          </div>

          <Breadcrumb items={[
            { label: "Spine Conditions", link: "/spine-conditions" },
            { label: showAll ? "All Treatments" : condition.title }
          ]} />
        </section>

        {/* Condition Switcher */}
        <section className="condition-switcher-section">
          <div className="container">

            {/* Desktop tabs */}
            <div className="condition-tabs">
              <button
                className={`condition-tab condition-tab-all ${showAll ? "active" : ""}`}
                onClick={() => setShowAll(true)}
              >
                All treatments
              </button>

              {allConditions.map((cond) => (
                <Link
                  key={cond.slug}
                  to={`/spine-condition/${cond.slug}/`}
                  className={`condition-tab ${!showAll && cond.slug === condition.slug ? "active" : ""
                    }`}
                  onClick={() => setShowAll(false)}
                >
                  {cond.title}
                </Link>
              ))}
            </div>

            {/* Mobile dropdown */}
            <div className="condition-dropdown">
              <button
                className="condition-dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {showAll ? "All Conditions" : condition.title}
                <span className={`dropdown-arrow ${dropdownOpen ? "open" : ""}`}>
                  ▼
                </span>
              </button>

              {dropdownOpen && (
                <div className="condition-dropdown-menu">
                  <button
                    className={`condition-dropdown-item ${showAll ? "active" : ""}`}
                    onClick={() => {
                      setShowAll(true);
                      setDropdownOpen(false);
                    }}
                  >
                    All Conditions
                  </button>

                  {allConditions.map((cond) => (
                    <Link
                      key={cond.slug}
                      to={`/spine-condition/${cond.slug}/`}
                      className={`condition-dropdown-item ${!showAll && cond.slug === condition.slug ? "active" : ""
                        }`}
                      onClick={() => {
                        setShowAll(false);
                        setDropdownOpen(false);
                      }}
                    >
                      {cond.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Treatments Grid */}
        <section className="treatments-section">
          <div className="container">
            <div className="section-title-wrp">
              {condition.spineConditionsPost?.desciption && (
                <div
                  className="treatments-intro"
                  dangerouslySetInnerHTML={{ __html: condition.spineConditionsPost.desciption }}
                />
              )}
            </div>

            <div className="treatments-grid">
              {treatmentsToShow.map((treatment, index) => {
                // For "all" view, find the parent condition to build correct URL
                const parentCondition = showAll
                  ? allConditions.find(
                    (c) =>
                      data.allWpSpineCondition.nodes.find(
                        (n) => n.slug === c.slug
                      )
                  )
                  : null;

                const linkTo = showAll
                  ? `/spine-condition/${treatment.parentSlug || condition.slug
                  }/${treatment.slug}/`
                  : `/spine-condition/${condition.slug}/${treatment.slug}/`;

                return (
                  <div key={index} className="treatment-card-wrapper">
                  <Link
                    to={linkTo}
                    className="treatment-card"
                    key={index}
                  >
                    <div className="treatment-card-image">
                      <img
                        src={
                          treatment.featuredImage?.node?.sourceUrl ||
                          placeholderImage
                        }
                        alt={treatment.title}
                      />
                    </div>
                    <p className="treatment-card-title">{treatment.title}</p>
                  </Link>
                   </div>
                );
              })}
            </div>
           
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default SpineConditionListingTemplate;

export const query = graphql`
  query SpineConditionListingQuery(
    $slug: String!
    $databaseId: Int!
    $extraChildSlugs: [String]
  ) {
    wpSpineCondition(slug: { eq: $slug }) {
      title
      slug
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
          spineConditionsPost {
    desciption
  }
    }

  
   # All parent conditions for tabs — sorted by menuOrder
allWpSpineCondition(
  filter: { menuOrder: { ne: null } }
  sort: { menuOrder: ASC }
) {
  nodes {
    title
    slug
    databaseId
    menuOrder
  }
}

    # Current condition's primary children
    primaryChildren: allWpSpineCondition(
      filter: { parentDatabaseId: { eq: $databaseId } }
    ) {
      nodes {
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }

    # Current condition's extra children via ACF
    extraChildren: allWpSpineCondition(
      filter: { slug: { in: $extraChildSlugs } }
    ) {
      nodes {
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }

    # ALL children from every condition for "All Conditions" view
    allChildren: allWpSpineCondition(
      filter: { parentDatabaseId: { ne: null } }
    ) {
      nodes {
        title
        slug
        parentDatabaseId
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;