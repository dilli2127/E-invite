import React, { useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./Header.css";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const [visible, setVisible] = useState(false);

  // Open mobile menu
  const showDrawer = () => {
    setVisible(true);
  };

  // Close mobile menu
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Header className="header">
      {/* Logo */}
      <div className="logo">
        <a href="#">
          <img
            src="https://freshfocuzstudio.s3.ap-south-1.amazonaws.com/ffs+logo.png"
            alt="Fresh Focuz Studio Logo"
          />
          Fresh Focuz Studio
        </a>
      </div>

      {/* Desktop Navigation */}
      <div className="desktop-nav">
        <Menu
          mode="horizontal"
          theme="dark"
          className="nav-links"
          style={{ background: "transparent", borderBottom: "none" }}
        >
          <Menu.Item key="home">
            <a href="/home">Home</a>
          </Menu.Item>
          <Menu.Item key="gallery">
            <a href="/gallery">Gallery</a>
          </Menu.Item>
          <Menu.Item key="services">
            <a href="/services">Services</a>
          </Menu.Item>
          <Menu.Item key="Contact">
            <a href="/contact">Contact</a>
          </Menu.Item>
        </Menu>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          className="menu-icon"
        />
        <Drawer
          title={<span className="drawer-title">🎉 Menu</span>}
          placement="right"
          onClose={onClose}
          visible={visible}
          width={250}
        >
          <Menu
            mode="vertical"
            theme="light"
            className="mobile-nav-links"
            onClick={onClose}
          >
            <Menu.Item key="home">
              <a href="/home">Home</a>
            </Menu.Item>
            <Menu.Item key="gallery">
              <a href="/gallery">Gallery</a>
            </Menu.Item>
            <Menu.Item key="services">
              <a href="/services">Services</a>
            </Menu.Item>
            <Menu.Item key="contact">
              <a href="/contact">Contact</a>
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    </Header>
  );
};

export default AppHeader;
