import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Breadcrumb from "../components/Breadcrumb";

const placeholderImage = "https://drmanoj.studiosentientdemo.com/wp-content/uploads/2026/05/about-hero.webp";

const BlogPage = ({ data }) => {
  const posts = data.allWpPost.edges;

  return (
    <Layout>
      <main className="blog-listing-page">

        {/* Hero */}
        <section className="about-hero-section">
          <div className="about-hero-bg">
            <img src={placeholderImage} alt="Blogs" />
          </div>
          <div className="about-hero-content">
            <h1>Insights</h1>
            <p>Expert perspectives on spine health, treatments, and recovery.</p>
          </div>
          <Breadcrumb items={[{ label: "Insights" }]} />

        </section>

        {/* Blog Grid */}
        <section className="blog-listing-section">
          <div className="container">
            <div className="blog-grid">
              {posts.map(({ node: post }) => {
                const image =
                  post.featuredImage?.node?.mediaItemUrl || placeholderImage;

                return (
                  <Link
                    to={`/insights/${post.slug}/`}
                    className="blog-card"
                    key={post.slug}
                  >
                    <div className="blog-card-image">
                      <img
                        src={image}
                        alt={post.featuredImage?.node?.altText || post.title}
                      />
                    </div>
                    <div className="blog-card-content">
                      <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
                      <span className="read-more">Read More →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default BlogPage;

export const query = graphql`
  query BlogListingQuery {
    allWpPost {
      edges {
        node {
          slug
          title
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;