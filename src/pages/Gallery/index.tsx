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
    cover: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG",
  },
  {
    id: 3,
    title: "Birthday Celebrations",
    cover: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG",
  },
  {
    id: 4,
    title: "Corporate Events",
    cover: "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG",
  },
];

const AlbumPage: React.FC = () => {
  const navigate = useNavigate();

  const openGallery = (albumId: number) => {
    navigate(`/gallery/${albumId}`);
  };

  return (
    <>
      <AppHeader />
      <div style={{ padding: 20 }}>
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>Photo Albums</h1>
        <Row gutter={[16, 16]}>
          {albums.map((album) => (
            <Col xs={24} sm={12} md={8} lg={6} key={album.id}>
              <Card
                hoverable
                cover={<img alt={album.title} src={album.cover} />}
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
