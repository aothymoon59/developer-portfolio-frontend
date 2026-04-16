import React, { useEffect, useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Card, Table, Tag } from "antd";
import AdminPageHeader from "./components/AdminPageHeader";
import adminApi from "./adminApi";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const loadMessages = async (page = pagination.current, pageSize = pagination.pageSize) => {
    try {
      setLoading(true);
      const response = await adminApi.get("/admin/messages", {
        params: { page, limit: pageSize },
      });
      setMessages(response.data.data || []);
      setPagination({
        current: response.data.meta.page,
        pageSize: response.data.meta.limit,
        total: response.data.meta.total,
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to load messages."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="admin-page">
      <AdminPageHeader
        title="Messages"
        description="Review contacted messages in a paginated table."
        items={[{ title: "Admin" }, { title: "Messages" }]}
      />

      <Card className="admin-surface-card" bordered={false}>
        <Table
          rowKey="id"
          loading={loading}
          dataSource={messages}
          pagination={pagination}
          onChange={(nextPagination) =>
            loadMessages(nextPagination.current, nextPagination.pageSize)
          }
          locale={{ emptyText: error || "No messages found yet." }}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              render: (value) => (
                <span>
                  <MailOutlined style={{ marginRight: 8 }} />
                  {value}
                </span>
              ),
            },
            { title: "Email", dataIndex: "email" },
            { title: "Subject", dataIndex: "subject", render: (value) => value || "No subject" },
            {
              title: "Message",
              dataIndex: "message",
              render: (value) => (
                <div className="admin-cell-clamp">{value}</div>
              ),
            },
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

export default AdminMessages;
