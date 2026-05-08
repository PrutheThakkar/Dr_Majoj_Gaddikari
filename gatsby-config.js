require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "Dr Manojkumar Gaddikeri",
    description: "Orthopaedic Spine Specialist",
    author: "@Dr Manojkumar Gaddikeri",
    siteUrl:
      process.env.GATSBY_WEBSITE_URL || "https://drmanoj.studiosentientdemo.com/",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: process.env.GATSBY_WPGRAPHQL_URL,
        schema: {
          timeout: 30000, // Increase timeout if necessary
        },
        auth: {
          // Use the credentials from your .env file
          htaccess: {
            username: process.env.GATSBY_USERNAME,
            password: process.env.GATSBY_PASSWORD,
          },
        },
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "ACF", // Type name for ACF fields
        fieldName: "acf", // Alias for GraphQL queries
        url: process.env.GATSBY_WPGRAPHQL_URL, // Ensure this is correct
      },
    },
  ],
};