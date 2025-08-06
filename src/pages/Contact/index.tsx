import React, { useState } from "react";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  SendOutlined,
  UserOutlined,
  MessageOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Input, Form, message } from "antd";
import styles from "./ContactPage.module.css";
import AppHeader from "../../components/Header/Header";

const { TextArea } = Input;

const ContactPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success("Message sent successfully! We'll get back to you soon.");
      form.resetFields();
    } catch (error) {
      message.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.contactPage}>
        {/* Animated background elements */}
        <div className={styles.floatingShapes}>
          <div className={`${styles.shape} ${styles.shape1}`}></div>
          <div className={`${styles.shape} ${styles.shape2}`}></div>
          <div className={`${styles.shape} ${styles.shape3}`}></div>
          <div className={`${styles.shape} ${styles.shape4}`}></div>
          <div className={`${styles.shape} ${styles.shape5}`}></div>
        </div>

        <div className={styles.contactContainer}>
          {/* Header Section */}
          <div className={styles.contactHeader}>
            <div className={styles.headerIcon}>
              <HeartOutlined />
            </div>
            <h1 className={styles.contactTitle}>
              Get In <span className={styles.highlight}>Touch</span>
            </h1>
            <p className={styles.contactSubtitle}>
              Let's create something beautiful together! We'd love to hear from you.
            </p>
            <div className={styles.titleDecoration}>
              <StarOutlined className={`${styles.star} ${styles.star1}`} />
              <StarOutlined className={`${styles.star} ${styles.star2}`} />
              <StarOutlined className={`${styles.star} ${styles.star3}`} />
            </div>
          </div>

          <div className={styles.contactMain}>
            {/* Contact Information Cards */}
            <div className={styles.contactInfoSection}>
              <h2 className={styles.sectionTitle}>Contact Information</h2>
              
              <div className={styles.contactCards}>
                <div className={`${styles.contactCard} ${styles.addressCard}`}>
                  <div className={styles.cardIcon}>
                    <EnvironmentOutlined />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>Visit Us</h3>
                    <p>Kg Kandigai</p>
                    <span className={styles.cardAccent}>Our Studio Location</span>
                  </div>
                  <div className={styles.cardGlow}></div>
                </div>

                <div className={`${styles.contactCard} ${styles.phoneCard}`}>
                  <div className={styles.cardIcon}>
                    <PhoneOutlined />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>Call Us</h3>
                    <p>+91 9677894094</p>
                    <span className={styles.cardAccent}>24/7 Available</span>
                  </div>
                  <div className={styles.cardGlow}></div>
                </div>

                <div className={`${styles.contactCard} ${styles.emailCard}`}>
                  <div className={styles.cardIcon}>
                    <MailOutlined />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>Email Us</h3>
                    <p>freshfocuzstudio@gmail.com</p>
                    <span className={styles.cardAccent}>Quick Response</span>
                  </div>
                  <div className={styles.cardGlow}></div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.contactFormSection}>
              <h2 className={styles.sectionTitle}>Send Us a Message</h2>
              
              <div className={styles.formContainer}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  className={styles.contactForm}
                >
                  <div className={styles.formRow}>
                    <Form.Item
                      name="name"
                      label="Your Name"
                      rules={[{ required: true, message: "Please enter your name" }]}
                      className={styles.formItem}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Enter your full name"
                        size="large"
                        className={styles.customInput}
                      />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email Address"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Please enter a valid email" }
                      ]}
                      className={styles.formItem}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="Enter your email address"
                        size="large"
                        className={styles.customInput}
                      />
                    </Form.Item>
                  </div>

                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    className={styles.formItem}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Enter your phone number"
                      size="large"
                      className={styles.customInput}
                    />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="Your Message"
                    rules={[{ required: true, message: "Please enter your message" }]}
                    className={styles.formItem}
                  >
                    <TextArea
                      placeholder="Tell us about your project or inquiry..."
                      rows={5}
                      className={styles.customTextarea}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      size="large"
                      icon={<SendOutlined />}
                      className={styles.submitBtn}
                      block
                    >
                      {loading ? "Sending Message..." : "Send Message"}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className={styles.contactFooter}>
            <div className={styles.footerText}>
              <MessageOutlined /> We typically respond within 24 hours
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
