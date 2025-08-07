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
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  RotateRightOutlined,
  RotateLeftOutlined,
  VerticalAlignTopOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  ReloadOutlined,
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageTransform, setImageTransform] = useState({
    rotate: 0,
    scale: 1,
    flipH: false,
    flipV: false,
  });
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

  // Navigation functions
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

  // Image manipulation functions
  const rotateRight = () => {
    setImageTransform(prev => ({ ...prev, rotate: prev.rotate + 90 }));
  };

  const rotateLeft = () => {
    setImageTransform(prev => ({ ...prev, rotate: prev.rotate - 90 }));
  };

  const flipVertical = () => {
    setImageTransform(prev => ({ ...prev, flipV: !prev.flipV }));
  };

  const flipHorizontal = () => {
    setImageTransform(prev => ({ ...prev, flipH: !prev.flipH }));
  };

  const zoomIn = () => {
    setImageTransform(prev => ({ ...prev, scale: Math.min(prev.scale + 0.2, 3) }));
  };

  const zoomOut = () => {
    setImageTransform(prev => ({ ...prev, scale: Math.max(prev.scale - 0.2, 0.5) }));
  };

  const resetTransform = () => {
    setImageTransform({
      rotate: 0,
      scale: 1,
      flipH: false,
      flipV: false,
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (event.key === 'ArrowRight') {
          nextImage();
        } else if (event.key === 'ArrowLeft') {
          prevImage();
        } else if (event.key === 'Escape') {
          setSelectedIndex(null);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedIndex, files.length]);



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
                                               preview={false}
                        onClick={() => setSelectedIndex(index)}
                     />
                    
                    
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
                 )}

         {/* Custom Modal with Navigation */}
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
                                   <Image
                    src={files[selectedIndex].image_url}
                    alt={files[selectedIndex].name}
                    style={{
                      width: "85vw",
                      maxWidth: "1000px",
                      height: "75vh",
                      borderRadius: "15px",
                      border: "none",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                      objectFit: "contain",
                      transform: `rotate(${imageTransform.rotate}deg) scale(${imageTransform.scale}) scaleX(${imageTransform.flipH ? -1 : 1}) scaleY(${imageTransform.flipV ? -1 : 1})`,
                      transition: "transform 0.3s ease"
                    }}
                    preview={false}
                  />
               </div>
             </div>
             
                           <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginTop: "25px",
                alignItems: "center"
              }}>
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
                
                {/* Image Manipulation Controls */}
                <div style={{
                  background: "rgba(0,0,0,0.7)",
                  borderRadius: "15px",
                  padding: "15px 20px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  backdropFilter: "blur(10px)"
                }}>
                  <Button
                    shape="circle"
                    icon={<RotateRightOutlined />}
                    onClick={rotateRight}
                    size="middle"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      fontSize: "1rem"
                    }}
                  />
                  <Button
                    shape="circle"
                    icon={<RotateLeftOutlined />}
                    onClick={rotateLeft}
                    size="middle"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      fontSize: "1rem"
                    }}
                  />
                  <Button
                    shape="circle"
                    icon={<VerticalAlignTopOutlined />}
                    onClick={flipVertical}
                    size="middle"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      fontSize: "1rem"
                    }}
                  />
                  <Button
                    shape="circle"
                    icon={<SwapOutlined />}
                    onClick={flipHorizontal}
                    size="middle"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      fontSize: "1rem"
                    }}
                  />
                  <Button
                    shape="circle"
                    icon={<ZoomOutOutlined />}
                    onClick={zoomOut}
                    size="middle"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      fontSize: "1rem"
                    }}
                  />
                  <Button
                    shape="circle"
                    icon={<ZoomInOutlined />}
                    onClick={zoomIn}
                    size="middle"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      fontSize: "1rem"
                    }}
                  />
                  <Button
                    shape="circle"
                    icon={<ReloadOutlined />}
                    onClick={resetTransform}
                    size="middle"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      fontSize: "1rem"
                    }}
                  />
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
        `}</style>
    </div>
  );
};

export default GalleryComponent;
