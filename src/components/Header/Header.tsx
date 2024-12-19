import React from 'react';
import { Layout, Typography, Space, Button, Row, Col } from 'antd';

const { Header } = Layout;
const { Title, Text } = Typography;

const ModernHeader: React.FC = () => {
  return (
    <Header style={styles.header}>
      <Row align="middle" justify="space-between" style={styles.container}>
        {/* Logo and Title Section */}
        <Col xs={24} md={8} style={styles.centered}>
          <Space align="center">
            <img
              src="https://via.placeholder.com/50"
              alt="Logo"
              style={styles.logo}
            />
            <div style={{ textAlign: 'center' ,justifyContent:"center"}}>
              <Title level={4} style={styles.title}>
                FreshFocuzStudio
              </Title>
              {/* <Text style={styles.tagline}>Your Memories, Our Passion</Text> */}
            </div>
          </Space>
        </Col>

        {/* Navigation Section */}
        <Col xs={0} md={16} style={styles.navSection}>
          <Space size="large" style={{ justifyContent: 'center' }}>
            <Button type="link" style={styles.navButton}>
              Home
            </Button>
            <Button type="link" style={styles.navButton}>
              Services
            </Button>
            <Button type="link" style={styles.navButton}>
              Contact Us
            </Button>
            <Button type="primary" shape="round" size="large" style={styles.ctaButton}>
              Book Now
            </Button>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    backgroundColor: '#001529',
    padding: '0 20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    height: '64px',
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  logo: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    justifyContent:"center",
    display:"flex"
  },
  title: {
    color: '#ffffff',
    margin: 0,
  },
  tagline: {
    color: '#ffcc00',
    fontSize: '14px',
  },
  navSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navButton: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: '16px',
  },
  ctaButton: {
    backgroundColor: '#ff4d4f',
    borderColor: '#ff4d4f',
    color: '#ffffff',
    fontWeight: 'bold',
  },
};

export default ModernHeader;
