import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  message,
} from "antd";
import dayjs from "dayjs";
import AdminPageHeader from "./components/AdminPageHeader";
import AdminImageUpload from "./components/AdminImageUpload";
import RichTextField from "./components/RichTextField";
import adminApi from "./adminApi";
import { buildMultipartFormData } from "./multipartForm";
import { resolveAssetUrl } from "../../utils/assetUrl";
import { slugify } from "../../utils/slug";

function AdminBlogs() {
  const [form] = Form.useForm();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [modalState, setModalState] = useState({ open: false, record: null });
  const [viewRecord, setViewRecord] = useState(null);
  const [apiMessage, contextHolder] = message.useMessage();

  const loadBlogs = async (
    page = pagination.current,
    pageSize = pagination.pageSize,
  ) => {
    setLoading(true);
    try {
      const response = await adminApi.get("/admin/blogs", {
        params: { page, limit: pageSize },
      });
      setBlogs(response.data.data || []);
      setPagination({
        current: response.data.meta.page,
        pageSize: response.data.meta.limit,
        total: response.data.meta.total,
      });
    } catch (error) {
      apiMessage.error(
        error.response?.data?.message || "Unable to load blogs.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const openModal = (record = null) => {
    setModalState({ open: true, record });
    form.setFieldsValue(
      record
        ? {
            ...record,
            publishedAt: record.publishedAt ? dayjs(record.publishedAt) : null,
          }
        : {
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            coverImage: "",
            tags: [],
            published: false,
            publishedAt: null,
          },
    );
  };

  const closeModal = () => {
    setModalState({ open: false, record: null });
    form.resetFields();
  };

  const handleTitleChange = (event) => {
    const nextTitle = event.target.value;
    form.setFieldsValue({
      title: nextTitle,
      slug: slugify(nextTitle),
    });
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.delete(`/admin/blogs/${id}`);
      apiMessage.success("Blog deleted successfully.");
      loadBlogs();
    } catch (error) {
      apiMessage.error(
        error.response?.data?.message || "Unable to delete blog.",
      );
    }
  };

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      publishedAt: values.publishedAt ? values.publishedAt.toISOString() : null,
    };

    setSubmitting(true);
    try {
      const formData = buildMultipartFormData(payload, {
        fileFields: {
          coverImage: "coverImageFile",
        },
        jsonFields: ["tags"],
      });
      if (modalState.record?.id) {
        await adminApi.put(`/admin/blogs/${modalState.record.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await adminApi.post("/admin/blogs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      apiMessage.success("Blog saved successfully.");
      closeModal();
      loadBlogs();
    } catch (error) {
      apiMessage.error(error.response?.data?.message || "Unable to save blog.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-page">
      {contextHolder}
      <AdminPageHeader
        title="Blogs"
        description="Create and manage blog posts with rich text content and paginated tables."
        items={[{ title: "Admin" }, { title: "Blogs" }]}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openModal()}
          >
            Add Blog
          </Button>
        }
      />

      <Card className="admin-surface-card" bordered={false}>
        <Table
          rowKey="id"
          loading={loading}
          dataSource={blogs}
          pagination={pagination}
          onChange={(nextPagination) =>
            loadBlogs(nextPagination.current, nextPagination.pageSize)
          }
          columns={[
            { title: "Title", dataIndex: "title" },
            {
              title: "Tags",
              dataIndex: "tags",
              render: (items) =>
                items?.length
                  ? items.map((item) => <Tag key={item}>{item}</Tag>)
                  : "-",
            },
            {
              title: "Status",
              dataIndex: "published",
              render: (value) => (
                <Tag color={value ? "green" : "orange"}>
                  {value ? "Published" : "Draft"}
                </Tag>
              ),
            },
            {
              title: "Action",
              render: (_, record) => (
                <Space>
                  <Button
                    icon={<EyeOutlined />}
                    onClick={() => setViewRecord(record)}
                  />
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => openModal(record)}
                  />
                  <Popconfirm
                    title="Delete this blog?"
                    onConfirm={() => handleDelete(record.id)}
                  >
                    <Button danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
        />
      </Card>

      <Modal
        open={modalState.open}
        title={modalState.record ? "Edit Blog" : "Add Blog"}
        onCancel={closeModal}
        onOk={() => form.submit()}
        confirmLoading={submitting}
        width={960}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <div className="admin-form-grid">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required." }]}
            >
              <Input onChange={handleTitleChange} />
            </Form.Item>
            <Form.Item
              label="Slug"
              name="slug"
              rules={[{ required: true, message: "Slug is required." }]}
            >
              <Input readOnly />
            </Form.Item>
            {/* <Form.Item
              label="Subtitle"
              name="subTitle"
              rules={[{ required: true, message: "Subtitle is required." }]}
            >
              <Input />
            </Form.Item> */}
            <Form.Item
              label="Cover Image"
              name="coverImage"
              rules={[{ required: true, message: "Cover image is required." }]}
            >
              <AdminImageUpload label="Upload cover image" />
            </Form.Item>
            <Form.Item
              label="Tags"
              name="tags"
              rules={[{ required: true, message: "Tags are required." }]}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                tokenSeparators={[","]}
                options={(form.getFieldValue("tags") || []).map((item) => ({
                  value: item,
                  label: item,
                }))}
                placeholder="Add tags"
              />
            </Form.Item>
            <Form.Item label="Published At" name="publishedAt">
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Published"
              name="published"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>

          <Form.Item
            label="Excerpt"
            name="excerpt"
            rules={[{ required: true, message: "Excerpt is required." }]}
          >
            <RichTextField placeholder="Write the blog summary..." />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Content is required." }]}
          >
            <RichTextField placeholder="Write the blog content..." />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={Boolean(viewRecord)}
        title={viewRecord?.title}
        onCancel={() => setViewRecord(null)}
        footer={null}
        width={860}
      >
        {viewRecord ? (
          <div className="admin-preview">
            <div className="admin-preview__image">
              <img
                src={resolveAssetUrl(viewRecord.coverImage)}
                alt={viewRecord.title}
              />
            </div>
            <p>
              <strong>Subtitle:</strong> {viewRecord.subTitle}
            </p>
            <div
              className="admin-preview__content"
              dangerouslySetInnerHTML={{ __html: viewRecord.content || "" }}
            />
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

export default AdminBlogs;
