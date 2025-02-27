import React, { useState, useEffect, useRef } from 'react';
import './home_gallery.css';

interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const sampleImages: Image[] = [
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Landscape Kitten' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Portrait Kitten' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Square Kitten' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Wide Landscape' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Tall Portrait' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Medium Landscape' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Medium Portrait' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Another Landscape' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Landscape Kitten' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Portrait Kitten' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Square Kitten' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Wide Landscape' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Tall Portrait' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Medium Landscape' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Medium Portrait' },
      { src: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG', alt: 'Another Landscape' },
    ];
    setImages(sampleImages);
    imageRefs.current = Array(sampleImages.length).fill(null);
  }, []);

  useEffect(() => {
    const updateImageSizes = () => {
      const newImages = images.map((image, index) => {
        const imageRef = imageRefs.current[index];
        if (imageRef && imageRef.naturalWidth && imageRef.naturalHeight) {
          return {
            ...image,
            width: imageRef.naturalWidth,
            height: imageRef.naturalHeight,
          };
        }
        return image;
      });
      setImages(newImages);
    };

    const allImagesLoaded = imageRefs.current.every(
      (ref) => ref && ref.complete && ref.naturalWidth > 0
    );

    if (allImagesLoaded) {
      updateImageSizes();
    } else {
      imageRefs.current.forEach((ref) => {
        if (ref) {
          ref.onload = updateImageSizes;
        }
      });
    }
  }, [images]);

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <div
          className="gallery-item"
          key={index}
          style={{
            flexGrow: image.width && image.height ? image.width / image.height : 1,
          }}
        >
          <img
            ref={(el) => (imageRefs.current[index] = el)}
            src={image.src}
            alt={image.alt}
            style={{ objectFit: 'cover' }}
          />
          <div className="overlay">{image.alt}</div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;