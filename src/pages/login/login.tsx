import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Row, Col, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Optional: for custom styling
import auditBackground from "../../assets/img/audit.jpg";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string; remember: boolean }) => {
    console.log("Received values:", values);
    setLoading(true);

    // Mock login request (replace with your API call)
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
    <Row style={{ height: "100vh" }}>
      <Col
        span={12}
        style={{
          background: `url(${auditBackground}) no-repeat center center`,
          backgroundSize: "cover",
          filter: "brightness(0.8)", // Darken background for contrast
        }}
      />
      <Col
        span={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #ff4e50, #fc913a)",
        }}
      >
        <Card
          className="login-card"
          style={{ width: 400 ,}}
          bodyStyle={{ padding: "30px",}} // Padding for card content
        >
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <Form
            name="login_form"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please input your Username!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your Password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="#">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                style={{ width: "100%" }} // Full width button
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
