import React from "react"
import defaultImage from "../images/doctor-img.webp"
import {
  metadata,
  normalizePath,
  absoluteUrl,
  plainText,
  serializeJson,
} from "../utils/seo"

export default function Seo({
  location,
  pageContext = {},
  title,
  description,
  image,
  schemaType = "MedicalWebPage",
  article,
}) {
  const path = normalizePath(
    pageContext.canonicalPath || location?.pathname || "/"
  )
  const reference = metadata[path]
  const metaTitle =
    reference?.title ||
    `${plainText(title || "Spine Care in Mira Road")} | Dr. Manoj Gaddikeri`
  const metaDescription =
    reference?.description ||
    plainText(description) ||
    `Learn about ${plainText(
      title || "spine care"
    )} and consultation with Dr. Manoj Gaddikeri, orthopaedic spine surgeon in Mira Road.`
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image || defaultImage)
  const type = reference?.schemaType || schemaType
  const physicianId = `${absoluteUrl("/")}#physician`
  const physician = {
    "@type": "Physician",
    "@id": physicianId,
    name: "Dr. Manoj Gaddikeri",
    url: absoluteUrl("/"),
    image: absoluteUrl(defaultImage),
    medicalSpecialty: "Orthopedic",
    description: metadata["/"].description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mira Road",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  }
  const webPage = {
    "@type": type === "Physician" ? "WebPage" : type,
    "@id": `${url}#webpage`,
    url,
    name: metaTitle,
    description: metaDescription,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    about: { "@id": physicianId },
    ...(type === "Article"
      ? {
          headline: metaTitle,
          image: imageUrl,
          mainEntityOfPage: url,
          ...(article?.date ? { datePublished: article.date } : {}),
          ...(article?.modified ? { dateModified: article.modified } : {}),
        }
      : {}),
  }
  const crumbs =
    path === "/"
      ? []
      : [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: reference?.label || plainText(title || "Sitemap"),
                item: url,
              },
            ],
          },
        ]
  return (
    <>
      <html lang="en" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={url} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="Dr. Manoj Gaddikeri" />
      <meta
        property="og:type"
        content={type === "Article" ? "article" : "website"}
      />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJson({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${absoluteUrl("/")}#website`,
                url: absoluteUrl("/"),
                name: "Dr. Manoj Gaddikeri",
              },
              physician,
              webPage,
              ...crumbs,
            ],
          }),
        }}
      />
    </>
  )
}
