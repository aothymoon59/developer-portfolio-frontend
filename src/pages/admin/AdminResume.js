import React, { useEffect, useMemo, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  message,
} from "antd";
import dayjs from "dayjs";
import AdminPageHeader from "./components/AdminPageHeader";
import RichTextField from "./components/RichTextField";
import adminApi from "./adminApi";

const entityConfig = {
  skills: {
    title: "Skills",
    endpoint: "/admin/resume/skills",
  },
  experiences: {
    title: "Experience",
    endpoint: "/admin/resume/experiences",
  },
  education: {
    title: "Education",
    endpoint: "/admin/resume/education",
  },
};

function AdminResume() {
  const [data, setData] = useState({
    skills: [],
    experiences: [],
    education: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeType, setActiveType] = useState("skills");
  const [modalState, setModalState] = useState({
    open: false,
    type: "skills",
    record: null,
  });
  const [apiMessage, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const loadResume = async () => {
    try {
      const response = await adminApi.get("/admin/resume");
      setData(response.data.data);
    } catch (error) {
      apiMessage.error(
        error.response?.data?.message || "Unable to load resume data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const openModal = (type, record = null) => {
    setModalState({ open: true, type, record });

    if (type === "skills") {
      form.setFieldsValue(
        record || { name: "", category: "", level: 80, icon: "", sortOrder: 0 }
      );
      return;
    }

    if (type === "experiences") {
      form.setFieldsValue(
        record
          ? {
              ...record,
              startDate: record.startDate ? dayjs(record.startDate) : null,
              endDate: record.endDate ? dayjs(record.endDate) : null,
            }
          : {
              company: "",
              position: "",
              startDate: null,
              endDate: null,
              isCurrent: false,
              technologies: [],
              sortOrder: 0,
              description: "",
            }
      );
      return;
    }

    form.setFieldsValue(
      record
        ? {
            ...record,
            startDate: record.startDate ? dayjs(record.startDate) : null,
            endDate: record.endDate ? dayjs(record.endDate) : null,
          }
        : {
            institute: "",
            degree: "",
            fieldOfStudy: "",
            startDate: null,
            endDate: null,
            grade: "",
            sortOrder: 0,
            description: "",
          }
    );
  };

  const closeModal = () => {
    setModalState((previous) => ({ ...previous, open: false, record: null }));
    form.resetFields();
  };

  const handleDelete = async (type, id) => {
    try {
      await adminApi.delete(`${entityConfig[type].endpoint}/${id}`);
      apiMessage.success(`${entityConfig[type].title} deleted successfully.`);
      loadResume();
    } catch (error) {
      apiMessage.error(error.response?.data?.message || "Delete failed.");
    }
  };

  const handleSubmit = async (values) => {
    const { type, record } = modalState;
    const endpoint = entityConfig[type].endpoint;

    const payload = {
      ...values,
      startDate: values.startDate ? values.startDate.toISOString() : null,
      endDate: values.endDate ? values.endDate.toISOString() : null,
    };

    setSaving(true);
    try {
      if (record?.id) {
        await adminApi.put(`${endpoint}/${record.id}`, payload);
      } else {
        await adminApi.post(endpoint, payload);
      }

      apiMessage.success(`${entityConfig[type].title} saved successfully.`);
      closeModal();
      loadResume();
    } catch (error) {
      apiMessage.error(error.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const tabs = useMemo(
    () => [
      {
        key: "skills",
        label: "Skills",
        children: (
          <Table
            rowKey="id"
            loading={loading}
            dataSource={data.skills}
            pagination={{ pageSize: 6 }}
            columns={[
              { title: "Skill", dataIndex: "name" },
              { title: "Category", dataIndex: "category", render: (value) => value || "-" },
              { title: "Level", dataIndex: "level", render: (value) => `${value || 0}%` },
              { title: "Sort", dataIndex: "sortOrder" },
              {
                title: "Action",
                render: (_, record) => (
                  <Space>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => openModal("skills", record)}
                    />
                    <Popconfirm
                      title="Delete this skill?"
                      onConfirm={() => handleDelete("skills", record.id)}
                    >
                      <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Space>
                ),
              },
            ]}
          />
        ),
      },
      {
        key: "experiences",
        label: "Experience",
        children: (
          <Table
            rowKey="id"
            loading={loading}
            dataSource={data.experiences}
            pagination={{ pageSize: 6 }}
            columns={[
              { title: "Company", dataIndex: "company" },
              { title: "Position", dataIndex: "position" },
              {
                title: "Technologies",
                dataIndex: "technologies",
                render: (items) =>
                  items?.length ? items.map((item) => <Tag key={item}>{item}</Tag>) : "-",
              },
              { title: "Sort", dataIndex: "sortOrder" },
              {
                title: "Action",
                render: (_, record) => (
                  <Space>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => openModal("experiences", record)}
                    />
                    <Popconfirm
                      title="Delete this experience?"
                      onConfirm={() => handleDelete("experiences", record.id)}
                    >
                      <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Space>
                ),
              },
            ]}
          />
        ),
      },
      {
        key: "education",
        label: "Education",
        children: (
          <Table
            rowKey="id"
            loading={loading}
            dataSource={data.education}
            pagination={{ pageSize: 6 }}
            columns={[
              { title: "Institute", dataIndex: "institute" },
              { title: "Degree", dataIndex: "degree" },
              { title: "Field", dataIndex: "fieldOfStudy", render: (value) => value || "-" },
              { title: "Grade", dataIndex: "grade", render: (value) => value || "-" },
              {
                title: "Action",
                render: (_, record) => (
                  <Space>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => openModal("education", record)}
                    />
                    <Popconfirm
                      title="Delete this education item?"
                      onConfirm={() => handleDelete("education", record.id)}
                    >
                      <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Space>
                ),
              },
            ]}
          />
        ),
      },
    ],
    [data, loading]
  );

  return (
    <div className="admin-page">
      {contextHolder}
      <AdminPageHeader
        title="Resume"
        description="Manage skills, experience, and education with dedicated add/edit sections."
        items={[{ title: "Admin" }, { title: "Resume" }]}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openModal(activeType)}
          >
            Add {entityConfig[activeType].title}
          </Button>
        }
      />

      <Card className="admin-surface-card" bordered={false}>
        <Tabs
          items={tabs}
          activeKey={activeType}
          onChange={(key) => setActiveType(key)}
        />
      </Card>

      <Modal
        open={modalState.open}
        title={`${modalState.record ? "Edit" : "Add"} ${entityConfig[modalState.type].title}`}
        onCancel={closeModal}
        onOk={() => form.submit()}
        confirmLoading={saving}
        width={820}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          {modalState.type === "skills" ? (
            <div className="admin-form-grid">
              <Form.Item
                label="Skill Name"
                name="name"
                rules={[{ required: true, message: "Skill name is required." }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Input />
              </Form.Item>
              <Form.Item
                label="Level"
                name="level"
                rules={[{ required: true, message: "Level is required." }]}
              >
                <InputNumber min={1} max={100} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Sort Order" name="sortOrder">
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </div>
          ) : null}

          {modalState.type === "experiences" ? (
            <>
              <div className="admin-form-grid">
                <Form.Item
                  label="Company"
                  name="company"
                  rules={[{ required: true, message: "Company is required." }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Position"
                  name="position"
                  rules={[{ required: true, message: "Position is required." }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Start Date"
                  name="startDate"
                  rules={[{ required: true, message: "Start date is required." }]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="End Date" name="endDate">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Technologies"
                  name="technologies"
                  rules={[{ required: true, message: "Technologies are required." }]}
                >
                  <Select mode="tags" placeholder="Add technologies" />
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
                <RichTextField placeholder="Write the experience details..." />
              </Form.Item>
            </>
          ) : null}

          {modalState.type === "education" ? (
            <>
              <div className="admin-form-grid">
                <Form.Item
                  label="Institute"
                  name="institute"
                  rules={[{ required: true, message: "Institute is required." }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Degree"
                  name="degree"
                  rules={[{ required: true, message: "Degree is required." }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Field of Study" name="fieldOfStudy">
                  <Input />
                </Form.Item>
                <Form.Item label="Grade" name="grade">
                  <Input />
                </Form.Item>
                <Form.Item label="Start Date" name="startDate">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="End Date" name="endDate">
                  <DatePicker style={{ width: "100%" }} />
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
                <RichTextField placeholder="Write the education details..." />
              </Form.Item>
            </>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
}

export default AdminResume;
