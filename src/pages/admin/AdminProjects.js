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
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  message,
} from "antd";
import AdminPageHeader from "./components/AdminPageHeader";
import AdminImageUpload from "./components/AdminImageUpload";
import RichTextField from "./components/RichTextField";
import adminApi from "./adminApi";
import { buildMultipartFormData } from "./multipartForm";
import { resolveAssetUrl } from "../../utils/assetUrl";
import { slugify } from "../../utils/slug";

function AdminProjects() {
  const [form] = Form.useForm();
  const [projects, setProjects] = useState([]);
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

  const loadProjects = async (
    page = pagination.current,
    pageSize = pagination.pageSize,
  ) => {
    setLoading(true);
    try {
      const response = await adminApi.get("/admin/projects", {
        params: { page, limit: pageSize },
      });
      setProjects(response.data.data || []);
      setPagination({
        current: response.data.meta.page,
        pageSize: response.data.meta.limit,
        total: response.data.meta.total,
      });
    } catch (error) {
      apiMessage.error(
        error.response?.data?.message || "Unable to load projects.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openModal = (record = null) => {
    setModalState({ open: true, record });
    form.setFieldsValue(
      record || {
        title: "",
        slug: "",
        subTitle: "",
        summary: "",
        description: "",
        imageUrl: "",
        liveUrl: "",
        frontendRepoUrl: "",
        backendRepoUrl: "",
        technology: [],
        skills: [],
        additionalLinks: [{ label: "", url: "" }],
        sortOrder: 0,
        featured: false,
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
      await adminApi.delete(`/admin/projects/${id}`);
      apiMessage.success("Project deleted successfully.");
      loadProjects();
    } catch (error) {
      apiMessage.error(
        error.response?.data?.message || "Unable to delete project.",
      );
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const formData = buildMultipartFormData(values, {
        fileFields: {
          imageUrl: "image",
        },
        jsonFields: ["technology", "skills", "additionalLinks"],
      });
      if (modalState.record?.id) {
        await adminApi.put(
          `/admin/projects/${modalState.record.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
      } else {
        await adminApi.post("/admin/projects", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      apiMessage.success("Project saved successfully.");
      closeModal();
      loadProjects();
    } catch (error) {
      apiMessage.error(
        error.response?.data?.message || "Unable to save project.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-page">
      {contextHolder}
      <AdminPageHeader
        title="Projects"
        description="Add, view, edit, and delete projects with rich text details and multi-value fields."
        items={[{ title: "Admin" }, { title: "Projects" }]}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openModal()}
          >
            Add Project
          </Button>
        }
      />

      <Card className="admin-surface-card" bordered={false}>
        <Table
          rowKey="id"
          loading={loading}
          dataSource={projects}
          pagination={pagination}
          onChange={(nextPagination) =>
            loadProjects(nextPagination.current, nextPagination.pageSize)
          }
          columns={[
            { title: "Title", dataIndex: "title" },
            { title: "Subtitle", dataIndex: "subTitle" },
            {
              title: "Featured",
              dataIndex: "featured",
              render: (value) =>
                value ? <Tag color="gold">Featured</Tag> : "No",
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
                    title="Delete this project?"
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
        title={modalState.record ? "Edit Project" : "Add Project"}
        onCancel={closeModal}
        onOk={() => form.submit()}
        confirmLoading={submitting}
        width={960}
        maskClosable={false}
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
            <Form.Item
              label="Subtitle"
              name="subTitle"
              rules={[{ required: true, message: "Subtitle is required." }]}
            >
              <Input />
            </Form.Item>
            {/* <Form.Item label="Summary" name="summary">
              <Input />
            </Form.Item> */}
            <Form.Item
              label="Project Image"
              name="imageUrl"
              rules={[
                { required: true, message: "Project image is required." },
              ]}
            >
              <AdminImageUpload label="Upload project image" />
            </Form.Item>
            <Form.Item
              label="Live URL"
              name="liveUrl"
              rules={[{ required: true, message: "Live URL is required." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Frontend Github URL"
              name="frontendRepoUrl"
              rules={[
                { required: true, message: "Frontend Github URL is required." },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Backend Github URL"
              name="backendRepoUrl"
              rules={[
                { required: true, message: "Backend Github URL is required." },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Technologies"
              name="technology"
              rules={[
                { required: true, message: "Technologies are required." },
              ]}
            >
              <Select mode="tags" placeholder="Add technologies" />
            </Form.Item>
            {/* <Form.Item
              label="Skills"
              name="skills"
              rules={[{ required: true, message: "Skills are required." }]}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                tokenSeparators={[","]}
                options={(form.getFieldValue("skills") || []).map((item) => ({
                  value: item,
                  label: item,
                }))}
                placeholder="Select or add skills"
              />
            </Form.Item> */}
            <Form.Item label="Sort Order" name="sortOrder">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Featured"
              name="featured"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>

          <Form.Item
            label="Project Description"
            name="description"
            rules={[{ required: true, message: "Description is required." }]}
          >
            <RichTextField placeholder="Write the full project details..." />
          </Form.Item>

          <Form.List name="additionalLinks">
            {(fields, { add, remove }) => (
              <div className="admin-form-list">
                <div className="admin-form-list__header">
                  <span>Additional Links</span>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                    type="dashed"
                  >
                    Add Link
                  </Button>
                </div>
                {fields.map((field) => (
                  <div className="admin-inline-grid" key={field.key}>
                    <Form.Item
                      {...field}
                      label="Label"
                      name={[field.name, "label"]}
                      rules={[
                        { required: true, message: "Label is required." },
                      ]}
                    >
                      <Input placeholder="Case study" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="URL"
                      name={[field.name, "url"]}
                      rules={[{ required: true, message: "URL is required." }]}
                    >
                      <Input placeholder="https://example.com" />
                    </Form.Item>
                    <Button danger onClick={() => remove(field.name)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Form.List>
        </Form>
      </Modal>

      <Modal
        open={Boolean(viewRecord)}
        title={viewRecord?.title}
        onCancel={() => setViewRecord(null)}
        footer={null}
        width={860}
        maskClosable={true}
      >
        {viewRecord ? (
          <div className="admin-preview">
            <div className="admin-preview__image">
              <img
                src={resolveAssetUrl(viewRecord.imageUrl)}
                alt={viewRecord.title}
              />
            </div>
            <p>
              <strong>Subtitle:</strong> {viewRecord.subTitle}
            </p>
            <p>
              <strong>Live URL:</strong> {viewRecord.liveUrl || "-"}
            </p>
            <p>
              <strong>Frontend Github:</strong>{" "}
              {viewRecord.frontendRepoUrl || "-"}
            </p>
            <p>
              <strong>Backend Github:</strong>{" "}
              {viewRecord.backendRepoUrl || "-"}
            </p>
            <div
              className="admin-preview__content"
              dangerouslySetInnerHTML={{ __html: viewRecord.description || "" }}
            />
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

export default AdminProjects;
