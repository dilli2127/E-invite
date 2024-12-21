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
}

const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude }) => {
  const [address, setAddress] = useState<string>("");
  const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);

  const apiKey = "AIzaSyDgT8ciJWh8oSJK4GS2Nb_so8sfl74kGGI";

  // useEffect(() => {
  //   // Fetch the address from Google Maps API
  //   fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const fetchedAddress =
  //         data.results[0]?.formatted_address || "Address not found";
  //       setAddress(fetchedAddress);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching address:", err);
  //       setAddress("Error fetching address");
  //     });
  // }, [latitude, longitude, apiKey]);

  const fetchCoordinates = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json
`
      );
      const data = await response.json();
      setAddress(data?.display_name);
    } catch (err) {
      console.error("Error fetching coordinates:", err);
    }
  };

  useEffect(() => {
    fetchCoordinates();
  }, []);

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
              <div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {address}
                  <Button
                  type="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                  }}
                >
                  Directions
                </Button>
                </a>
               
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      {address && (
        <div style={{ marginTop: "10px" }}>
          Address:{" "}
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            {address}
          </a>
        </div>
      )}
    </Card>
  );
};

export default LocationMap;
