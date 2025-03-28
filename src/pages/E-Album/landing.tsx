import React, { useCallback, useEffect } from "react";
import { Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { getApiRouteEAlbum, getApiRouteGallarey } from "../../helpers/Common_functions";
import { ApiRequest } from "../../services/api/apiService";
import { dynamic_request, useDynamicSelector } from "../../services/redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Album, EAlbum } from "../../routes/types/routeConfig";

const EAlbumLading: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const callBackServer = useCallback(
    (variables: ApiRequest, key: string) => {
      dispatch(dynamic_request(variables, key));
    },
    [dispatch]
  );
  const getRoute = getApiRouteEAlbum("GetAll");
  const { loading, items } = useDynamicSelector(getRoute.identifier);

  const galleryItems: EAlbum[] = items?.result || [];
  const getAllEAlbum = () => {
    callBackServer(
      { method: getRoute.method, endpoint: getRoute.endpoint, data: {} },
      getRoute.identifier
    );
  };
  const openGallery = (albumId: number) => {
    navigate(`/ealbum/${albumId}`);
  };
  useEffect(() => {
    getAllEAlbum();
  }, []);
  return (
    <>
      <div style={{ padding: 20 }}>
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>E Album</h1>
        <Row gutter={[16, 16]}>
          {galleryItems.map((album) => (
            <Col xs={24} sm={12} md={8} lg={6} key={album._id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={album.albumname}
                    src={album.albumcover}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      minHeight: "200px",
                    }}
                  />
                }
                onClick={() => openGallery(album._id)}
              >
                <Card.Meta title={album.albumname} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default EAlbumLading;
