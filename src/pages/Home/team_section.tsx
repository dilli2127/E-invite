import React from "react";
import { Row, Col, Card, Avatar, Typography } from "antd";
import "./TeamSection.css";

const { Title } = Typography;

const TeamSection: React.FC = () => {
  const teamData = [
    {
      name: "Aman Rahman",
      role: "Top Photographer",
      image: "path/to/aman-rahman.jpg", // Replace with actual image path
    },
    {
      name: "Imran Shahed",
      role: "Senior Photographer",
      image: "path/to/imran-shahed.jpg", // Replace with actual image path
    },
    {
      name: "Mazharul Islam Rafi",
      role: "Senior Photographer",
      image: "path/to/mazharul-islam-rafi.jpg", // Replace with actual image path
    },
    {
      name: "MD Tarik Ur Rahman",
      role: "Senior Cinematographer",
      image: "path/to/md-tarik-ur-rahman.jpg", // Replace with actual image path
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
      <p className="section-description">
        We provide high quality and cost effective Photography and
        Cinematography services to make your dream come true.
      </p>

      <Row gutter={[16, 16]} justify="center">
        {teamData.map((member, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card className="team-member-card">
              <Avatar
                size={120}
                src={member.image}
                alt={member.name}
                className="team-member-avatar"
              />
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