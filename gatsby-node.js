const path = require("path")
const fs = require("fs/promises")
const {
  metadata,
  normalizePath,
  absoluteUrl,
  isPublicPage,
  plainText,
} = require("./src/utils/seo")
const canonicalPaths = new Map()

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  canonicalPaths.clear()
  const sitemapEntries = Object.entries(metadata)
    .filter(([url]) => !url.startsWith("/insights/") || url === "/insights/")
    .map(([url, entry]) => ({
      path: url,
      title: entry.label,
      group: "Main pages",
    }))
  const result = await graphql(`
    query {
      allWpSpineCondition {
        nodes {
          slug
          title
          databaseId
          parentDatabaseId
          extraParentConditions {
            extraParentConditions {
              nodes {
                slug
                databaseId
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.error(" Query failed:", result.errors)
    return
  }

  const allPosts = result.data.allWpSpineCondition.nodes
  const parents = allPosts.filter(node => !node.parentDatabaseId)
  const children = allPosts.filter(node => node.parentDatabaseId)

  // Build extra children map: { "spine-tumors": ["artificial-disc-replacement"] }
  const extraChildrenMap = {}
  children.forEach(child => {
    const extraParents =
      child.extraParentConditions?.extraParentConditions?.nodes || []
    extraParents.forEach(extraParent => {
      if (extraParent?.slug) {
        if (!extraChildrenMap[extraParent.slug]) {
          extraChildrenMap[extraParent.slug] = []
        }
        extraChildrenMap[extraParent.slug].push(child.slug)
      }
    })
  })

  console.log(" Extra children map:", JSON.stringify(extraChildrenMap))

  // Listing page for each parent
  parents.forEach(condition => {
    sitemapEntries.push({
      path: `/spine-condition/${condition.slug}/`,
      title: plainText(condition.title),
      group: "Spine conditions",
    })
    createPage({
      path: `/spine-condition/${condition.slug}/`,
      component: path.resolve("src/templates/spine-condition-listing.js"),
      context: {
        slug: condition.slug,
        databaseId: condition.databaseId,
        extraChildSlugs: extraChildrenMap[condition.slug] || [],
      },
    })
  })

  // Detail page for each child
  children.forEach(treatment => {
    const primaryParent = parents.find(
      p => p.databaseId === treatment.parentDatabaseId
    )

    if (primaryParent) {
      sitemapEntries.push({
        path: `/spine-condition/${primaryParent.slug}/${treatment.slug}/`,
        title: plainText(treatment.title),
        group: "Treatments",
      })
      createPage({
        path: `/spine-condition/${primaryParent.slug}/${treatment.slug}/`,
        component: path.resolve("src/templates/spine-treatment-detail.js"),
        context: { slug: treatment.slug },
      })
    }

    // Extra parent detail pages
    const extraParents =
      treatment.extraParentConditions?.extraParentConditions?.nodes || []
    extraParents.forEach(extraParent => {
      if (extraParent?.slug) {
        const aliasPath = `/spine-condition/${extraParent.slug}/${treatment.slug}/`
        const canonicalPath = primaryParent
          ? `/spine-condition/${primaryParent.slug}/${treatment.slug}/`
          : aliasPath
        canonicalPaths.set(aliasPath, canonicalPath)
        if (!primaryParent)
          sitemapEntries.push({
            path: canonicalPath,
            title: plainText(treatment.title),
            group: "Treatments",
          })
        createPage({
          path: `/spine-condition/${extraParent.slug}/${treatment.slug}/`,
          component: path.resolve("src/templates/spine-treatment-detail.js"),
          context: { slug: treatment.slug, canonicalPath },
        })
      }
    })
  })

  // Blog pages
  const blogResult = await graphql(`
    query {
      allWpPost {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `)

  if (blogResult.errors) {
    console.error(" Blog query failed:", blogResult.errors)
    return
  }

  blogResult.data.allWpPost.edges.forEach(({ node: post }) => {
    sitemapEntries.push({
      path: `/insights/${post.slug}/`,
      title: plainText(post.title),
      group: "Insights",
    })
    createPage({
      path: `/insights/${post.slug}/`,
      component: path.resolve("src/templates/blog-detail.js"),
      context: { slug: post.slug },
    })
  })

  const treatmentLanding =
    parents.find(entry => entry.slug === "slipped-or-herniated-disc") ||
    parents[0]
  if (treatmentLanding)
    createPage({
      path: "/treatments/",
      component: path.resolve("src/templates/spine-condition-listing.js"),
      context: {
        slug: treatmentLanding.slug,
        databaseId: treatmentLanding.databaseId,
        extraChildSlugs: [],
        isTreatments: true,
      },
    })
  createPage({
    path: "/sitemap/",
    component: path.resolve("src/templates/sitemap.js"),
    context: {
      entries: [
        ...new Map(sitemapEntries.map(entry => [entry.path, entry])).values(),
      ],
    },
  })
}

exports.onPostBuild = async ({ graphql, reporter }) => {
  const result = await graphql(
    `
      {
        allSitePage {
          nodes {
            path
          }
        }
      }
    `
  )
  if (result.errors)
    reporter.panicOnBuild("Could not generate XML sitemap", result.errors)
  const urls = [
    ...new Set(
      result.data.allSitePage.nodes
        .filter(page => isPublicPage(page.path))
        .map(page =>
          absoluteUrl(
            canonicalPaths.get(normalizePath(page.path)) ||
              normalizePath(page.path)
          )
        )
    ),
  ].sort()
  const escapeXml = value =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
  await fs.writeFile(
    path.join(__dirname, "public/sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map(url => `  <url><loc>${escapeXml(url)}</loc></url>`)
      .join("\n")}\n</urlset>\n`
  )
  await fs.writeFile(
    path.join(__dirname, "public/robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`
  )
}
