import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Image,
  Row,
  Col,
  Skeleton,
} from "antd";

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
          <Row gutter={[16, 16]}>
            {files.map((file) => (
              <Col key={file.id} xs={24} sm={12} md={8} lg={6}>
                <Card hoverable>
                  <Image
                    src={`https://drive.google.com/thumbnail?id=${file.id}&sz=w800-h800`}
                    alt={file.name}
                    width="100%"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      minHeight: "200px",
                    }}
                  />
                  <Typography.Text strong>{file.name}</Typography.Text>
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
