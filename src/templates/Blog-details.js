// import React from "react"
// import { graphql } from "gatsby"
// import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import Layout from "../components/layout"

// const BlogDetail = ({ data }) => {
//   const post = data.wpPost
//   const image = getImage(post.featuredImage?.node?.localFile)

//   return (
//     <Layout>
//       <section className="blog-detail-banner">
//         <div className="container">
//           <h1 dangerouslySetInnerHTML={{ __html: post.title }} />

//           {post.date && <p className="blog-date">{post.date}</p>}
//         </div>
//       </section>

//       {image && (
//         <section className="blog-featured-image">
//           <div className="container">
//             <GatsbyImage
//               image={image}
//               alt={post.featuredImage?.node?.altText || post.title}
//             />
//           </div>
//         </section>
//       )}

//       <section className="blog-content-section">
//         <div className="container">
//           <div
//             className="blog-content"
//             dangerouslySetInnerHTML={{ __html: post.content }}
//           />
//         </div>
//       </section>
//     </Layout>
//   )
// }

// export default BlogDetail

// export const query = graphql`
//   query BlogDetailQuery($id: String!) {
//     wpPost(id: { eq: $id }) {
//       id
//       title
//       content
//       date(formatString: "DD MMMM YYYY")
//       featuredImage {
//         node {
//           altText
//           localFile {
//             childImageSharp {
//               gatsbyImageData(
//                 width: 1200
//                 placeholder: BLURRED
//                 formats: [AUTO, WEBP]
//               )
//             }
//           }
//         }
//       }
//     }
//   }
// `