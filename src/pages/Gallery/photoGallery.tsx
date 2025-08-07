import React, { useCallback, useEffect, useState } from "react";
import {
  Typography,
  Card,
  Image,
  Row,
  Col,
  Skeleton,
  Button,
  Badge,
} from "antd";
import {
  PictureOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import AppHeader from "../../components/Header/Header";
import requestBackServer from "../../services/api";
import { API_ROUTES } from "../../services/api/utils";
import "./PhotoGallery.css";
import { ApiRequest } from "../../services/api/apiService";
import { dynamic_request, useDynamicSelector } from "../../services/redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  getApiRouteCmsImage,
  getApiRouteGallarey,
} from "../../helpers/Common_functions";

// Remove Google Drive constants
// const GOOGLE_API_KEY = "AIzaSyAKpQZVawfF5Mq6zhr-S-PMgrf_Mlpy-zg";
// const FOLDER_ID = "1BRFdSl05T4ZxVCSfTTBDDzCqqQUSmytf";

type FileType = {
  id: string;
  name: string;
  mimeType?: string;
  thumbnailLink?: string;
  image_url?: string; // Add this for API response
  title?: string; // Add this for API response
};

const GalleryComponent: React.FC = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch: Dispatch<any> = useDispatch();
  const getRouteGallry = getApiRouteCmsImage("GetAllGalleryImages");
  const { items, loading: apiLoading } = useDynamicSelector(getRouteGallry.identifier);
  
  // Get gallery_id from URL path or use a default value
  const pathSegments = window.location.pathname.split('/');
  const galleryId = pathSegments[pathSegments.length - 1]; 
  const callBackServer = useCallback(
    (variables: ApiRequest, key: string) => {
      dispatch(dynamic_request(variables, key));
    },
    [dispatch]
  );
  const getAllGalleryimages = () => {
    if (galleryId) {
      callBackServer(
        {
          method: getRouteGallry.method,
          endpoint: getRouteGallry.endpoint,
          data: { gallery_id: galleryId },
        },
        getRouteGallry.identifier
      );
    } else {
      console.error("No gallery ID provided");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllGalleryimages();
  }, []);

  // Transform API response to match component expectations
  useEffect(() => {
    
    if (items && Array.isArray(items)) {
      const transformedFiles = items.map((item: any) => ({
        id: item._id,
        name: item.GallerItem?.galleryname || "Gallery Image",
        mimeType: "image/jpeg",
        thumbnailLink: item.url,
        image_url: item.url,
        title: item.GallerItem?.galleryname || "Gallery Image"
      }));
      
      setFiles(transformedFiles);
      setLoading(false);
    } else if (items && items.result && Array.isArray(items.result)) {
      // Handle case when API response is wrapped in result field
      const transformedFiles = items.result.map((item: any) => ({
        id: item._id,
        name: item.GallerItem?.galleryname || "Gallery Image",
        mimeType: "image/jpeg",
        thumbnailLink: item.url,
        image_url: item.url,
        title: item.GallerItem?.galleryname || "Gallery Image"
      }));
      
      setFiles(transformedFiles);
      setLoading(false);
    } else if (items === null || items === undefined) {
      // Handle case when API returns null or undefined
      setFiles([]);
      setLoading(false);
    }
  }, [items]);

  // Update loading state based on API loading
  useEffect(() => {
    if (apiLoading !== undefined) {
      setLoading(apiLoading);
    }
  }, [apiLoading]);



  return (
    <div
      className="gallery-container"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        padding: "40px 20px",
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
              marginBottom: "15px",
            }}
          >
            <PictureOutlined
              style={{ marginRight: "15px", color: "#ffd700" }}
            />
            Gallery Collection
          </Typography.Title>
          <Badge
            count={`${files.length} Photos`}
            style={{
              backgroundColor: "#52c41a",
              fontSize: "1rem",
              padding: "5px 15px",
              height: "auto",
              borderRadius: "20px",
            }}
          />
          <p
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "1.2rem",
              maxWidth: "600px",
              margin: "20px auto 0",
              lineHeight: "1.6",
            }}
          >
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
                    border: "1px solid rgba(255,255,255,0.2)",
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
                    transition: "all 0.3s ease",
                  }}
                >
                                     <div
                     style={{
                       position: "relative",
                       overflow: "hidden",
                     }}
                   >
                                         <Image
                       src={file.image_url}
                       alt={file.name}
                       width="100%"
                       style={{
                         height: "220px",
                         objectFit: "cover",
                         transition: "transform 0.3s ease",
                       }}
                       preview={{
                         mask: (
                           <div style={{ textAlign: 'center' }}>
                             <EyeOutlined style={{ fontSize: '2rem', color: 'white' }} />
                             <div style={{ marginTop: '8px', color: 'white' }}>View</div>
                           </div>
                         )
                       }}
                     />
                    
                    
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        
      </div>

                           <style>{`
          .photo-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 15px 40px rgba(0,0,0,0.2) !important;
          }
          
          .photo-card:hover img {
            transform: scale(1.05);
          }
        `}</style>
    </div>
  );
};

export default GalleryComponent;
