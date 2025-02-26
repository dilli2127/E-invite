import React from "react";
import { Row, Col, Card, Avatar, List } from "antd";
import "./AboutUs.css"; // Keep your existing CSS for basic styles

const AboutUs: React.FC = () => {
  const serviceData = [
    {
      title: "Wedding Gallery",
      description:
        'We, at "What a Beginning", are your ideal wedding photographers, based in Bangladesh.',
      features: [
        "Professional Photography Team",
        "Beautify Amazing Memories",
        "Happiness & Stylish Images",
      ],
    },
    {
        title: "Wedding Gallery",
        description:
          'We, at "What a Beginning", are your ideal wedding photographers, based in Bangladesh.',
        features: [
          "Professional Photography Team",
          "Beautify Amazing Memories",
          "Happiness & Stylish Images",
        ],
      },
      {
        title: "Wedding Gallery",
        description:
          'We, at "What a Beginning", are your ideal wedding photographers, based in Bangladesh.',
        features: [
          "Professional Photography Team",
          "Beautify Amazing Memories",
          "Happiness & Stylish Images",
        ],
      },
  ];

  return (
    <div className="about-us-container">
      <Row gutter={[16, 16]} justify="center" align="middle">
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="left-content">
            <h2 className="section-title">We Love What We Do!</h2>
            <h2 className="section-title">We Do What We Love!</h2>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="right-content">
            <p>
              Shooting a wedding is our passion. As a professional we will be
              committed to you and your wedding day. We are guaranteed to show up
              on time on your wedding day. When you hire us, we are
              contractually obligated to carry out the duties that you hired us
              to perform!
            </p>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="center">
        {serviceData.map((service, index) => (
          <Col xs={24} sm={24} md={8} lg={8} key={index}>
            <Card className="service-box">
              <Avatar
                size={64}
                src="https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG"
                alt={service.title}
              />
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <List
                className="service-features"
                dataSource={service.features}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <a href="#" className="learn-more">
                Learn more
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AboutUs;