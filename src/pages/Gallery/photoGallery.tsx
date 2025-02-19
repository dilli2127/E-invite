import React, { useEffect, useState } from "react";
import { Typography, Card, Image, Row, Col, Skeleton, Button } from "antd";
import {
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

const GOOGLE_API_KEY = "AIzaSyAKpQZVawfF5Mq6zhr-S-PMgrf_Mlpy-zg";
const FOLDER_ID = "1BRFdSl05T4ZxVCSfTTBDDzCqqQUSmytf";

type FileType = {
  id: string;
  name: string;
  mimeType?: string;
  thumbnailLink?: string;
};

const GoogleDriveGallery: React.FC = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${GOOGLE_API_KEY}&fields=files(id,name,mimeType,thumbnailLink)`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.files) {
          setFiles(data.files);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
        setLoading(false);
      });
  }, []);

  const nextImage = () => {
    if (selectedIndex !== null && selectedIndex < files.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

 

  return (
    <div style={{ padding: "20px", margin: "0 auto" }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Google Drive Gallery
      </Typography.Title>

      {loading ? (
        <Row gutter={[16, 16]}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Col key={index} xs={12} sm={12} md={8} lg={6}>
              <Card hoverable>
                <Skeleton.Image style={{ width: "100%", height: "200px" }} />
                <Skeleton active paragraph={{ rows: 1 }} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={[16, 16]} align="middle">
          {files.map((file, index) => (
            <Col key={file.id} xs={12} sm={12} md={8} lg={6}>
              <Card hoverable>
                <div
                  onClick={() => setSelectedIndex(index)}
                  style={{ cursor: "pointer", textAlign: "center" }}
                >
                  <Image
                    src={`https://lh3.googleusercontent.com/d/${file.id}=w800-h600`}
                    alt={file.name}
                    width="100%"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      minHeight: "200px",
                    }}
                    preview={false}
                  />
                </div>

              
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {selectedIndex !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            zIndex: 1000,
            touchAction: "none", // Fix swipe gestures
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <iframe
              src={`https://drive.google.com/file/d/${files[selectedIndex].id}/preview`}
              style={{
                width: "90%",
                height: "80vh",
                borderRadius: "8px",
                border: "none",
              }}
            />
          </div>
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={prevImage}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.5)",
            }}
          />
          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={nextImage}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.5)",
            }}
          />
          <Button
            type="primary"
            danger
            onClick={() => setSelectedIndex(null)}
            style={{ position: "absolute", top: "20px", right: "20px" }}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoogleDriveGallery;
