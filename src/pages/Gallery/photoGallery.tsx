import React, { useEffect, useState } from "react";
import { Typography, Card, Image, Row, Col, Skeleton, Button, Badge } from "antd";
import {
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  PictureOutlined,
  EyeOutlined,
  HeartOutlined
} from "@ant-design/icons";
import AppHeader from "../../components/Header/Header";
import "./PhotoGallery.css";

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
    <div 
      className="gallery-container"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        padding: "40px 20px"
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <Typography.Title 
            level={1} 
            style={{ 
              color: "white", 
              fontSize: "3.5rem",
              fontWeight: "700",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              marginBottom: "15px"
            }}
          >
            <PictureOutlined style={{ marginRight: "15px", color: "#ffd700" }} />
            Gallery Collection
          </Typography.Title>
          <Badge 
            count={`${files.length} Photos`} 
            style={{ 
              backgroundColor: '#52c41a',
              fontSize: '1rem',
              padding: '5px 15px',
              height: 'auto',
              borderRadius: '20px'
            }}
          />
          <p style={{ 
            color: "rgba(255,255,255,0.9)", 
            fontSize: "1.2rem",
            maxWidth: "600px",
            margin: "20px auto 0",
            lineHeight: "1.6"
          }}>
            Explore our curated collection of stunning photographs
          </p>
        </div>

        {loading ? (
          <Row gutter={[24, 24]}>
            {Array.from({ length: 12 }).map((_, index) => (
              <Col key={index} xs={12} sm={8} md={6} lg={4}>
                <Card 
                  hoverable
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)"
                  }}
                >
                  <Skeleton.Image style={{ width: "100%", height: "220px" }} />
                  <div style={{ padding: "15px" }}>
                    <Skeleton active paragraph={{ rows: 1 }} />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row gutter={[24, 24]} align="middle">
            {files.map((file, index) => (
              <Col key={file.id} xs={12} sm={8} md={6} lg={4}>
                <Card 
                  hoverable
                  className="photo-card glow-on-hover"
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div
                    onClick={() => setSelectedIndex(index)}
                    style={{ 
                      cursor: "pointer", 
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    <Image
                      src={`https://lh3.googleusercontent.com/d/${file.id}=w800-h600`}
                      alt={file.name}
                      width="100%"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      preview={false}
                    />
                    <div 
                      className="photo-overlay"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(45deg, rgba(102,126,234,0.85), rgba(240,147,251,0.85))",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "15px"
                      }}
                    >
                      <EyeOutlined 
                        style={{ 
                          fontSize: "2.5rem", 
                          color: "white",
                          textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                        }} 
                      />
                      <span style={{
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "600",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
                      }}>
                        View Full Size
                      </span>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "50%",
                        width: "35px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        cursor: "pointer"
                      }}
                      className="heart-icon"
                    >
                      <HeartOutlined style={{ color: "#ff4757", fontSize: "1.2rem" }} />
                    </div>
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
              background: "linear-gradient(135deg, rgba(0,0,0,0.95), rgba(30,30,50,0.95))",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              zIndex: 1000,
              touchAction: "none",
              animation: "fadeIn 0.3s ease-in-out"
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
              }}
            >
              <div style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                borderRadius: "20px",
                padding: "20px",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}>
                <iframe
                  src={`https://drive.google.com/file/d/${files[selectedIndex].id}/preview`}
                  style={{
                    width: "85vw",
                    maxWidth: "1000px",
                    height: "75vh",
                    borderRadius: "15px",
                    border: "none",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                  }}
                />
              </div>
            </div>
            
            <div style={{
              display: "flex",
              gap: "15px",
              marginTop: "25px",
              alignItems: "center"
            }}>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                href={`https://drive.google.com/uc?export=download&id=${files[selectedIndex].id}`}
                size="large"
                style={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  border: "none",
                  borderRadius: "25px",
                  padding: "8px 25px",
                  height: "auto",
                  fontWeight: "600",
                  boxShadow: "0 5px 15px rgba(102,126,234,0.4)"
                }}
              >
                Download HD
              </Button>
              
              <div style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "25px",
                padding: "8px 20px",
                color: "white",
                fontSize: "0.9rem",
                fontWeight: "500"
              }}>
                {selectedIndex + 1} of {files.length}
              </div>
            </div>

            <Button
              shape="circle"
              icon={<LeftOutlined />}
              onClick={prevImage}
              size="large"
              style={{
                position: "absolute",
                left: "30px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "linear-gradient(45deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))",
                border: "none",
                width: "60px",
                height: "60px",
                fontSize: "1.5rem",
                boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)"
              }}
              disabled={selectedIndex === 0}
            />
            
            <Button
              shape="circle"
              icon={<RightOutlined />}
              onClick={nextImage}
              size="large"
              style={{
                position: "absolute",
                right: "30px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "linear-gradient(45deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))",
                border: "none",
                width: "60px",
                height: "60px",
                fontSize: "1.5rem",
                boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)"
              }}
              disabled={selectedIndex === files.length - 1}
            />
            
            <Button
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => setSelectedIndex(null)}
              size="large"
              style={{ 
                position: "absolute", 
                top: "30px", 
                right: "30px",
                background: "linear-gradient(45deg, #ff6b6b, #ff5252)",
                border: "none",
                color: "white",
                width: "50px",
                height: "50px",
                fontSize: "1.2rem",
                boxShadow: "0 5px 15px rgba(255,107,107,0.4)"
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .photo-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 40px rgba(0,0,0,0.2) !important;
        }
        
        .photo-card:hover img {
          transform: scale(1.05);
        }
        
        .photo-card:hover .photo-overlay {
          opacity: 1;
        }
        
        .photo-card:hover .heart-icon {
          opacity: 1;
        }
        
        .photo-card .heart-icon:hover {
          background: rgba(255,71,87,0.1) !important;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default GoogleDriveGallery;
