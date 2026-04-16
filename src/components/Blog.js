import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import { Image } from "./common/Image";

function Blog(props) {
  const { lightMode, data } = props;
  const { id, coverImage, title, publishedAt, slug, excerpt, tags } = data;

  const getShortMonth = (month) => {
    return month.slice(0, 3);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return { day, month };
  };

  const { day, month } = formatDate(publishedAt);

  return (
    <div className="mi-blog">
      <div className="mi-blog-image">
        <Image
          src={coverImage}
          loader="/images/blog-image-placeholder.png"
          alt={title}
        />
        <div className="mi-blog-date">
          <span className="date">{day}</span>
          <span className="month">{getShortMonth(month)}</span>
        </div>
      </div>
      <div className="mi-blog-content">
        <h5>
          <Link to={`${id}/${slug}`}>{title}</Link>
        </h5>
        {excerpt && (
          <div
            className="mi-blog-excerpt"
            dangerouslySetInnerHTML={{ __html: excerpt }}
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: lightMode ? "#666" : "#a4acc4",
            }}
          />
        )}
        {tags && tags.length > 0 && (
          <div style={{ marginTop: "15px" }}>
            {tags.map((tag, index) => (
              <Tag
                key={index}
                style={{
                  marginRight: "5px",
                  marginBottom: "5px",
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
      </div>
    </div>
  );
}

export default Blog;
