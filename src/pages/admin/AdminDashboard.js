import React, { useEffect, useState } from "react";
import {
  FileTextOutlined,
  FolderOpenOutlined,
  MessageOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, List, Row, Skeleton, Statistic, Table, Tag } from "antd";
import AdminPageHeader from "./components/AdminPageHeader";
import adminApi from "./adminApi";

const statCards = [
  { key: "projects", label: "Projects", icon: <FolderOpenOutlined /> },
  { key: "skills", label: "Skills", icon: <UserOutlined /> },
  { key: "messages", label: "Messages", icon: <MessageOutlined /> },
  { key: "blogs", label: "Blog Posts", icon: <ReadOutlined /> },
  { key: "experiences", label: "Experiences", icon: <FileTextOutlined /> },
  { key: "education", label: "Education", icon: <FileTextOutlined /> },
];

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await adminApi.get("/admin/dashboard");
        setStats(response.data.data.stats || {});
        setRecentProjects(response.data.data.recentProjects || []);
        setRecentBlogs(response.data.data.recentBlogs || []);
        setRecentMessages(response.data.data.recentMessages || []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="admin-page">
      <AdminPageHeader
        title="Dashboard"
        description="A content overview synced with the structure of the public portfolio."
        items={[{ title: "Admin" }, { title: "Dashboard" }]}
      />

      {error ? <Card className="admin-error-card">{error}</Card> : null}

      <Row gutter={[18, 18]}>
        {statCards.map((item) => (
          <Col xs={24} sm={12} xl={8} xxl={4} key={item.key}>
            <Card className="admin-stat-card" bordered={false}>
              {loading ? (
                <Skeleton active paragraph={false} />
              ) : (
                <Statistic
                  title={item.label}
                  value={stats[item.key] || 0}
                  prefix={item.icon}
                />
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[18, 18]}>
        <Col xs={24} xl={12}>
          <Card title="Recent Projects" className="admin-surface-card" bordered={false}>
            <List
              dataSource={recentProjects}
              locale={{ emptyText: "No projects yet" }}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={new Date(item.createdAt).toLocaleDateString()}
                  />
                  {item.featured ? <Tag color="gold">Featured</Tag> : null}
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card title="Recent Blogs" className="admin-surface-card" bordered={false}>
            <List
              dataSource={recentBlogs}
              locale={{ emptyText: "No blogs yet" }}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={new Date(item.createdAt).toLocaleDateString()}
                  />
                  <Tag color={item.published ? "green" : "orange"}>
                    {item.published ? "Published" : "Draft"}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Latest Messages" className="admin-surface-card" bordered={false}>
        <Table
          rowKey="id"
          pagination={false}
          dataSource={recentMessages}
          columns={[
            { title: "Name", dataIndex: "name" },
            { title: "Email", dataIndex: "email" },
            { title: "Subject", dataIndex: "subject", render: (value) => value || "No subject" },
            {
              title: "Status",
              dataIndex: "status",
              render: (value) => <Tag color="blue">{value}</Tag>,
            },
            {
              title: "Received",
              dataIndex: "createdAt",
              render: (value) => new Date(value).toLocaleString(),
            },
          ]}
        />
      </Card>
    </div>
  );
}

export default AdminDashboard;
