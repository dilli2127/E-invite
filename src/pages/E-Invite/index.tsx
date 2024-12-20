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
      <Header />
      <Col className="einvite-page">
        <Col >
          <LandscapeImage
            imageUrl={
              "http://65.0.110.79:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL215ZmlsZXMvUGluayUyMEFuZCUyMEdyZWVuJTIwRmxvcmFsJTIwV2VkZGluZyUyMEludml0YXRpb24lMjBMYW5kc2NhcGUlMjAuanBnP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9UE1CT0FEMktUREU2TjJSMVhaWkglMkYyMDI0MTIxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDEyMTlUMTc1MzMxWiZYLUFtei1FeHBpcmVzPTQzMTk2JlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lKUVRVSlBRVVF5UzFSRVJUWk9NbEl4V0ZwYVNDSXNJbVY0Y0NJNk1UY3pORFkzTXprMU1Td2ljR0Z5Wlc1MElqb2liV2x1YVc5aFpHMXBiaUo5Li0xTU1pUHRZSlhoYVhPOFMzUUxSYTROXy1HZEgxV1gxV01SaFd1T2lFNFRPOVRWdXVna0o0cXJfYmpFMTlva0hqdGl0WE9ZVm54WThZLWg5b2NDRmFRJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9OWEzMGQ4NjlhZjRhN2E0OTAxODQ4ZjYxN2ViYjk4YjEyZmRkNWU5MDRkMGU0MTM4YTJhM2I3YmRlNTRmZjhiOA"
            }
          />
        </Col>
        <Col style={{ marginTop:"-3px" }}>
          <PhotoSlider photos={slide} />
        </Col>
        <Col>
          <LocationMap
            latitude={12.996591270762542}
            longitude={80.17143031302007}
          />
        </Col>
      </Col>
    </>
  );
};

export default EInvitePage;
