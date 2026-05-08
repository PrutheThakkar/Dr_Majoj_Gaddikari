// gatsby-node.js
const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allWpSpineCondition {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const conditions = result.data.allWpSpineCondition.nodes;

  conditions.forEach((condition) => {
    createPage({
      path: `/spine-condition/${condition.slug}`, // Dynamic URL for each condition
      component: path.resolve(`./src/templates/TemplatePage.js`), // Path to your TemplatePage
      context: {
        slug: condition.slug, // Pass the slug to query the condition in the template
      },
    });
  });
};