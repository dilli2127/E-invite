import React, { useCallback, useEffect } from "react";
import { Card, Row, Col, Typography, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { getApiRouteGallarey } from "../../helpers/Common_functions";
import { ApiRequest } from "../../services/api/apiService";
import { dynamic_request, useDynamicSelector } from "../../services/redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Album } from "../../routes/types/routeConfig";
import { EyeOutlined, PictureOutlined } from "@ant-design/icons";
import "./PhotoGallery.css";

const { Title } = Typography;

const AlbumPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const callBackServer = useCallback(
    (variables: ApiRequest, key: string) => {
      dispatch(dynamic_request(variables, key));
    },
    [dispatch]
  );
  const getRoute = getApiRouteGallarey("GetAll");
  const { loading, items } = useDynamicSelector(getRoute.identifier);

  const galleryItems: Album[] = items?.result || [];
  const getAllGallery = () => {
    callBackServer(
      { method: getRoute.method, endpoint: getRoute.endpoint, data: {} },
      getRoute.identifier
    );
  };
  const openGallery = (albumId: number) => {
    navigate(`/gallery/${albumId}`);
  };
  useEffect(() => {
    getAllGallery();
  }, []);
  return (
    <div 
      className="gallery-container"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <Title 
            level={1} 
            style={{ 
              color: "white", 
              fontSize: "3.5rem",
              fontWeight: "700",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              marginBottom: "10px"
            }}
          >
            <PictureOutlined style={{ marginRight: "15px", color: "#ffd700" }} />
            Photo Gallery
          </Title>
          <p style={{ 
            color: "rgba(255,255,255,0.9)", 
            fontSize: "1.2rem",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            Discover our stunning collection of memories captured in beautiful moments
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Spin size="large" />
            <p style={{ color: "white", marginTop: "20px", fontSize: "1.1rem" }}>
              Loading beautiful galleries...
            </p>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {galleryItems.map((album) => (
              <Col xs={24} sm={12} md={8} lg={6} key={album._id}>
                <Card
                  hoverable
                  className="gallery-card glow-on-hover"
                  cover={
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <img
                        alt={album.galleryname}
                        src={album.gallerycover}
                        style={{
                          height: "250px",
                          width: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                      <div 
                        className="card-overlay"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(45deg, rgba(102,126,234,0.8), rgba(118,75,162,0.8))",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <EyeOutlined 
                          style={{ 
                            fontSize: "2.5rem", 
                            color: "white",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                          }} 
                        />
                      </div>
                    </div>
                  }
                  onClick={() => openGallery(album._id)}
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    border: "none",
                    background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                    transition: "all 0.3s ease"
                  }}
                  bodyStyle={{
                    padding: "20px",
                    background: "linear-gradient(145deg, #ffffff, #f8f9fa)"
                  }}
                >
                  <Card.Meta 
                    title={
                      <span style={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        background: "linear-gradient(45deg, #667eea, #764ba2)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}>
                        {album.galleryname}
                      </span>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <style>{`
        .gallery-card:hover img {
          transform: scale(1.1);
        }
        
        .gallery-card:hover .card-overlay {
          opacity: 1;
        }
        
        .gallery-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important;
        }
        
        .gallery-card .ant-card-body {
          position: relative;
        }
        
        .gallery-card .ant-card-body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
          border-radius: 15px 15px 0 0;
        }
      `}</style>
    </div>
  );
};

export default AlbumPage;
