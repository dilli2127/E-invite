import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

interface LocationMapProps {
  latitude: number;
  longitude: number;
  placeName?: string; // Optional, if you want to pass "SVK PALACE"
}

const LocationMap: React.FC<LocationMapProps> = ({
  latitude,
  longitude,
  placeName
}) => {
  const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);

  const apiKey = "AIzaSyAKpQZVawfF5Mq6zhr-S-PMgrf_Mlpy-zg";

  const handleMarkerClick = () => {
    setShowInfoWindow(true);
  };

  const handleInfoWindowClose = () => {
    setShowInfoWindow(false);
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <Card title="Event Location">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={{ lat: latitude, lng: longitude }}
          zoom={15}
        >
          <Marker
            position={{ lat: latitude, lng: longitude }}
            onClick={handleMarkerClick}
          />
          {showInfoWindow && (
            <InfoWindow
              position={{ lat: latitude, lng: longitude }}
              onCloseClick={handleInfoWindowClose}
            >
              <div style={{ maxWidth: "250px", textAlign: "center" }}>
                <h3 style={{ margin: "5px 0" }}>{placeName}</h3>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#1a73e8" }}
                >
                  Open in Google Maps
                </a>
                <br />
                <Button
                  type="primary"
                  style={{ marginTop: "8px" }}
                  onClick={() => placeName && navigator.clipboard.writeText(placeName)}
                >
                  Copy Location Name
                </Button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    {/* Address Block Below Map */}
    {googleMapsUrl && (
        <div
          style={{
            marginTop: "15px",
            padding: "15px",
            backgroundColor: "#f0f8ff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#1d3557", fontFamily: "Arial, sans-serif" }}>
            Event Address
          </h3>
          <p
            style={{
              whiteSpace: "pre-line", // Ensures multiline address
              color: "#0b1687",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {placeName}
          </p>
          <Button
            type="primary"
            href={googleMapsUrl}
            target="_blank"
            style={{ marginTop: "10px" }}
          >
            Get Directions
          </Button>
        </div>
      )}
    </Card>
  );
};

export default LocationMap;
