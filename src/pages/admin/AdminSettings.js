import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, message } from "antd";
import AdminPageHeader from "./components/AdminPageHeader";
import AdminImageUpload from "./components/AdminImageUpload";
import RichTextField from "./components/RichTextField";
import adminApi from "./adminApi";
import { buildMultipartFormData } from "./multipartForm";

function AdminSettings() {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiMessage, contextHolder] = message.useMessage();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await adminApi.get("/admin/settings");
        form.setFieldsValue({
          ...response.data.data,
          phoneNumbers: (response.data.data.phoneNumbers || []).join(", "),
          emailAddresses: (response.data.data.emailAddresses || []).join(", "),
        });
      } catch (requestError) {
        apiMessage.error(
          requestError.response?.data?.message ||
            "Unable to load current site settings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [apiMessage, form]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const normalizedValues = {
        ...values,
        phoneNumbers: String(values.phoneNumbers || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        emailAddresses: String(values.emailAddresses || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };
      const formData = buildMultipartFormData(normalizedValues, {
        fileFields: {
          logoUrl: "logo",
        },
        jsonFields: ["phoneNumbers", "emailAddresses"],
      });
      await adminApi.put("/admin/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      apiMessage.success("Site settings updated successfully.");
    } catch (requestError) {
      apiMessage.error(
        requestError.response?.data?.message ||
          "Unable to update site settings."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-page">
      {contextHolder}
      <AdminPageHeader
        title="Settings"
        description="Manage site title, logo, contact details, social media, and supporting settings."
        items={[{ title: "Admin" }, { title: "Settings" }]}
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
              label="Site Title"
              name="siteTitle"
              rules={[{ required: true, message: "Site title is required." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Logo"
              name="logoUrl"
              rules={[{ required: true, message: "Logo is required." }]}
            >
              <AdminImageUpload label="Upload logo" />
            </Form.Item>
            <Form.Item
              label="Primary Email"
              name="email"
              rules={[{ required: true, message: "Email is required." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Primary Phone"
              name="phone"
              rules={[{ required: true, message: "Phone is required." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "Location is required." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Numbers"
              name="phoneNumbers"
              rules={[{ required: true, message: "Phone numbers are required." }]}
            >
              <Input placeholder="+8801770000000, +8801880000000" />
            </Form.Item>
            <Form.Item
              label="Email Addresses"
              name="emailAddresses"
              rules={[
                { required: true, message: "Email addresses are required." },
              ]}
            >
              <Input placeholder="hello@example.com, admin@example.com" />
            </Form.Item>
            <Form.Item label="Github URL" name="githubUrl">
              <Input />
            </Form.Item>
            <Form.Item label="LinkedIn URL" name="linkedinUrl">
              <Input />
            </Form.Item>
            <Form.Item label="Facebook URL" name="facebookUrl">
              <Input />
            </Form.Item>
            <Form.Item label="Twitter URL" name="twitterUrl">
              <Input />
            </Form.Item>
            <Form.Item label="Instagram URL" name="instagramUrl">
              <Input />
            </Form.Item>
            <Form.Item label="Youtube URL" name="youtubeUrl">
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            label="Contact Description"
            name="contactDescription"
            rules={[
              { required: true, message: "Contact description is required." },
            ]}
          >
            <RichTextField placeholder="Write contact page supporting text..." />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Save Settings
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default AdminSettings;
