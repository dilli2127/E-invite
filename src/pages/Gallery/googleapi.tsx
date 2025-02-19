import React, { useEffect, useState } from "react";
import { Typography, Card, Image, Row, Col, Skeleton, Button } from "antd";

const GOOGLE_API_KEY = "AIzaSyAKpQZVawfF5Mq6zhr-S-PMgrf_Mlpy-zg";
const FOLDER_ID = "1BRFdSl05T4ZxVCSfTTBDDzCqqQUSmytf";

const GoogleDriveGallery: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
        <Image.PreviewGroup>
          <Row gutter={[16, 16]} align="middle">
            {files.map((file) => (
              <Col key={file.id} xs={24} sm={12} md={8} lg={6}>
                <Card hoverable>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                    }}
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
                        maxWidth: "800px", // Ensures image is centered with max width
                      }}
                      preview={true}
                    />

                    <div style={{ display: "flex", gap: "10px" }}>
                      <a
                        href={`https://drive.google.com/uc?export=download&id=${file.id}`}
                        download
                      >
                        <Button type="primary">Download</Button>
                      </a>
                    </div>
                  </div>

                  {/* <Typography.Text strong>{file.name}</Typography.Text> */}
                </Card>
              </Col>
            ))}
          </Row>
        </Image.PreviewGroup>
      )}
    </div>
  );
};

export default GoogleDriveGallery;
