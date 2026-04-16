import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, message } from "antd";
import AdminPageHeader from "./components/AdminPageHeader";
import RichTextField from "./components/RichTextField";
import adminApi from "./adminApi";

function AdminHome() {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiMessage, contextHolder] = message.useMessage();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await adminApi.get("/admin/home");
        form.setFieldsValue(response.data.data);
      } catch (error) {
        apiMessage.error(
          error.response?.data?.message || "Unable to load home content."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [apiMessage, form]);

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      await adminApi.put("/admin/home", values);
      apiMessage.success("Home content updated successfully.");
    } catch (error) {
      apiMessage.error(
        error.response?.data?.message || "Unable to update home content."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      {contextHolder}
      <AdminPageHeader
        title="Home"
        description="Manage the visitor-facing introduction: name, job title, and hero description."
        items={[{ title: "Admin" }, { title: "Home" }]}
      />

      <Card className="admin-surface-card" bordered={false} loading={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <div className="admin-form-grid">
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Full name is required." }]}
            >
              <Input placeholder="Md Saidul Islam" />
            </Form.Item>

            <Form.Item
              label="Job Title"
              name="jobTitle"
              rules={[{ required: true, message: "Job title is required." }]}
            >
              <Input placeholder="Senior Software Developer" />
            </Form.Item>

            <Form.Item label="Hero Title" name="heroTitle">
              <Input placeholder="A short hero headline" />
            </Form.Item>

            <Form.Item label="Hero Subtitle" name="heroSubtitle">
              <Input placeholder="A short supporting line" />
            </Form.Item>
          </div>

          <Form.Item
            label="Description"
            name="homeDescription"
            rules={[{ required: true, message: "Description is required." }]}
          >
            <RichTextField placeholder="Write the home page introduction..." />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={saving}>
            Save Home Content
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default AdminHome;
