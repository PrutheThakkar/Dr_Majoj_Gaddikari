require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "Dr Manoj",
    description: "Gatsby + WordPress (WPGraphQL) site",
    author: "@Dr Manoj",
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
        url:
          process.env.GATSBY_WPGRAPHQL_URL ||
          "https://drmanoj.studiosentientdemo.com/m/graphql",
        develop: {
          hardCacheMediaFiles: true,
          hardCacheData: false,
          nodeUpdateInterval: 300000,
        },
        production: {
          hardCacheMediaFiles: false,
        },
      },
    },
  ],
};