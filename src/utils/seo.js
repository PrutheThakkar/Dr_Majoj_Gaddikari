const metadata = require("../data/seo-metadata.json")
const normalizePath = (path = "/") => {
  const clean = path.split(/[?#]/)[0]
  return clean === "/" ? "/" : `/${clean.replace(/^\/+|\/+$/g, "")}/`
}
const siteUrl = (
  process.env.GATSBY_SEO_SITE_URL || "https://spinecaremumbai.in"
).replace(/\/+$/, "")
const absoluteUrl = path => new URL(path, `${siteUrl}/`).href
const plainText = (text = "") =>
  text
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#\d+;|&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
const isPublicPage = path =>
  !/^\/(?:404(?:\.html)?|dev-404-page|offline-plugin-app-shell-fallback)(?:\/|$)/.test(
    path
  )
const serializeJson = value => JSON.stringify(value).replace(/</g, "\\u003c")
module.exports = {
  metadata,
  normalizePath,
  siteUrl,
  absoluteUrl,
  plainText,
  isPublicPage,
  serializeJson,
}
