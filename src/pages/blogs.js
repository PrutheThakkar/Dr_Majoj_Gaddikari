// import React from "react"
// import { graphql, Link } from "gatsby"
// import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import Layout from "../components/layout"

// const BlogPage = ({ data }) => {
//   const posts = data.allWpPost.nodes

//   return (
//     <Layout>
//       <section className="blog-listing-section">
//         <div className="container">
//           <h1>Blogs</h1>

//           <div className="blog-grid">
//             {posts.map(post => {
//               const image = getImage(post.featuredImage?.node?.localFile)

//               return (
//                 <div className="blog-card" key={post.id}>
//                   <Link to={post.uri}>
//                     {image && (
//                       <GatsbyImage
//                         image={image}
//                         alt={post.featuredImage?.node?.altText || post.title}
//                       />
//                     )}

//                     <h2 dangerouslySetInnerHTML={{ __html: post.title }} />

//                     {post.excerpt && (
//                       <div
//                         className="blog-excerpt"
//                         dangerouslySetInnerHTML={{ __html: post.excerpt }}
//                       />
//                     )}

//                     <span className="read-more">Read More</span>
//                   </Link>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </section>
//     </Layout>
//   )
// }

// export default BlogPage

// export const query = graphql`
//   query BlogListingQuery {
//     allWpPost(sort: { date: DESC }) {
//       nodes {
//         id
//         title
//         excerpt
//         uri
//         featuredImage {
//           node {
//             altText
//             localFile {
//               childImageSharp {
//                 gatsbyImageData(
//                   width: 600
//                   height: 400
//                   placeholder: BLURRED
//                   formats: [AUTO, WEBP]
//                 )
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `