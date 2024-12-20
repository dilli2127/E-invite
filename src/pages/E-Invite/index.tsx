import React, { useState, useEffect } from "react";
import LandscapeImage from "./LandscapeImage";
import PhotoSlider from "./PhotoSlider";
import LocationMap from "./LocationMap";
import { Col } from "antd";
import Header from "../../components/Header/Header";

interface EInviteData {
  landscapeImage: string;
  photos: { url: string }[];
  location: {
    latitude: number;
    longitude: number;
  };
}

const EInvitePage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [photos, setPhotos] = useState<{ url: string }[]>([]);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 0, longitude: 0 });

  useEffect(() => {
    // Fetch data from your API
    fetch("/api/einvite")
      .then((res) => res.json())
      .then((data: EInviteData) => {
        setImageUrl(data.landscapeImage);
        setPhotos(data.photos);
        setLocation(data.location);
      });
  }, []);
  const slide = [
    { url: "https://freshfocuzstudio.s3.ap-south-1.amazonaws.com/IMG_0492.JPG" },
    { url: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG" },
  ];
  return (
    <>
      <Header />
      <Col className="einvite-page">
        <Col >
          <LandscapeImage
            imageUrl={
              "https://freshfocuzstudio.s3.ap-south-1.amazonaws.com/Pink+And+Green+Floral+Wedding+Invitation+Landscape+.jpg"
            }
          />
        </Col>
        <Col style={{ marginTop:"-3px" }}>
          <PhotoSlider photos={slide} />
        </Col>
        <Col>
          <LocationMap
            latitude={13.090602524240074}
            longitude={79.4262046063622}
          />
        </Col>
      </Col>
    </>
  );
};

export default EInvitePage;
