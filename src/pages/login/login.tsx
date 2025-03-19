import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  message,
  Row,
  Col,
  Card,
  Typography,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import LogoBackground from "../../assets/img/ffslogo.png";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    console.log("Received values:", values);
    setLoading(true);

    setTimeout(() => {
      if (values.username === "admin" && values.password === "admin") {
        message.success("Login successful!");
        navigate("/home");
      } else {
        message.error("Invalid username or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Row className="login-container">
      <Col span={12} className="login-background" />
      <Col span={12} className="login-content">
        <Card className="login-card">
          <Title level={2} className="login-title">
            Welcome Back
          </Title>
          <Text className="login-subtitle">Sign in to continue</Text>
          <Form
            name="login_form"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item className="login-options">
              <Checkbox>Remember me</Checkbox>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>

            <Form.Item className="signup-link">
              <Text className="auth-switch">
                Don't have an account?{" "}
                <a onClick={() => navigate("/signup")}>Sign up</a>
              </Text>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
