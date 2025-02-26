import React, { useEffect, useState } from "react";
import { Typography, Card, Image, Row, Col, Skeleton, Button } from "antd";
import {
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import AppHeader from "../../components/Header/Header";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";
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

  const fetchFiles = async (pageToken: string | null = null) => {
    let url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${GOOGLE_API_KEY}&fields=nextPageToken,files(id,name,mimeType,thumbnailLink)&pageSize=100`;
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.files) {
        setFiles((prevFiles) => [...prevFiles, ...data.files]);
      }

      if (data.nextPageToken) {
        await fetchFiles(data.nextPageToken); // Fetch next page
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
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
    <>
      <div style={{ padding: "20px", margin: "0 auto" }}>
        <Typography.Title level={2} style={{ textAlign: "center" }}>
         Gallery
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
              type="primary"
              icon={<DownloadOutlined />}
              href={`https://drive.google.com/uc?export=download&id=${files[selectedIndex].id}`}
              // target="_blank"
              style={{
                marginTop: "10px",
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
              }}
            >
              Download
            </Button>
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
              style={{ position: "absolute", top: "5px", right: "20px" }}
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default GoogleDriveGallery;
