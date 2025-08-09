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
    <div className="location-map-container">
      <Card 
        className="location-card"
        title={
          <div className="location-card-header">
            <div className="location-icon">📍</div>
            <span className="location-title">Event Location</span>
          </div>
        }
      >
        <div className="map-wrapper">
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%", borderRadius: "12px" }}
              center={{ lat: latitude, lng: longitude }}
              zoom={15}
              options={{
                styles: [
                  {
                    featureType: "all",
                    elementType: "geometry.fill",
                    stylers: [{ weight: "2.00" }]
                  },
                  {
                    featureType: "all",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#9c9c9c" }]
                  }
                ]
              }}
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
                  <div className="info-window-content">
                    <h3 className="info-window-title">{placeName}</h3>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="info-window-link"
                    >
                      Open in Google Maps
                    </a>
                    <br />
                    <Button
                      type="primary"
                      className="copy-location-btn"
                      onClick={() => placeName && navigator.clipboard.writeText(placeName)}
                    >
                      Copy Location Name
                    </Button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
        
        {/* Enhanced Address Block Below Map */}
        {googleMapsUrl && (
          <div className="address-block">
            <div className="address-header">
              <h3 className="address-title">Event Venue</h3>
              <div className="address-decoration"></div>
            </div>
            <p className="address-text">{placeName}</p>
            <Button
              type="primary"
              href={googleMapsUrl}
              target="_blank"
              className="directions-btn"
              size="large"
            >
              <span className="btn-icon">🧭</span>
              Get Directions
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LocationMap;
