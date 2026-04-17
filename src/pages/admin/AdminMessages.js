import React, { useEffect, useState } from "react";
import { EyeOutlined, MailOutlined, SendOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  Modal,
  Popover,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import AdminPageHeader from "./components/AdminPageHeader";
import adminApi from "./adminApi";

function AdminMessages() {
  const [replyForm] = Form.useForm();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replying, setReplying] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyTarget, setReplyTarget] = useState(null);
  const [apiMessage, contextHolder] = message.useMessage();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const loadMessages = async (
    page = pagination.current,
    pageSize = pagination.pageSize,
  ) => {
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
      const nextError =
        requestError.response?.data?.message || "Unable to load messages.";
      setError(nextError);
      apiMessage.error(nextError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const openReplyModal = (record) => {
    setReplyTarget(record);
    replyForm.setFieldsValue({
      subject: `Re: ${record.subject || "Your message"}`,
      message: "",
    });
  };

  const closeReplyModal = () => {
    setReplyTarget(null);
    replyForm.resetFields();
  };

  const handleReplySubmit = async (values) => {
    if (!replyTarget) return;

    setReplying(true);
    try {
      await adminApi.post(`/admin/messages/${replyTarget.id}/reply`, values);
      apiMessage.success("Reply sent successfully.");
      closeReplyModal();
      loadMessages(pagination.current, pagination.pageSize);
    } catch (requestError) {
      apiMessage.error(
        requestError.response?.data?.message || "Unable to send reply.",
      );
    } finally {
      setReplying(false);
    }
  };

  return (
    <div className="admin-page">
      {contextHolder}
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
            {
              title: "Subject",
              dataIndex: "subject",
              render: (value) => value || "No subject",
            },
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
              render: (value) => (
                <Tag
                  color={
                    value === "REPLIED"
                      ? "green"
                      : value === "READ"
                        ? "gold"
                        : "blue"
                  }
                >
                  {value}
                </Tag>
              ),
            },
            {
              title: "Received",
              dataIndex: "createdAt",
              render: (value) => new Date(value).toLocaleString(),
            },
            {
              title: "Action",
              render: (_, record) => (
                <Space>
                  <Button
                    icon={<EyeOutlined />}
                    onClick={() => setSelectedMessage(record)}
                  >
                    View
                  </Button>
                  <Popover
                    content={
                      record.status === "REPLIED"
                        ? "This message has already been replied to."
                        : "Send a reply to this message."
                    }
                  >
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={() => openReplyModal(record)}
                      disabled={record.status === "REPLIED"}
                    >
                      Reply
                    </Button>
                  </Popover>
                </Space>
              ),
            },
          ]}
        />
      </Card>

      <Modal
        open={Boolean(selectedMessage)}
        title="Message Details"
        onCancel={() => setSelectedMessage(null)}
        footer={null}
        width={760}
      >
        {selectedMessage ? (
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Name">
              {selectedMessage.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedMessage.email}
            </Descriptions.Item>
            <Descriptions.Item label="Subject">
              {selectedMessage.subject || "No subject"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {selectedMessage.status}
            </Descriptions.Item>
            <Descriptions.Item label="Received">
              {new Date(selectedMessage.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Message">
              <div style={{ whiteSpace: "pre-wrap" }}>
                {selectedMessage.message}
              </div>
            </Descriptions.Item>
          </Descriptions>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(replyTarget)}
        title="Reply to Message"
        onCancel={closeReplyModal}
        onOk={() => replyForm.submit()}
        confirmLoading={replying}
        okText="Send Reply"
        width={760}
      >
        {replyTarget ? (
          <Form
            form={replyForm}
            layout="vertical"
            onFinish={handleReplySubmit}
            requiredMark={false}
          >
            <Form.Item label="Recipient">
              <Input value={replyTarget.email} readOnly />
            </Form.Item>
            <Form.Item label="Original Subject">
              <Input value={replyTarget.subject || "No subject"} readOnly />
            </Form.Item>
            <Form.Item
              label="Reply Subject"
              name="subject"
              rules={[{ required: true, message: "Subject is required." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Reply Message"
              name="message"
              rules={[
                { required: true, message: "Reply message is required." },
              ]}
            >
              <Input.TextArea rows={8} />
            </Form.Item>
          </Form>
        ) : null}
      </Modal>
    </div>
  );
}

export default AdminMessages;
