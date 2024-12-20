import { Col } from "antd";
import React from "react";

interface LandscapeImageProps {
  imageUrl: string;
}

const LandscapeImage: React.FC<LandscapeImageProps> = ({ imageUrl }) => {
  return (
    <Col className="image-container">
      <img alt="Landscape" src={imageUrl} className="image-full-width" />
    </Col>
  );
};

export default LandscapeImage;