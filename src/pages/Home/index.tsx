import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Spin } from "antd";
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
  const [isPlaying, setIsPlaying] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
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
  // Memoize filtered images to prevent unnecessary re-renders
  const { homeImages, homeGalleryImages } = useMemo(() => {
    const result = items?.result || [];
    return {
      homeImages: result.filter((item: { type: string }) => item.type === 'Home'),
      homeGalleryImages: result.filter((item: { type: string }) => item.type === 'HomeGallery')
    };
  }, [items?.result]);

  const getAllImages = useCallback(() => {
    callBackServer(
      {
        method: getImageRoute.method,
        endpoint: getImageRoute.endpoint,
        data: { pageLimit: 100 },
      },
      getImageRoute.identifier
    );
  }, [callBackServer, getImageRoute]);

  useEffect(() => {
    getAllImages();
  }, [getAllImages]);
  // Optimized slider with better performance
  useEffect(() => {
    if (!isVisible || !isPlaying || homeImages.length === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTransition("slide-out");
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % homeImages.length);
          setTransition("slide-in");
        }, 300); // Reduced timeout for faster transition
      });
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isVisible, isPlaying, homeImages.length]);

  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    if (index === currentImageIndex) return;
    setTransition("slide-out");
    requestAnimationFrame(() => {
      setTimeout(() => {
        setCurrentImageIndex(index);
        setTransition("slide-in");
      }, 300);
    });
  }, [currentImageIndex]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  if (loading && !items?.result?.length) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div ref={bannerRef} className="banner-container">
        {homeImages.length > 0 && (
          <div
            className={`image-container ${transition}`}
            style={{
              backgroundImage: `url('${homeImages[currentImageIndex]?.url}')`,
            }}
            role="img"
            aria-label={`Wedding photo ${currentImageIndex + 1} of ${homeImages.length}`}
          />
        )}
        
        {/* Slider Controls */}
        <div className="slider-controls">
          <button 
            className="play-pause-btn"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          
          <div className="slider-dots">
            {homeImages.map((_: any, index: number) => (
              <button
                key={index}
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="content-container_landing">
          <span className="badge">WEDDING PHOTOGRAPHY</span>
          <h1 className="title">Capturing Your Perfect Moments</h1>
          <p className="description">
            Every picture tells a story of love, joy, and unforgettable memories. 
            Let us help you preserve your most precious moments with our professional 
            photography services that capture the essence of your special day.
          </p>
          <div className="cta-buttons">
            <a href="/gallery" className="view-gallery-button primary">
              View Our Gallery
            </a>
            <a href="/contact" className="view-gallery-button secondary">
              Book Now
            </a>
          </div>
        </div>
      </div>
      
      <main>
        <AboutUs />
        <HomeGallery homeGalleryImages={homeGalleryImages} />
        <Testimonial />
        <TeamSection />
        <Footer />
      </main>
    </>
  );
};

export default WeddingBanner;
