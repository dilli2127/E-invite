import React from "react";
import { Carousel } from "antd";

interface PhotoSliderProps {
  photos: { url: string }[];
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({ photos }) => {
  return (
    
    <Carousel autoplay style={{backgroundImage: 'url(https://freshfocuzstudio.s3.ap-south-1.amazonaws.com/background-1814372_1920.jpg)' }}>
      {photos.map((photo, index) => (
      <div key={index}>
        <img
        src={photo.url}
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