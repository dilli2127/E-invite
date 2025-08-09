import React from "react";
import { Carousel } from "antd";

interface PhotoSliderProps {
  photos: string[];
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({ photos }) => {
  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <div className="photo-slider-container">
      <div className="slider-header">
        <h2 className="slider-title">Memorable Moments</h2>
        <div className="slider-subtitle">Cherish these beautiful memories</div>
      </div>
      <Carousel 
        autoplay 
        dots={{ className: 'custom-dots' }}
        effect="fade"
        autoplaySpeed={4000}
      >
        {photos.map((photo, index) => (
          <div key={index} className="slider-item">
            <div className="image-frame">
              <img
                src={photo}
                alt={`Memory ${index + 1}`}
                className="slider-image"
              />
              <div className="image-shine-effect"></div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PhotoSlider;