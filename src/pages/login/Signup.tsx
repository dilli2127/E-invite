import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Row, Col, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import the corresponding CSS file

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: { username: string; email: string; password: string; confirm: string }) => {
    console.log("Received values:", values);
    setLoading(true);

    // Mock signup request (replace with your API call)
    setTimeout(() => {
      message.success("Signup successful! Please log in.");
      navigate("/login");
      setLoading(false);
    }, 1000);
  };

  return (
    <Row className="signup-container">
      <Col span={12} className="signup-background" />
      <Col span={12} className="signup-content">
        <Card className="signup-card">
          <h1 className="signup-title">Create an Account</h1>
          <span className="signup-subtitle">Join us and start your journey!</span>
          <Form name="signup_form" className="signup-form" onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}> 
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, message: "Please input your Email!" }]}> 
              <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}> 
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item name="confirm" dependencies={["password"]} hasFeedback rules={[{ required: true, message: "Please confirm your Password!" }]}> 
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
              <Checkbox> I agree to the Terms and Conditions </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="signup-button" loading={loading}> Sign Up </Button>
            </Form.Item>
            <div className="login-link">Already have an account? <a href="/login">Log in</a></div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Signup;
