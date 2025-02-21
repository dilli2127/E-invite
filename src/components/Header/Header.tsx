import React, { useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./Header.css";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src="https://freshfocuzstudio.s3.ap-south-1.amazonaws.com/ffs+logo.png"
            alt="Fresh Focuz Studio Logo"
          />
          Fresh Focuz Studio
        </Link>
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
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="gallery">
            <Link to="/gallery">Gallery</Link>
          </Menu.Item>
          <Menu.Item key="e-invite">
              <Link to="/gallery">E-invite</Link>
            </Menu.Item>
            <Menu.Item key="e-album">
              <Link to="/gallery">E-album</Link>
            </Menu.Item>
          <Menu.Item key="services">
            <Link to="/services">Services</Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link to="/contact">Contact</Link>
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
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="gallery">
              <Link to="/gallery">Gallery</Link>
            </Menu.Item>
            <Menu.Item key="gallery">
              <Link to="/gallery">E-invite</Link>
            </Menu.Item>
            <Menu.Item key="gallery">
              <Link to="/gallery">E-album</Link>
            </Menu.Item>
            <Menu.Item key="services">
              <Link to="/services">Services</Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    </Header>
  );
};

export default AppHeader;
