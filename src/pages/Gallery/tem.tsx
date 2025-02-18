import React from "react";
import { Row, Col, Image } from "antd";

const photos = [
  {
    id: 1,
    src: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG",
  },
  {
    id: 2,
    src: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG",
  },
  {
    id: 3,
    src: "	https://minio.freshfocuz.tech/freshfocuzstudio/files/497dcb40e31989a10c80d2ef50abe79a.jpg",
  },
  {
    id: 4,
    src: "https://freshfocuzstudio.s3.ap-south-1.amazonaws.com/images.png",
  },
  {
    id: 3,
    src: "	https://minio.freshfocuz.tech/freshfocuzstudio/files/497dcb40e31989a10c80d2ef50abe79a.jpg",
  },
  {
    id: 1,
    src: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG",
  },
  {
    id: 2,
    src: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG",
  },

  {
    id: 3,
    src: "	https://minio.freshfocuz.tech/freshfocuzstudio/files/497dcb40e31989a10c80d2ef50abe79a.jpg",
  },
  {
    id: 1,
    src: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG",
  },
];

const PhotoGallery: React.FC = () => {
  return (
    <>
      {" "}
      <div style={{ padding: 20, background: "#f0f2f5" }}>
        <h1 style={{ textAlign: "center", marginBottom: 20, color: "#1890ff" }}>
          Photo Gallery
        </h1>
        <Row
          gutter={[16, 16]}
          justify="start"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {photos.map((photo) => (
            <Col key={photo.id}>
              <Image
                alt="Preview"
                src={photo.src || ""}
                style={{
                  borderRadius: 10,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                  overflow: "hidden",
                  objectFit: "cover",
                  width: "100%",
                  height: "150px",
                }}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default PhotoGallery;
