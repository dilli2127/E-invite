import React, { useState, useEffect, useRef, useCallback } from "react";
import "./WeddingBanner.css";
import AboutUs from "./about";
import TeamSection from "./team_section";
import Footer from "./footer";
import HomeGallery from "./home_gallery";
import Testimonial from "./testimonial";
import { ApiRequest } from "../../services/api/apiService";
import { dynamic_request, useDynamicSelector } from "../../services/redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { getApiRouteCmsImage } from "../../helpers/Common_functions";

const WeddingBanner: React.FC = () => {
  const getImageRoute = getApiRouteCmsImage("GetAll");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transition, setTransition] = useState("slide-in");
  const [isVisible, setIsVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { loading, items } = useDynamicSelector(getImageRoute.identifier);
  const dispatch: Dispatch<any> = useDispatch();
  const callBackServer = useCallback(
    (variables: ApiRequest, key: string) => {
      dispatch(dynamic_request(variables, key));
    },
    [dispatch]
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Activate when 50% of the component is visible
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);
  const homeImages = items?.result?.filter((item: { type: string }) => item.type === 'Home') ?? [];
  const homeGalleryImages = items?.result?.filter((item: { type: string }) => item.type === 'HomeGallery') ?? [];
  const getAllImages = () => {
    callBackServer(
      {
        method: getImageRoute.method,
        endpoint: getImageRoute.endpoint,
        data: {},
      },
      getImageRoute.identifier
    );
  };
  useEffect(() => {
    getAllImages();
  }, []);
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTransition("slide-out");
      setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % homeImages?.length
        );
        setTransition("slide-in");
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible, currentImageIndex]);

  return (
    <>
      <div ref={bannerRef} className="banner-container">
        <div
          className={`image-container ${transition}`}
          style={{
            backgroundImage: items?.result?.length
              ? `url('${homeImages?.[currentImageIndex]?.url}')`
              : `url('${homeImages?.[currentImageIndex]?.url}')`,
          }}
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
        <HomeGallery homeGalleryImages={homeGalleryImages} />
        <Testimonial />
        <TeamSection />
        <Footer />
      </div>
    </>
  );
};

export default WeddingBanner;
