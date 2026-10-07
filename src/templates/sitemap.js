import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../css/sitemap.css"

export default function SitemapPage({ pageContext }) {
  const groups = ["Main pages", "Spine conditions", "Treatments", "Insights"]
  return (
    <Layout>
      <div className="sitemap-page container">
        <h1>Sitemap</h1>
        <p>
          Explore spine conditions, treatment options, patient information and
          insights.
        </p>
        <nav aria-label="Website sitemap" className="sitemap-grid">
          {groups.map(group => (
            <section
              key={group}
              aria-labelledby={`sitemap-${group.replace(/ /g, "-")}`}
            >
              <h2 id={`sitemap-${group.replace(/ /g, "-")}`}>{group}</h2>
              <ul>
                {pageContext.entries
                  .filter(entry => entry.group === group)
                  .map(entry => (
                    <li key={entry.path}>
                      <Link to={entry.path}>{entry.title}</Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </nav>
        <p>
          <a href="/sitemap.xml">View XML sitemap</a>
        </p>
      </div>
    </Layout>
  )
}

export const Head = props => (
  <Seo
    {...props}
    title="Sitemap"
    description="Find all pages, spine conditions, treatments and spine health insights on Dr. Manoj Gaddikeri’s website."
    schemaType="CollectionPage"
  />
)
