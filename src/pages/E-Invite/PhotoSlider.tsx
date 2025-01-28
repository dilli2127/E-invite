import React from "react";
import { Carousel } from "antd";

interface PhotoSliderProps {
  photos:  string [];
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({ photos }) => {
  return (
    <Carousel autoplay >
      {photos.map((photo, index) => (
      <div key={index}>
        <img
        src={photo}
        alt={`photo-${index}`}
        className="image-full-width-slider"
        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
        />
      </div>
      ))}
    </Carousel>
  );
};

export default PhotoSlider;