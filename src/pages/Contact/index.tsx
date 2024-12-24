import React from "react";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./ContactPage.css";
import Header from "../../components/Header/Header";

const ContactPage: React.FC = () => {
  return (
    <>
     <Header />
      <div className="contact-page">
        <div className="contact-overlay">
          <div className="contact-content">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-description">
              We are here to assist you! Get in touch with us using the details
              below:
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <EnvironmentOutlined className="contact-icon" />
                <div>
                  <strong>Address:</strong>
                  <p>Kg Kandigai</p>
                </div>
              </div>
              <div className="contact-item">
                <PhoneOutlined className="contact-icon" />
                <div>
                  <strong>Phone:</strong>
                  <p>9677894094</p>
                </div>
              </div>
              <div className="contact-item">
                <MailOutlined className="contact-icon" />
                <div>
                  <strong>Email:</strong>
                  <p>freshfocuzstudio@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
