import React, { useState } from "react";
import { Modal, Button, Tag, Space, ConfigProvider, theme } from "antd";
import * as Icon from "react-feather";
import { Image } from "./common/Image";

function Portfolio(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { lightMode, content } = props;
  const {
    title,
    subTitle,
    summary,
    description,
    imageUrl,
    liveUrl,
    repoUrl,
    frontendRepoUrl,
    backendRepoUrl,
    additionalLinks,
    technology,
    skills,
    featured,
  } = props.content;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="mi-portfolio mi-portfolio-visible">
        <div className="mi-portfolio-image">
          <Image
            src={imageUrl}
            loader="/images/portfolio-image-placeholder.png"
            alt={title}
          />
          <ul>
            <li>
              <button onClick={showModal}>
                <Icon.Eye />
              </button>
            </li>
            {liveUrl && (
              <li>
                <a rel="noopener noreferrer" target="_blank" href={liveUrl}>
                  <Icon.ExternalLink />
                </a>
              </li>
            )}
            {repoUrl && (
              <li>
                <a rel="noopener noreferrer" target="_blank" href={repoUrl}>
                  <Icon.GitHub />
                </a>
              </li>
            )}
          </ul>
        </div>
        <h5>{title}</h5>
        {subTitle && <h6>{subTitle}</h6>}
        {featured && <Tag color="gold">Featured</Tag>}
        {technology && technology.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            {technology.map((tech, index) => (
              <Tag
                key={index}
                style={{ marginRight: "5px", marginBottom: "5px" }}
              >
                {tech}
              </Tag>
            ))}
          </div>
        )}
      </div>

      <ConfigProvider
        theme={{
          algorithm: lightMode ? theme.defaultAlgorithm : theme.darkAlgorithm,
          token: {
            colorPrimary: "#037fff",
          },
        }}
      >
        <Modal
          title={title}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={800}
          centered
          maskClosable={true}
        >
          <div style={{ padding: "20px 0" }}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={title}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              />
            )}
            {subTitle && (
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {subTitle}
              </p>
            )}
            {description && (
              <div
                dangerouslySetInnerHTML={{ __html: description }}
                style={{ marginBottom: "20px" }}
              />
            )}
            {summary && (
              <p style={{ fontStyle: "italic", marginBottom: "20px" }}>
                {summary}
              </p>
            )}

            {technology && technology.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <strong>Technologies:</strong>
                <div style={{ marginTop: "5px" }}>
                  {technology.map((tech, index) => (
                    <Tag
                      key={index}
                      style={{ marginRight: "5px", marginBottom: "5px" }}
                    >
                      {tech}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {skills && skills.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <strong>Skills:</strong>
                <div style={{ marginTop: "5px" }}>
                  {skills.map((skill, index) => (
                    <Tag
                      key={index}
                      style={{ marginRight: "5px", marginBottom: "5px" }}
                    >
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            <Space wrap>
              {liveUrl && (
                <Button
                  type="primary"
                  icon={<Icon.ExternalLink size={16} />}
                  href={liveUrl}
                  target="_blank"
                >
                  Live Demo
                </Button>
              )}
              {repoUrl && (
                <Button
                  icon={<Icon.GitHub size={16} />}
                  href={repoUrl}
                  target="_blank"
                >
                  Repository
                </Button>
              )}
              {frontendRepoUrl && (
                <Button
                  icon={<Icon.GitHub size={16} />}
                  href={frontendRepoUrl}
                  target="_blank"
                >
                  Frontend Repo
                </Button>
              )}
              {backendRepoUrl && (
                <Button
                  icon={<Icon.GitHub size={16} />}
                  href={backendRepoUrl}
                  target="_blank"
                >
                  Backend Repo
                </Button>
              )}
              {additionalLinks &&
                additionalLinks.map((link, index) => (
                  <Button key={index} href={link.url} target="_blank">
                    {link.label || `Link ${index + 1}`}
                  </Button>
                ))}
            </Space>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
}

export default Portfolio;
