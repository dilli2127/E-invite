import React from "react";
import { Card, Typography, Button, List, Col, Row, Space, Badge, Divider } from "antd";
import { 
  CameraOutlined, 
  VideoCameraOutlined, 
  GiftOutlined, 
  StarOutlined,
  CheckCircleOutlined,
  CrownOutlined,
  FireOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import styles from "./service.module.css";

const { Title, Text } = Typography;

interface Package {
  name: string;
  price: number;
  originalPrice?: number;
  description: string[];
  features: string[];
  gradient: string;
  accentColor: string;
  icon: React.ReactNode;
  badge?: string;
  popular?: boolean;
}

const packages: Package[] = [
  {
    name: "Starter",
    price: 44999,
    originalPrice: 54999,
    description: [
      "Perfect for intimate gatherings and small celebrations",
      "Ideal for engagement shoots and family portraits",
    ],
    features: [
      "2 Professional Photographers",
      "4-6 Hours Coverage",
      "HD Video with Pendrive",
      "2 Premium Albums (50 photos each)",
      "Digital E-Invite Design",
      "Private E-Gallery Access",
      "Digital E-Album",
      "Basic Photo Editing",
    ],
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
    accentColor: "#6366f1",
    icon: <CameraOutlined />,
    badge: "BEST VALUE",
  },
  {
    name: "Professional",
    price: 69999,
    originalPrice: 84999,
    popular: true,
    description: [
      "Enhanced coverage for medium-sized events",
      "Perfect balance of quality and affordability",
    ],
    features: [
      "3 Expert Photographers",
      "6-8 Hours Coverage",
      "2 HD Videos with Editing",
      "3 Luxury Albums (75 photos each)",
      "Custom E-Invite Design",
      "Premium E-Gallery with Download",
      "Interactive E-Album",
      "Professional Photo Editing",
      "Drone Photography (if permitted)",
    ],
    gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ef4444 100%)",
    accentColor: "#ec4899",
    icon: <StarOutlined />,
    badge: "MOST POPULAR",
  },
  {
    name: "Premium",
    price: 89999,
    originalPrice: 109999,
    description: [
      "Comprehensive coverage for grand celebrations",
      "Premium quality with extensive documentation",
    ],
    features: [
      "4 Senior Photographers",
      "8-10 Hours Coverage",
      "3 Cinematic Videos with Story",
      "4 Designer Albums (100 photos each)",
      "Animated E-Invite with Music",
      "Premium E-Gallery with Slideshow",
      "Multimedia E-Album",
      "Advanced Photo & Video Editing",
      "Drone Photography & Videography",
      "Same-day Preview (50 photos)",
    ],
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0ea5e9 50%, #3b82f6 100%)",
    accentColor: "#06b6d4",
    icon: <CrownOutlined />,
    badge: "PREMIUM",
  },
  {
    name: "Luxury Elite",
    price: 119999,
    originalPrice: 149999,
    description: [
      "Ultimate luxury experience with no compromises",
      "Complete documentation of your special day",
    ],
    features: [
      "5+ Master Photographers",
      "Full Day Coverage (12+ Hours)",
      "Pre & Post Wedding Shoot",
      "5 Cinematic Videos with Premium Edit",
      "5 Luxury Albums (150+ photos each)",
      "Unlimited Photos & Videos",
      "Premium Animated E-Invites",
      "Exclusive E-Gallery with AI Features",
      "4K Ultra HD E-Album",
      "Master-level Photo & Video Editing",
      "Professional Drone Coverage",
      "Same-day Highlights Reel",
      "Dedicated Project Manager",
      "24/7 Customer Support",
    ],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)",
    accentColor: "#f59e0b",
    icon: <FireOutlined />,
    badge: "LUXURY",
  },
];

const PackageDetails: React.FC = () => {
  return (
    <div className={styles.luxuryServicesContainer}>
      {/* Hero Section */}
      <div className={styles.servicesHero}>
        <div className={styles.heroContent}>
          {/* <Badge.Ribbon text="PREMIUM PHOTOGRAPHY" color="#667eea" className={styles.heroBadge}>
            <div></div>
          </Badge.Ribbon> */}
          <Title level={1} className={styles.heroTitle}>
            Luxury Photography Packages
          </Title>
          <Text className={styles.heroSubtitle}>
            Capture your most precious moments with our premium photography services. 
            Each package is crafted to deliver exceptional quality and unforgettable memories.
          </Text>
        </div>
      </div>

      {/* Packages Grid */}
      <div className={styles.packagesSection}>
        <Row gutter={[32, 32]} justify="center">
          {packages.map((pkg, index) => (
            <Col xs={24} sm={12} lg={6} key={pkg.name}>
              <div className={`${styles.luxuryPackageCard} ${pkg.popular ? styles.popular : ''}`}>
                {pkg.popular && (
                  <div className={styles.popularBadge}>
                    <ThunderboltOutlined /> MOST POPULAR
                  </div>
                )}
                
                <Badge.Ribbon 
                  text={pkg.badge} 
                  color={pkg.accentColor}
                  className={styles.packageBadge}
                >
                  <Card
                    className={styles.packageCard}
                    style={{
                      background: pkg.gradient,
                      border: 'none',
                      borderRadius: '20px',
                      overflow: 'hidden',
                    }}
                    bodyStyle={{ padding: 0 }}
                  >
                    {/* Card Header */}
                    <div className={styles.packageHeader}>
                      <div className={styles.packageIcon}>
                        {pkg.icon}
                      </div>
                      <Title level={3} className={styles.packageName}>
                        {pkg.name}
                      </Title>
                      <div className={styles.packagePricing}>
                        <Text className={styles.currentPrice}>
                          ₹{pkg.price.toLocaleString()}
                        </Text>
                        {pkg.originalPrice && (
                          <Text className={styles.originalPrice}>
                            ₹{pkg.originalPrice.toLocaleString()}
                          </Text>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className={styles.packageBody}>
                      <div className={styles.packageDescription}>
                        {pkg.description.map((desc, idx) => (
                          <Text key={idx} className={styles.descriptionText}>
                            {desc}
                          </Text>
                        ))}
                      </div>

                      <Divider className={styles.featuresDivider} />

                      <div className={styles.packageFeatures}>
                        <Title level={5} className={styles.featuresTitle}>
                          What's Included:
                        </Title>
                        <List
                          className={styles.featuresList}
                          dataSource={pkg.features}
                          renderItem={(item) => (
                            <List.Item className={styles.featureItem}>
                              <CheckCircleOutlined className={styles.featureIcon} />
                              <span>{item}</span>
                            </List.Item>
                          )}
                        />
                      </div>

                      <div className={styles.packageActions}>
                        <Button
                          type="primary"
                          size="large"
                          className={styles.bookButton}
                          style={{
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <GiftOutlined /> Book Now
                        </Button>
                        <Button
                          type="text"
                          className={styles.detailsButton}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Badge.Ribbon>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Call to Action */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <Title level={2} className={styles.ctaTitle}>
            Ready to Capture Your Special Moments?
          </Title>
          <Text className={styles.ctaText}>
            Contact us today for a personalized consultation and let us create magical memories for you.
          </Text>
          <Space size="large" className={styles.ctaButtons}>
            <Button type="primary" size="large" className={styles.ctaPrimary}>
              Get Free Consultation
            </Button>
            <Button size="large" className={styles.ctaSecondary}>
              View Portfolio
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
