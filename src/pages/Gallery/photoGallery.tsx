import React, { useEffect, useState } from "react";
import { Typography, Card, Image, Row, Col, Skeleton, Button, Modal } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Import icons

const GOOGLE_API_KEY = "AIzaSyAKpQZVawfF5Mq6zhr-S-PMgrf_Mlpy-zg";
const FOLDER_ID = "1BRFdSl05T4ZxVCSfTTBDDzCqqQUSmytf";

const GoogleDriveGallery: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
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

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) => (prevIndex! + 1) % files.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) => (prevIndex! - 1 + files.length) % files.length);
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
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
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

                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                  <a
                    href={`https://drive.google.com/uc?export=download&id=${file.id}`}
                    download
                  >
                    <Button type="primary">Download Original</Button>
                  </a>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        open={selectedIndex !== null}
        onCancel={() => setSelectedIndex(null)}
        footer={null}
        width={800}
        centered
      >
        {selectedIndex !== null && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              padding:"10px"
            }}
          >
            {/* Previous Icon */}
            <LeftOutlined
              onClick={handlePrev}
              style={{
                fontSize: "24px",
                cursor: "pointer",
                position: "absolute",
                left: "10px",
                zIndex: 10,
              }}
            />

            {/* Image Preview */}
            <iframe
              src={`https://drive.google.com/file/d/${files[selectedIndex].id}/preview`}
              style={{
                width: "100%",
                height: "500px",
                borderRadius: "8px",
                border: "none",
              }}
            />

            {/* Next Icon */}
            <RightOutlined
              onClick={handleNext}
              style={{
                fontSize: "24px",
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                zIndex: 10,
              }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default GoogleDriveGallery;
