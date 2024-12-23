import React, { useState, useEffect } from "react";
import LandscapeImage from "./LandscapeImage";
import PhotoSlider from "./PhotoSlider";
import LocationMap from "./LocationMap";
import { Col } from "antd";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";

const EInvitePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [photos, setPhotos] = useState<string []>([]);
  const [location, setLatitude] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 0.0, longitude: 0.0 });
console.log("id",location)
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8247/e_invite/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const result = data.result;
          setImageUrl(result?.invite_url || "");
          setPhotos(result?.images || []);
          setLatitude({
            latitude: result?.latitude || 0.0,
            longitude: result?.longitude || 0.0,
          });
        })
        .catch((error) => {
          console.error("Error fetching invite details:", error);
        });
    }
  }, [id]);

  return (
    <>
      <Header />
      <Col className="einvite-page">
        <Col>
          <LandscapeImage imageUrl={imageUrl} />
        </Col>
        <Col style={{ marginTop: "-3px" }}>
          <PhotoSlider photos={photos} />
        </Col>
        <Col>
          <LocationMap
            latitude={location.latitude}
            longitude={location.longitude}
          />
        </Col>
      </Col>
    </>
  );
};

export default EInvitePage;
