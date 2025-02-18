import React, { useEffect, useState } from "react";
import { Spin, List, Typography, Card, Image, Modal, Button, Row, Col } from "antd";

const GOOGLE_API_KEY = "AIzaSyAKpQZVawfF5Mq6zhr-S-PMgrf_Mlpy-zg";
const FOLDER_ID = "1rKWgo0s7aPZg69kmIzu_ErN9gKa924os";

const GoogleDriveGallery: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(null);

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

  const openModal = (index: number) => {
    setSelectedFileIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedFileIndex(null);
  };

  const handleNext = () => {
    if (selectedFileIndex !== null && selectedFileIndex < files.length - 1) {
      setSelectedFileIndex(selectedFileIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedFileIndex !== null && selectedFileIndex > 0) {
      setSelectedFileIndex(selectedFileIndex - 1);
    }
  };

  return (
    <div style={{ padding: "20px", margin: "0 auto" }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Google Drive Gallery
      </Typography.Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {files.map((file, index) => (
            <Col
              key={file.id}
              xs={24}  // 1 column for extra small screens
              sm={12}  // 2 columns for small screens
              md={8}   // 3 columns for medium screens
              lg={6}   // 4 columns for large screens
            >
              <Card
                hoverable
                cover={
                  <Image
                    src={file.thumbnailLink || "https://via.placeholder.com/150"}
                    alt={file.name}
                    style={{
                      height: "200px",
                      minHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      maxWidth: "100%",
                    }}
                    preview={false}
                  />
                }
                onClick={() => openModal(index)}
              >
                <Typography.Text strong>{file.name}</Typography.Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Modal
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        width="60%"
        style={{ padding: "20px" }}
        bodyStyle={{ padding: 0 }}
      >
        {selectedFileIndex !== null && files[selectedFileIndex] && (
          <>
            <iframe
              src={`https://drive.google.com/file/d/${files[selectedFileIndex].id}/preview`}
              width="100%"
              height="500px"
              style={{ border: "none", padding: "15px" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
                onClick={handlePrevious}
                disabled={selectedFileIndex === 0}
                style={{ flex: 1 }}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedFileIndex === files.length - 1}
                style={{ flex: 1 }}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default GoogleDriveGallery;
