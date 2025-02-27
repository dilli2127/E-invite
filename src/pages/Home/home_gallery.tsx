import React from "react";
import { Row, Col, Card, Image } from "antd";
import { motion } from "framer-motion";
import "./home_gallery.css";

const images = [
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG",
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/005A6658.jpg",
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/005A7695.jpg",
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/0E9A1768.jpg",
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/20240630_101612.jpg",
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6868.jpg",
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/005A7736.jpg",
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG",
];

const HomeGallery: React.FC = () => {
  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Gallery</h2>
      <Row gutter={[16, 16]} justify="center">
        {images.map((img, index) => (
          <Col xs={24} sm={12} md={8} lg={5} key={index}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
              className="gallery-card"
            >
              <Card className="gallery-image-card">
                <Image src={img} alt={`Gallery Image ${index + 1}`} className="gallery-image" 
                 style={{ height: "200px", objectFit: "cover", width: "100%" }}/>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeGallery;
