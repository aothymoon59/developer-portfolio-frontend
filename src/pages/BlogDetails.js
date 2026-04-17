import Disqus from "disqus-react";
import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { Tag } from "antd";
import Layout from "../components/Layout";
import { BlogDetailsSkeleton } from "../components/PageSkeleton";
import SiteHelmet from "../components/SiteHelmet";
import Spinner from "../components/Spinner";
import { useBlogDetailsQuery } from "../hooks/usePortfolioQueries";

function BlogDetails({ lightMode }) {
  const params = useParams();
  const blogId = params.id;
  const { data: blog, isLoading } = useBlogDetailsQuery(blogId);

  if (isLoading) {
    return (
      <Layout>
        <BlogDetailsSkeleton />
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="mi-blog-details mi-section mi-padding-top mi-padding-bottom">
          <div
            className="container"
            style={{ textAlign: "center", padding: "50px" }}
          >
            <h2>Blog not found</h2>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const disqusShortname = "developer-portfolio-blogs";
  const disqusConfig = {
    url: `${window.location.origin}/blogs/${blogId}/${blog.slug}`,
    identifier: blogId,
    title: blog.title,
  };

  return (
    <Layout>
      <SiteHelmet
        pageTitle={blog.title}
        description={
          blog.excerpt ? blog.excerpt.replace(/<[^>]*>/g, "") : blog.title
        }
      />
      <Suspense fallback={<Spinner />}>
        <div className="mi-blog-details mi-section mi-padding-top mi-padding-bottom">
          <div className="container">
            <article>
              <header style={{ marginBottom: "30px" }}>
                <h1
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "15px",
                    color: lightMode ? "#000" : "#fff",
                  }}
                >
                  {blog.title}
                </h1>
                {blog.subTitle && (
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "15px",
                      color: lightMode ? "#666" : "#a4acc4",
                      fontWeight: "normal",
                    }}
                  >
                    {blog.subTitle}
                  </h2>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                    fontSize: "14px",
                    color: lightMode ? "#666" : "#a4acc4",
                  }}
                >
                  <span>Published on {formatDate(blog.publishedAt)}</span>
                </div>
                {blog.tags && blog.tags.length > 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    {blog.tags.map((tag, index) => (
                      <Tag
                        key={index}
                        style={{
                          marginRight: "8px",
                          marginBottom: "8px",
                          backgroundColor: lightMode ? "#f0f0f0" : "#2e344e",
                          color: lightMode ? "#000" : "#fff",
                          border: `1px solid ${lightMode ? "#d9d9d9" : "#404040"}`,
                        }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                )}
              </header>

              {blog.coverImage && (
                <div style={{ marginBottom: "30px" }}>
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}

              <div
                className="mi-blog-content"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.8",
                  color: lightMode ? "#333" : "#a4acc4",
                }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            <Suspense fallback={<h1>loading...</h1>}>
              <div className="mi-blog-details-comments mt-30">
                <Disqus.DiscussionEmbed
                  shortname={disqusShortname}
                  config={disqusConfig}
                />
              </div>
            </Suspense>
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

export default BlogDetails;
