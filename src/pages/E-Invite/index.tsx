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
    { url: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG" },
    { url: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG" },
  ];
  return (
    <>
    <Header/>
      <Col className="einvite-page">
        <LandscapeImage
          imageUrl={
            "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG"
          }
        />
        <PhotoSlider photos={slide} />
        <LocationMap
          latitude={12.996591270762542}
          longitude={80.17143031302007}
        />
      </Col>
    </>
  );
};

export default EInvitePage;
