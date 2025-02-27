import React from "react";
import { Row, Col, Card, List } from "antd";
import {
  CameraOutlined,
  VideoCameraOutlined,
  HeartOutlined,
  SmileOutlined,
  BankOutlined,
} from "@ant-design/icons";
import "./AboutUs.css";

const AboutUs: React.FC = () => {
  const serviceData = [
    {
      title: "Wedding Photography",
      description: "Capturing every moment of your big day with stunning visuals and timeless memories.",
      features: ["Candid & Traditional Photography", "High-Quality Edited Images", "Custom Wedding Albums"],
      icon: <CameraOutlined className="service-icon" />,
    },
    {
      title: "Pre-Wedding Shoots",
      description: "Romantic and creative pre-wedding photography to cherish before the big day.",
      features: ["Outdoor & Destination Shoots", "Cinematic Video & Drone Coverage", "Personalized Theme-Based Shoots"],
      icon: <HeartOutlined className="service-icon" />,
    },
    {
      title: "Maternity & Baby Shoots",
      description: "Precious moments captured with love for maternity and newborn photography.",
      features: ["Indoor & Outdoor Sessions", "Creative Props & Themes", "Soft Lighting & Natural Edits"],
      icon: <SmileOutlined className="service-icon" />,
    },
    {
      title: "Event & Corporate Photography",
      description: "Professional event coverage for corporate functions, birthdays, and celebrations.",
      features: ["Conference & Seminar Photography", "Product & Brand Shoots", "Live Event Coverage"],
      icon: <BankOutlined className="service-icon" />,
    },
  ];

  return (
    <div className="about-us-container">
      <div className="about-banner">
        <h2 className="section-title-about">We Love What We Do!</h2>
        <h2 className="section-title-about">We Do What We Love!</h2>
        <p className="about-text">
          Your memories deserve the best. From breathtaking wedding photography to cinematic wedding films, we make sure every shot tells a story.
        </p>
      </div>

      <Row gutter={[16, 16]} justify="center">
        {serviceData.map((service, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card className="service-box">
              {service.icon}
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <List className="service-features" dataSource={service.features} renderItem={(item) => <List.Item>{item}</List.Item>} />
              <a href="#" className="learn-more">Learn More</a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AboutUs;