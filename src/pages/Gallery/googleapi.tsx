import React, { useEffect, useState } from "react";
import { Spin, List, Typography, Modal } from "antd";

const GOOGLE_API_KEY = "AIzaSyAKpQZVawfF5Mq6zhr-S-PMgrf_Mlpy-zg";
const FOLDER_ID = "1rKWgo0s7aPZg69kmIzu_ErN9gKa924os";

const GoogleDriveGallery: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${GOOGLE_API_KEY}&fields=files(id,name,mimeType,thumbnailLink)`
    )
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching files:", error));
  }, []);

  const openModal = (fileId: string) => {
    setSelectedFile(fileId);
    setModalVisible(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography.Title level={2}>Google Drive Gallery</Typography.Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={files}
          renderItem={(file) => (
            <List.Item>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => openModal(file.id)}
              >
                <img
                  src={file.thumbnailLink || "https://via.placeholder.com/150"}
                  alt={file.name}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <Typography.Text>{file.name}</Typography.Text>
              </div>
            </List.Item>
          )}
        />
      )}
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedFile && (
          <iframe
            src={`https://drive.google.com/file/d/${selectedFile}/preview`}
            width="100%"
            height="500px"
            style={{ border: "none" }}
          ></iframe>
        )}
      </Modal>
    </div>
  );
};

export default GoogleDriveGallery;
