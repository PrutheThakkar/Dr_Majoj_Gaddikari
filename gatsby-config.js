require("dotenv").config();

const wpGraphqlUrl =
  process.env.GATSBY_WPGRAPHQL_URL ||
  "https://drmanoj.studiosentientdemo.com/graphql";

module.exports = {
  siteMetadata: {
    title: "Dr Manoj Kumar Gaddikeri",
    description: "Orthopaedic Spine Specialist",
    author: "@Dr Manoj Kumar Gaddikeri",
    siteUrl:
      process.env.GATSBY_WEBSITE_URL ||
      "https://drmanoj.studiosentientdemo.com/",
  },

  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass",

    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: wpGraphqlUrl,

        schema: {
          timeout: 30000,
        },

        html: {
          useGatsbyImage: false,
        },
      },
    },
  ],
};