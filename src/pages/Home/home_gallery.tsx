import React, { useState, useMemo } from "react";
import { Row, Col, Button, Empty, Image } from "antd";
import { motion } from "framer-motion";
import { EyeOutlined, ExpandOutlined } from "@ant-design/icons";
import "./home_gallery.css";

interface HomeGalleryProps {
  homeGalleryImages: Array<{
    url: string;
    id: string;
    title?: string;
    description?: string;
  }>;
}

const HomeGallery: React.FC<HomeGalleryProps> = ({ homeGalleryImages }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  
  // Optimize images array with memoization
  const optimizedImages = useMemo(() => {
    return homeGalleryImages?.slice(0, visibleCount) || [];
  }, [homeGalleryImages, visibleCount]);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, homeGalleryImages?.length || 0));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (!homeGalleryImages || homeGalleryImages.length === 0) {
    return (
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="gallery-title">Our Gallery</h2>
          <p className="gallery-subtitle">Capturing beautiful moments</p>
        </div>
        <Empty 
          description="No images available at the moment"
          style={{ margin: '40px 0' }}
        />
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <motion.h2 
          className="gallery-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Gallery
        </motion.h2>
        <motion.p 
          className="gallery-subtitle"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Capturing life's most precious moments with artistic excellence
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <Image.PreviewGroup
          preview={{
            toolbarRender: (
              _,
              {
                transform: { scale },
                actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onReset },
              },
            ) => (
              <div className="preview-toolbar">
                <Button type="text" icon="🔄" onClick={onRotateLeft} />
                <Button type="text" icon="🔁" onClick={onRotateRight} />
                <Button type="text" icon="↕️" onClick={onFlipY} />
                <Button type="text" icon="↔️" onClick={onFlipX} />
                <Button type="text" icon="🔍-" onClick={onZoomOut} />
                <Button type="text" icon="🔍+" onClick={onZoomIn} />
                <Button type="text" icon="🔄" onClick={onReset} />
              </div>
            ),
          }}
        >
          <Row gutter={[24, 24]} justify="center">
            {optimizedImages.map((img, index) => (
              <Col key={img.id || index} xs={24} sm={12} md={8} lg={6}>
                <motion.div
                  variants={itemVariants}
                  className="gallery-item-wrapper"
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="gallery-item">
                    <div className="image-wrapper">
                      <Image
                        src={img.url}
                        alt={img.title || `Gallery Image ${index + 1}`}
                        className="gallery-image"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '20px 20px 0 0'
                        }}
                        preview={{
                          mask: (
                            <div className="preview-mask">
                              <EyeOutlined style={{ fontSize: '24px', color: 'white' }} />
                            </div>
                          ),
                        }}
                        onError={() => {
                          console.log('Image failed to load:', img.url);
                        }}
                      />
                      <div className="image-overlay">
                        <div className="overlay-content">
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<EyeOutlined />}
                            size="large"
                            className="overlay-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Trigger Ant Design preview
                              const imageElement = e.currentTarget.closest('.image-wrapper')?.querySelector('.ant-image img') as HTMLImageElement;
                              if (imageElement) {
                                imageElement.click();
                              }
                            }}
                          />
                          <Button
                            type="default"
                            shape="circle"
                            icon={<ExpandOutlined />}
                            size="large"
                            className="overlay-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(img.url, '_blank');
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {img.title && (
                      <div className="image-info">
                        <h4>{img.title}</h4>
                        {img.description && <p>{img.description}</p>}
                      </div>
                    )}
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Image.PreviewGroup>
      </motion.div>

      {visibleCount < (homeGalleryImages?.length || 0) && (
        <div className="load-more-section">
          <Button 
            type="primary" 
            size="large"
            onClick={loadMore}
            className="load-more-btn"
          >
            Load More Images ({homeGalleryImages.length - visibleCount} remaining)
          </Button>
        </div>
      )}


    </div>
  );
};

export default HomeGallery;
