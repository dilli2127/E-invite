import { Col } from "antd";
import React, { useState } from "react";

interface LandscapeImageProps {
  imageUrl: string;
}

const LandscapeImage: React.FC<LandscapeImageProps> = ({ imageUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Col className="image-container-e-invite">
      <div className="landscape-image-wrapper">
        <div className="image-overlay-gradient"></div>
        <img 
          alt="Wedding Invitation" 
          src={imageUrl} 
          className={`landscape-main-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="image-decorative-border"></div>
        <div className="image-corner-accents">
          <div className="corner-accent top-left"></div>
          <div className="corner-accent top-right"></div>
          <div className="corner-accent bottom-left"></div>
          <div className="corner-accent bottom-right"></div>
        </div>
      </div>
    </Col>
  );
};

export default LandscapeImage;