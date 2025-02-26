import React, { useState, useEffect } from "react";
import "./WeddingBanner.css";
import AboutUs from "./about";
import TeamSection from "./team_section";
import Footer from "./footer";

const images = [
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG",
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A7195.jpg",
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A9143.jpg",
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/DSC_0319.jpg",
  "https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/post-1.jpg",
];

const WeddingBanner: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transition, setTransition] = useState("slide-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setTransition("slide-out");
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setTransition("slide-in");
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <div className="banner-container">
        <div
          className={`image-container ${transition}`}
          style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
        ></div>
        <div className="content-container_landing">
          <span className="badge">WEDDING</span>
          <h2 className="title">A picture is worth a thousand words!</h2>
          <p className="description">
            It clearly and beautifully captures your emotions - the joy, the
            laughter, the tears, you name it. Our pride is in offering the best
            shoots as we help you tell your story in photos.
          </p>
          <a href="/gallery" className="view-gallery-button">
            View Gallery &gt;
          </a>
        </div>
      </div>
      <div>
        <AboutUs />
        <TeamSection />
        <Footer />
      </div>
    </>
  );
};

export default WeddingBanner;
