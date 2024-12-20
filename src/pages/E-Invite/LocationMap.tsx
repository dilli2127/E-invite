import React, { useEffect, useState } from "react";
import { Card } from "antd";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

interface LocationMapProps {
  latitude: number;
  longitude: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude }) => {
  const [address, setAddress] = useState<string>("");
  const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);

  const apiKey = "AIzaSyCVY8hRJ-X4VVYVuDECrRQynxwvuk6Kgow";

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        const fetchedAddress =
          data.results[0]?.formatted_address || "Address not found";
        setAddress(fetchedAddress);
      });
  }, [latitude, longitude, apiKey]);

  const handleMarkerClick = () => {
    setShowInfoWindow(true);
  };

  const handleInfoWindowClose = () => {
    setShowInfoWindow(false);
  };

  return (
    <Card title="Event Location" >
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={{ lat: latitude, lng: longitude }}
          zoom={13}
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
              <div>{address}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      {address && <div style={{ marginTop: "10px" }}>Address: {address}</div>}
    </Card>
  );
};

export default LocationMap;