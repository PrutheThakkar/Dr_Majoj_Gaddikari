const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
   const { createPage, createRedirect } = actions;
  const result = await graphql(`
    query {
      allWpSpineCondition {
        nodes {
          slug
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
  `);

  if (result.errors) {
    console.error("❌ Query failed:", result.errors);
    return;
  }

  const allPosts = result.data.allWpSpineCondition.nodes;
  const parents = allPosts.filter((node) => !node.parentDatabaseId);
  const children = allPosts.filter((node) => node.parentDatabaseId);

  // Build extra children map: { "spine-tumors": ["artificial-disc-replacement"] }
  const extraChildrenMap = {};
  children.forEach((child) => {
    const extraParents =
      child.extraParentConditions?.extraParentConditions?.nodes || [];
    extraParents.forEach((extraParent) => {
      if (extraParent?.slug) {
        if (!extraChildrenMap[extraParent.slug]) {
          extraChildrenMap[extraParent.slug] = [];
        }
        extraChildrenMap[extraParent.slug].push(child.slug);
      }
    });
  });

  console.log("✅ Extra children map:", JSON.stringify(extraChildrenMap));

  // Listing page for each parent
  parents.forEach((condition) => {
    createPage({
      path: `/spine-condition/${condition.slug}/`,
      component: path.resolve("src/templates/spine-condition-listing.js"),
      context: {
        slug: condition.slug,
        databaseId: condition.databaseId,
        extraChildSlugs: extraChildrenMap[condition.slug] || [],
      },
    });
  });

  // Detail page for each child
  children.forEach((treatment) => {
    const primaryParent = parents.find(
      (p) => p.databaseId === treatment.parentDatabaseId
    );

    if (primaryParent) {
      createPage({
        path: `/spine-condition/${primaryParent.slug}/${treatment.slug}/`,
        component: path.resolve("src/templates/spine-treatment-detail.js"),
        context: { slug: treatment.slug },
      });
    }

    // Extra parent detail pages
    const extraParents =
      treatment.extraParentConditions?.extraParentConditions?.nodes || [];
    extraParents.forEach((extraParent) => {
      if (extraParent?.slug) {
        createPage({
          path: `/spine-condition/${extraParent.slug}/${treatment.slug}/`,
          component: path.resolve("src/templates/spine-treatment-detail.js"),
          context: { slug: treatment.slug },
        });
      }
    });
  });

  // Blog pages
  const blogResult = await graphql(`
    query {
      allWpPost {
        edges {
          node { slug }
        }
      }
    }
  `);

  if (blogResult.errors) {
    console.error("❌ Blog query failed:", blogResult.errors);
    return;
  }

  blogResult.data.allWpPost.edges.forEach(({ node: post }) => {
    createPage({
      path: `/insights/${post.slug}/`,
      component: path.resolve("src/templates/blog-detail.js"),
      context: { slug: post.slug },
    });
  });

   // ─── Redirects ─────────────────────────────────────────
  createRedirect({
    fromPath: "/treatments/",
    toPath: "/spine-condition/slipped-or-herniated-disc/",
    isPermanent: true,
  });
};