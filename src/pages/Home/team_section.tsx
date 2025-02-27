import React from "react";
import { Row, Col, Card, Avatar, Typography } from "antd";
import { CameraOutlined, VideoCameraOutlined } from "@ant-design/icons";
import "./TeamSection.css";

const { Title, Paragraph } = Typography;

const TeamSection: React.FC = () => {
  const teamData = [
    {
      name: "Dilli Babu Kumaravel",
      role: "Top Photographer",
      image: "path/to/dilli-babu.jpg",
      icon: <CameraOutlined />,
    },
    {
      name: "Ajith",
      role: "Senior Photographer",
      image: "path/to/ajith.jpg",
      icon: <CameraOutlined  />,
    },
    {
      name: "Naresh",
      role: "Senior Photographer",
      image: "path/to/naresh.jpg",
      icon: <CameraOutlined  />,
    },
    {
      name: "Jeeva",
      role: "Senior Cinematographer",
      image: "path/to/jeeva.jpg",
      icon: <VideoCameraOutlined  />,
    },
  ];

  return (
    <div className="team-section-container">
      <Title level={2} className="section-title">
        Our Professional Team
      </Title>
      <Title level={3} className="section-subtitle">
        Unique. Powerful. Creative.
      </Title>
      <Paragraph className="section-description">
        We provide high-quality and cost-effective Photography & Cinematography
        services to make your dreams come true.
      </Paragraph>

      <Row gutter={[16, 16]} justify="center">
        {teamData.map((member, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card className="team-member-card">
              <div className="avatar-container">
                <Avatar size={120} src={member.image} alt={member.name} />
                <span className="icon-overlay">{member.icon}</span>
              </div>
              <div className="team-member-info">
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TeamSection;