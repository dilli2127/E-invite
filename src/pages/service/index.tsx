import React from "react";
import { Card, Typography, Button, List, Col, Row, Space } from "antd";

const { Title, Text } = Typography;

interface Package {
  name: string;
  price: number;
  description: string[];
  features: string[];
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

const packages: Package[] = [
  {
    name: "Basic Package",
    price: 44999,
    description: [
      "Perfect for small events.",
      "Great for individual portraits.",
    ],
    features: [
      "2 Photographer.",
      "1 Video With Pendrive.",
      "2 Albums.",
      "E-Invite",
      "E-Gallery",
      "E-Album",
    ],
    primaryColor: "#64B5F6", // Blue
    secondaryColor: "#BBDEFB",
    textColor: "#212121",
  },
  {
    name: "Standard Package",
    price: 69999,
    description: ["Ideal for family photoshoots.", "Enhanced coverage."],
    features: [
      "3 Photographer.",
      "1 Video.",
      "3 Albums.",
      "E-Invite",
      "E-Gallery",
      "E-Album",
    ],
    primaryColor: "#FFB74D", // Orange
    secondaryColor: "#FFE0B2",
    textColor: "#212121",
  },
  {
    name: "Premium Package",
    price: 89999,
    description: ["Large events & special occasions.", "Second photographer."],
    features: [
      "4 Photographers.",
      "2 Video.",
      "3 Album.",
      "E-Invite",
      "E-Gallery",
      "E-Album",
    ],
    primaryColor: "#81C784", // Green
    secondaryColor: "#C8E6C9",
    textColor: "#212121",
  },
  {
    name: "Luxury Package",
    price: 119999,
    description: ["Top-tier package.", "Full-day coverage."],
    features: [
      "Full-day coverage.",
      "Photographers & Videographer.",
      "Unlimited Photos.",
      "Pre Wedding Or Post Wedding",
      "3 Video.",
      "4 Album.",
      "E-Invite",
      "E-Gallery",
      "E-Album",
    ],
    primaryColor: "#E57373", // Red
    secondaryColor: "#FFCDD2",
    textColor: "#212121",
  },
];

const PackageDetails: React.FC = () => {
  return (
    <div style={{ padding: "40px", background: "#f8f8f8" }}>
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}
      >
        Photography Packages
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {packages.map((pkg) => (
          <Col xs={24} sm={12} md={8} lg={6} key={pkg.name}>
            <Card
              title={
                <div style={{ color: pkg.textColor, fontWeight: "600" }}>
                  {pkg.name}
                </div>
              }
              style={{
                backgroundColor: pkg.secondaryColor,
                border: `2px solid ${pkg.primaryColor}`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              headStyle={{
                backgroundColor: pkg.primaryColor,
                borderBottom: "none",
              }}
              bodyStyle={{ padding: "20px" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-5px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <Text
                strong
                style={{
                  fontSize: "1.4em",
                  display: "block",
                  marginBottom: "15px",
                  color: pkg.textColor,
                }}
              >
                ₹{pkg.price.toLocaleString()}
              </Text>
              <Title level={4} style={{ color: pkg.textColor }}>
                Description:
              </Title>
              <List
                dataSource={pkg.description}
                renderItem={(item) => (
                  <List.Item style={{ color: pkg.textColor }}>{item}</List.Item>
                )}
              />
              <Title level={4} style={{ color: pkg.textColor }}>
                Features:
              </Title>
              <List
                dataSource={pkg.features}
                renderItem={(item) => (
                  <List.Item style={{ color: pkg.textColor }}>{item}</List.Item>
                )}
              />
              <Space style={{ width: "100%", justifyContent: "center" }}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: pkg.primaryColor,
                    borderColor: pkg.primaryColor,
                    color: "white",
                    marginTop: "20px",
                  }}
                >
                  Book Now
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PackageDetails;
