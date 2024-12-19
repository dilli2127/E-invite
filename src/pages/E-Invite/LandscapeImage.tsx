import React from 'react';
import { Card } from 'antd';

interface LandscapeImageProps {
  imageUrl: string;
}

const LandscapeImage: React.FC<LandscapeImageProps> = ({ imageUrl }) => {
  return (
    <div className="image-container">
    <img alt="Landscape" src={imageUrl} className="image-full-width" />
  </div>
  );
};

export default LandscapeImage;
