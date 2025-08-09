import React, { useState, useEffect } from "react";
import LandscapeImage from "./LandscapeImage";
import PhotoSlider from "./PhotoSlider";
import LocationMap from "./LocationMap";
import { Col } from "antd";
import { useParams } from "react-router-dom";
import AppHeader from "../../components/Header/Header";
import { dynamic_request, useDynamicSelector } from "../../services/redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { ApiRequest } from "../../services/api/apiService";
import { API_ROUTES } from "../../services/api/utils";

const EInvitePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, items } = useDynamicSelector(
    API_ROUTES.GetEivite.Get.identifier
  );
  const dispatch: Dispatch<any> = useDispatch();
  const callBackServer = React.useCallback(
    (variables: ApiRequest, key: string) => {
      dispatch(dynamic_request(variables, key));
    },
    [dispatch]
  );

  useEffect(() => {
    callBackServer(
      {
        method: API_ROUTES.GetEivite.Get.method,
        endpoint: API_ROUTES.GetEivite.Get.endpoint + id,
        data: {},
      },
      API_ROUTES.GetEivite.Get.identifier
    );
  }, [id]);
  console.log(items);
  return (
    <div className="einvite-main-container">
      <div className="einvite-background-pattern"></div>
      <div className="floating-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-circle circle-4"></div>
        <div className="floating-circle circle-5"></div>
      </div>
      <Col className="einvite-page">
        <Col className="invitation-section">
          <LandscapeImage imageUrl={items?.result?.invite_url || ""} />
        </Col>
        
        {items?.result?.images && items.result.images.length > 0 && (
          <Col className="gallery-section">
            <PhotoSlider photos={items?.result?.images || []} />
          </Col>
        )}
        
        <Col className="location-section">
          <LocationMap
            latitude={items?.result?.latitude}
            longitude={items?.result?.longitude}
            placeName={`${items?.result?.event_address1}, ${items?.result?.event_address2}`}
          />
        </Col>
      </Col>
    </div>
  );
};

export default EInvitePage;
