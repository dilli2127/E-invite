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

interface HomeGalleryProps {
  homeGalleryImages: any[];
}

const HomeGallery: React.FC<HomeGalleryProps> = ({ homeGalleryImages }) => {
  console.log("homeGalleryImages",homeGalleryImages)
  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Gallery</h2>
      <Row gutter={[16, 16]} justify="center">
        {homeGalleryImages.map((img, index) => (
          <Col key={index} xs={24} sm={24} md={8} lg={6}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
            >
            <Card hoverable>
              <div style={{ cursor: "pointer", textAlign: "center" }}>
                <Image
                  src={img?.url}
                  alt={`Gallery Image ${index + 1}`}
                  width="100%"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    minHeight: "200px",
                  }}
                  preview={true}
                />
              </div>
            </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeGallery;
