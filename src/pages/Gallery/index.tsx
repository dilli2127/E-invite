import React from "react";
import { Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/Header/Header";

const albums = [
  {
    id: 1,
    title: "Wedding Album",
    cover: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG",
  },
  {
    id: 2,
    title: "Engagement Shoots",
    cover: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/005A6658.jpg",
  },
  {
    id: 3,
    title: "Birthday Celebrations",
    cover:
      "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/20240630_101612.jpg",
  },
  {
    id: 4,
    title: "Corporate Events",
    cover: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/0E9A1768.jpg",
  },
];

const AlbumPage: React.FC = () => {
  const navigate = useNavigate();

  const openGallery = (albumId: number) => {
    navigate(`/gallery/${albumId}`);
  };

  return (
    <>
      <div style={{ padding: 20 }}>
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>Photo Albums</h1>
        <Row gutter={[16, 16]}>
          {albums.map((album) => (
            <Col xs={24} sm={12} md={8} lg={6} key={album.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={album.title}
                    src={album.cover}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      minHeight: "200px",
                    }}
                  />
                }
                onClick={() => openGallery(album.id)}
              >
                <Card.Meta title={album.title} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default AlbumPage;
