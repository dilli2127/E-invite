import React from "react";
import { Row, Col, Typography } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import "./Footer.css";

const { Title, Link } = Typography;

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8}>
          <div className="footer-section">
            <img
              src="path/to/your/logo.svg" // Replace with your logo path
              alt="Wedding Photography Logo"
              className="footer-logo"
            />
            <Title level={5} className="footer-title">
              WEDDING PHOTOGRAPHY
            </Title>
            <p>
              We absolutely love weddings. It's why we chosen to specialize in
              shooting them. As photographer, our job is to capture your story
              so you can remember your special day. That's why we feel it's
              important to include full-day coverage in every wedding
              collection!
            </p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={4}>
          <div className="footer-section">
            <Title level={5} className="footer-title">
              Contacts
            </Title>
            <ul className="contact-list">
              <li>
                <a href="tel:+8801973311177">+8801973311177</a>
              </li>
              <li>
                <a href="mailto:info@weddingphotography.com">
                  info@weddingphotography.com
                </a>
              </li>
              <li>House#23, Road#1, Sector#9</li>
              <li>Uttara, Dhaka, Bangladesh - 1230</li>
            </ul>
          </div>
        </Col>
        <Col xs={24} sm={24} md={4} lg={6}>
          <div className="footer-section">
            <Title level={5} className="footer-title">
              Category
            </Title>
            <ul className="category-list">
              <li>
                <Link href="#">Services</Link>
              </li>
              <li>
                <Link href="#">Features</Link>
              </li>
              <li>
                <Link href="#">Gallery</Link>
              </li>
              <li>
                <Link href="#">About Us</Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col xs={24} sm={24} md={4} lg={6}>
          <div className="footer-section">
            <Title level={5} className="footer-title">
              Social
            </Title>
            <ul className="social-links">
              <li>
                <a href="#">
                  <FacebookOutlined />
                </a>
              </li>
              <li>
                <a href="#">
                  <InstagramOutlined />
                </a>
              </li>
              <li>
                <a href="#">
                  <TwitterOutlined />
                </a>
              </li>
              <li>
                <a href="#">
                  <YoutubeOutlined />
                </a>
              </li>
            </ul>
            <p>
              Photography in a wedding is our passion. As a professional we will
              be committed to your wedding day.
            </p>
          </div>
        </Col>
      </Row>
      <div className="copyright">
        <p>
          ©Copyright 2023 Wedding Photography. All rights reserved. |{" "}
          <Link href="#">FAQ</Link> | <Link href="#">Privacy Policy</Link> |{" "}
          <Link href="#">Terms & Conditions</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;