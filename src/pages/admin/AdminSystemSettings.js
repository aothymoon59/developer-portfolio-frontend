import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, InputNumber, Switch, message } from "antd";
import AdminPageHeader from "./components/AdminPageHeader";
import adminApi from "./adminApi";

function AdminSystemSettings() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiMessage, contextHolder] = message.useMessage();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await adminApi.get("/admin/system-settings");
        form.setFieldsValue(response.data.data);
      } catch (error) {
        apiMessage.error(
          error.response?.data?.message || "Unable to load system settings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [apiMessage, form]);

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      await adminApi.put("/admin/system-settings", values);
      apiMessage.success("System settings updated successfully.");
    } catch (error) {
      apiMessage.error(
        error.response?.data?.message || "Unable to update system settings."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      {contextHolder}
      <AdminPageHeader
        title="System Settings"
        description="Manage Cloudinary and mail configuration from the admin panel. If a value is empty, the backend falls back to the environment variable."
        items={[{ title: "Admin" }, { title: "System Settings" }]}
      />

      <Card className="admin-surface-card" bordered={false} loading={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <div className="admin-form-grid">
            <Form.Item label="Cloudinary Cloud Name" name="cloudinaryCloudName">
              <Input />
            </Form.Item>
            <Form.Item label="Cloudinary API Key" name="cloudinaryApiKey">
              <Input />
            </Form.Item>
            <Form.Item label="Cloudinary API Secret" name="cloudinaryApiSecret">
              <Input.Password />
            </Form.Item>
            <Form.Item label="Cloudinary Folder" name="cloudinaryFolder">
              <Input />
            </Form.Item>
            <Form.Item label="SMTP Host" name="smtpHost">
              <Input />
            </Form.Item>
            <Form.Item label="SMTP Port" name="smtpPort">
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="SMTP Secure" name="smtpSecure" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="SMTP User" name="smtpUser">
              <Input />
            </Form.Item>
            <Form.Item label="SMTP Password" name="smtpPass">
              <Input.Password />
            </Form.Item>
            <Form.Item label="Mail From" name="mailFrom">
              <Input />
            </Form.Item>
            <Form.Item
              label="Admin Notification Email"
              name="adminNotificationEmail"
              rules={[{ type: "email", message: "Enter a valid email." }]}
            >
              <Input />
            </Form.Item>
          </div>

          <Button type="primary" htmlType="submit" loading={saving}>
            Save System Settings
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default AdminSystemSettings;
