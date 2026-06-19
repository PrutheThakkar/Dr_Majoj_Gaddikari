import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Breadcrumb from "../components/Breadcrumb";

const placeholderImage = "https://placehold.co/600x400?text=No+Image";

const BlogDetailTemplate = ({ data }) => {
  const post = data.wpPost;
  const heroImage = post.featuredImage?.node?.mediaItemUrl || placeholderImage;

  return (
    <Layout>
      <main className="blog-detail-page">

        {/* Hero */}
        <section className="about-hero-section">
          <div className="about-hero-bg">
            <img src={heroImage} alt={post.title} loading="lazy"/>
          </div>
          <div className="about-hero-content">
            <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
          </div>
          <Breadcrumb items={[
            { label: "Insights", link: "/insights" },
            { label: post.title }
          ]} />

        </section>

        {/* Blog Content */}
        <section className="blog-detail-content">
          <div className="container">
            <div
              className="blog-content-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default BlogDetailTemplate;

export const query = graphql`
  query BlogDetailQuery($slug: String!) {
    wpPost(slug: { eq: $slug }) {
      title
      content
      slug
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
    }
  }
`;