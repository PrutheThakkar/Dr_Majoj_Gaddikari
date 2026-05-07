require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "Dr Manojkumar Gaddikeri",
    description: "Orthopaedic Spine Specialist",
    author: "@Dr Manojkumar Gaddikeri",
    siteUrl:
      process.env.GATSBY_WEBSITE_URL ||
      "https://drmanojgaddikeri.netlify.app",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass",
  ],
};