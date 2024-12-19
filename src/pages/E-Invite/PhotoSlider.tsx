import React from "react";
import { Carousel } from "antd";

interface PhotoSliderProps {
  photos: { url: string }[];
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({ photos }) => {
  return (
    <>
      <Carousel autoplay>
        {photos.map((photo, index) => (
          <div key={index}>
            <img
              src={photo.url}
              alt={`photo-${index}`}
              className="image-full-width"
            />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default PhotoSlider;
