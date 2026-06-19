require("dotenv").config();

const wpGraphqlUrl =
  process.env.GATSBY_WPGRAPHQL_URL ||
  "https://drmanoj.studiosentientdemo.com/graphql";

const siteUrl =
  process.env.GATSBY_WEBSITE_URL ||
  "https://drmanoj.studiosentientdemo.com/";

module.exports = {
  siteMetadata: {
    title: "Dr Manoj Kumar Gaddikeri",
    description: "Orthopaedic Spine Specialist",
    author: "@Dr Manoj Kumar Gaddikeri",
    siteUrl,
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
          timeout: 60000,
          perPage: 20,
          requestConcurrency: 3,
          previewRequestConcurrency: 1,
        },

        html: {
          useGatsbyImage: false,
        },

        production: {
          allow404Images: true,
          hardCacheMediaFiles: false,
        },

        develop: {
          hardCacheMediaFiles: false,
        },
      },
    },
  ],
};