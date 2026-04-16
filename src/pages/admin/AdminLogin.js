import React, { useEffect, useState } from "react";
import {
  LockOutlined,
  LoginOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Alert, Button, Card, Col, Form, Input, Row, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import adminApi from "./adminApi";
import { setAdminAuth } from "./adminAuth";

const { Paragraph, Text, Title } = Typography;

function AdminLogin() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    document.body.classList.add("admin-route");

    return () => {
      document.body.classList.remove("admin-route");
    };
  }, []);

  const handleSubmit = async (values) => {

    setIsSubmitting(true);
    setServerMessage("");

    try {
      const response = await adminApi.post("/auth/login", values);
      const { token, user } = response.data.data;
      setAdminAuth({ token, user });
      navigate("/admin/dashboard");
    } catch (error) {
      setServerMessage(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-auth">
      <Row gutter={[24, 24]} className="admin-auth__panel">
        <Col xs={24} lg={14}>
          <Card className="admin-auth__intro-card" bordered={false}>
            <Text className="admin-sidebar-brand__eyebrow">Secure admin area</Text>
            <Title>Manage the same sections your visitors see</Title>
            <Paragraph>
              The admin workspace now mirrors the public site structure, so Home,
              About, Resume, Projects, Blogs, Messages, and Settings are all in
              one place.
            </Paragraph>

            <div className="admin-auth__featurelist">
              <div>
                <SafetyCertificateOutlined />
                Protected routes and authenticated API calls
              </div>
              <div>
                <MailOutlined />
                Table views for projects, blogs, and messages
              </div>
              <div>
                <LockOutlined />
                Rich text editing and required field validation
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card className="admin-auth__form-card" bordered={false}>
            <Space direction="vertical" size={4} className="admin-auth__heading">
              <Title level={3}>Admin Login</Title>
              <Paragraph>Sign in with your admin email and password.</Paragraph>
            </Space>

            {serverMessage ? (
              <Alert
                type="error"
                showIcon
                message={serverMessage}
                style={{ marginBottom: 16 }}
              />
            ) : null}

            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              initialValues={{ email: "", password: "" }}
              requiredMark={false}
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Email is required." },
                  { type: "email", message: "Enter a valid email address." },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="admin@example.com" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password is required." },
                  { min: 6, message: "Password must be at least 6 characters." },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter password"
                />
              </Form.Item>

              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={isSubmitting}
                icon={<LoginOutlined />}
                className="admin-primary-submit"
                block
              >
                Sign In
              </Button>
            </Form>

            <Link className="admin-auth__backlink" to="/">
              Return to portfolio
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminLogin;
