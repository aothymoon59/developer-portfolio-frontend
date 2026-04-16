import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  StarFilled,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tabs,
  message,
} from "antd";
import AdminPageHeader from "./components/AdminPageHeader";
import RichTextField from "./components/RichTextField";
import adminApi from "./adminApi";

function AdminAbout() {
  const [form] = Form.useForm();
  const [serviceForm] = Form.useForm();
  const [reviewForm] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [serviceModal, setServiceModal] = useState({ open: false, record: null });
  const [reviewModal, setReviewModal] = useState({ open: false, record: null });
  const [preview, setPreview] = useState(null);
  const [apiMessage, contextHolder] = message.useMessage();

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await adminApi.get("/admin/about");
      form.setFieldsValue(response.data.data.content);
      setServices(response.data.data.services || []);
      setReviews(response.data.data.reviews || []);
    } catch (error) {
      apiMessage.error(
        error.response?.data?.message || "Unable to load about content."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      await adminApi.put("/admin/about", values);
      apiMessage.success("About content updated successfully.");
    } catch (error) {
      apiMessage.error(
        error.response?.data?.message || "Unable to update about content."
      );
    } finally {
      setSaving(false);
    }
  };

  const openServiceModal = (record = null) => {
    setServiceModal({ open: true, record });
    serviceForm.setFieldsValue(
      record || {
        imageUrl: "",
        title: "",
        description: "",
        sortOrder: 0,
      }
    );
  };

  const openReviewModal = (record = null) => {
    setReviewModal({ open: true, record });
    reviewForm.setFieldsValue(
      record || {
        review: "",
        rating: 5,
        reviewerName: "",
        reviewerTitle: "",
        officeName: "",
        sortOrder: 0,
      }
    );
  };

  const closeServiceModal = () => {
    setServiceModal({ open: false, record: null });
    serviceForm.resetFields();
  };

  const closeReviewModal = () => {
    setReviewModal({ open: false, record: null });
    reviewForm.resetFields();
  };

  const handleServiceSubmit = async (values) => {
    try {
      if (serviceModal.record?.id) {
        await adminApi.put(`/admin/about/services/${serviceModal.record.id}`, values);
      } else {
        await adminApi.post("/admin/about/services", values);
      }
      apiMessage.success("Service saved successfully.");
      closeServiceModal();
      loadData();
    } catch (error) {
      apiMessage.error(error.response?.data?.message || "Unable to save service.");
    }
  };

  const handleReviewSubmit = async (values) => {
    try {
      if (reviewModal.record?.id) {
        await adminApi.put(`/admin/about/reviews/${reviewModal.record.id}`, values);
      } else {
        await adminApi.post("/admin/about/reviews", values);
      }
      apiMessage.success("Review saved successfully.");
      closeReviewModal();
      loadData();
    } catch (error) {
      apiMessage.error(error.response?.data?.message || "Unable to save review.");
    }
  };

  const handleDelete = async (type, id) => {
    try {
      await adminApi.delete(`/admin/about/${type}/${id}`);
      apiMessage.success(`${type === "services" ? "Service" : "Review"} deleted successfully.`);
      loadData();
    } catch (error) {
      apiMessage.error(error.response?.data?.message || "Unable to delete item.");
    }
  };

  return (
    <div className="admin-page">
      {contextHolder}
      <AdminPageHeader
        title="About"
        description="Keep the about page aligned with your current profile, image assets, and downloadable CV."
        items={[{ title: "Admin" }, { title: "About" }]}
      />

      <Tabs
        items={[
          {
            key: "content",
            label: "About Content",
            children: (
              <Card className="admin-surface-card" bordered={false} loading={loading}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  requiredMark={false}
                >
                  <div className="admin-form-grid">
                    <Form.Item
                      label="Section Title"
                      name="aboutTitle"
                      rules={[{ required: true, message: "About title is required." }]}
                    >
                      <Input placeholder="About Me" />
                    </Form.Item>

                    <Form.Item
                      label="CV URL"
                      name="cvUrl"
                      rules={[{ required: true, message: "CV URL is required." }]}
                    >
                      <Input placeholder="https://example.com/resume.pdf" />
                    </Form.Item>

                    <Form.Item
                      label="About Image URL"
                      name="aboutImageUrl"
                      rules={[{ required: true, message: "About image URL is required." }]}
                    >
                      <Input placeholder="https://example.com/about.jpg" />
                    </Form.Item>

                    <Form.Item
                      label="About Large Image URL"
                      name="aboutImageLgUrl"
                      rules={[
                        { required: true, message: "Large image URL is required." },
                      ]}
                    >
                      <Input placeholder="https://example.com/about-large.jpg" />
                    </Form.Item>
                  </div>

                  <Form.Item
                    label="Short Description"
                    name="aboutDescription"
                    rules={[
                      { required: true, message: "Short description is required." },
                    ]}
                  >
                    <RichTextField placeholder="Write the summary shown on the about section..." />
                  </Form.Item>

                  <Form.Item
                    label="Detailed Content"
                    name="aboutDetails"
                    rules={[
                      { required: true, message: "Detailed about content is required." },
                    ]}
                  >
                    <RichTextField placeholder="Write the detailed about content..." />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" loading={saving}>
                    Save About Content
                  </Button>
                </Form>
              </Card>
            ),
          },
          {
            key: "services",
            label: "Services",
            children: (
              <Card
                className="admin-surface-card"
                bordered={false}
                extra={
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => openServiceModal()}>
                    Add Service
                  </Button>
                }
              >
                <Table
                  rowKey="id"
                  loading={loading}
                  dataSource={services}
                  pagination={{ pageSize: 6 }}
                  columns={[
                    { title: "Image", dataIndex: "imageUrl", render: (value) => value || "-" },
                    { title: "Title", dataIndex: "title" },
                    {
                      title: "Description",
                      dataIndex: "description",
                      render: (value) => <div className="admin-cell-clamp">{value}</div>,
                    },
                    { title: "Sort", dataIndex: "sortOrder" },
                    {
                      title: "Action",
                      render: (_, record) => (
                        <Space>
                          <Button icon={<EyeOutlined />} onClick={() => setPreview({ type: "service", record })} />
                          <Button icon={<EditOutlined />} onClick={() => openServiceModal(record)} />
                          <Popconfirm title="Delete this service?" onConfirm={() => handleDelete("services", record.id)}>
                            <Button danger icon={<DeleteOutlined />} />
                          </Popconfirm>
                        </Space>
                      ),
                    },
                  ]}
                />
              </Card>
            ),
          },
          {
            key: "reviews",
            label: "Reviews",
            children: (
              <Card
                className="admin-surface-card"
                bordered={false}
                extra={
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => openReviewModal()}>
                    Add Review
                  </Button>
                }
              >
                <Table
                  rowKey="id"
                  loading={loading}
                  dataSource={reviews}
                  pagination={{ pageSize: 6 }}
                  columns={[
                    {
                      title: "Review",
                      dataIndex: "review",
                      render: (value) => <div className="admin-cell-clamp">{value}</div>,
                    },
                    {
                      title: "Rating",
                      dataIndex: "rating",
                      render: (value) => (
                        <span>{Array.from({ length: value || 0 }).map((_, index) => <StarFilled key={index} style={{ color: "#faad14", marginRight: 4 }} />)}</span>
                      ),
                    },
                    { title: "Reviewed By", dataIndex: "reviewerName" },
                    { title: "Title", dataIndex: "reviewerTitle", render: (value) => value || "-" },
                    { title: "Office", dataIndex: "officeName", render: (value) => value || "-" },
                    {
                      title: "Action",
                      render: (_, record) => (
                        <Space>
                          <Button icon={<EyeOutlined />} onClick={() => setPreview({ type: "review", record })} />
                          <Button icon={<EditOutlined />} onClick={() => openReviewModal(record)} />
                          <Popconfirm title="Delete this review?" onConfirm={() => handleDelete("reviews", record.id)}>
                            <Button danger icon={<DeleteOutlined />} />
                          </Popconfirm>
                        </Space>
                      ),
                    },
                  ]}
                />
              </Card>
            ),
          },
        ]}
      />

      <Modal
        open={serviceModal.open}
        title={serviceModal.record ? "Edit Service" : "Add Service"}
        onCancel={closeServiceModal}
        onOk={() => serviceForm.submit()}
        width={820}
      >
        <Form form={serviceForm} layout="vertical" onFinish={handleServiceSubmit} requiredMark={false}>
          <div className="admin-form-grid">
            <Form.Item
              label="Image URL"
              name="imageUrl"
              rules={[{ required: true, message: "Image URL is required." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Sort Order" name="sortOrder">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required." }]}
          >
            <RichTextField placeholder="Write the service description..." />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={reviewModal.open}
        title={reviewModal.record ? "Edit Review" : "Add Review"}
        onCancel={closeReviewModal}
        onOk={() => reviewForm.submit()}
        width={820}
      >
        <Form form={reviewForm} layout="vertical" onFinish={handleReviewSubmit} requiredMark={false}>
          <div className="admin-form-grid">
            <Form.Item
              label="Reviewed By Name"
              name="reviewerName"
              rules={[{ required: true, message: "Reviewer name is required." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Reviewer Title"
              name="reviewerTitle"
              rules={[{ required: true, message: "Reviewer title is required." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Office Name"
              name="officeName"
              rules={[{ required: true, message: "Office name is required." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: "Rating is required." }]}
            >
              <InputNumber min={1} max={5} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Sort Order" name="sortOrder">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <Form.Item
            label="Review"
            name="review"
            rules={[{ required: true, message: "Review is required." }]}
          >
            <RichTextField placeholder="Write the review..." />
          </Form.Item>
        </Form>
      </Modal>

      <Modal open={Boolean(preview)} footer={null} onCancel={() => setPreview(null)} width={760} title={preview?.type === "service" ? preview?.record?.title : preview?.record?.reviewerName}>
        {preview?.type === "service" ? (
          <div className="admin-preview">
            <p><strong>Image URL:</strong> {preview.record.imageUrl}</p>
            <div
              className="admin-preview__content"
              dangerouslySetInnerHTML={{ __html: preview.record.description || "" }}
            />
          </div>
        ) : preview?.type === "review" ? (
          <div className="admin-preview">
            <p><strong>Reviewer:</strong> {preview.record.reviewerName}</p>
            <p><strong>Title:</strong> {preview.record.reviewerTitle || "-"}</p>
            <p><strong>Office:</strong> {preview.record.officeName || "-"}</p>
            <p><strong>Rating:</strong> {preview.record.rating}</p>
            <div
              className="admin-preview__content"
              dangerouslySetInnerHTML={{ __html: preview.record.review || "" }}
            />
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

export default AdminAbout;
