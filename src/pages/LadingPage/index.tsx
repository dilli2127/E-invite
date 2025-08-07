import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const location = useLocation();
  const pageName = location.pathname.split("/").filter(Boolean).pop();
  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const pageTitleMap: Record<string, string> = {
    ealbum: "Create Your Digital Wedding Album",
    einvite: "Design Your Perfect Wedding Invitation",
    egallery: "Showcase Your Wedding Gallery",
    createeinvite: "CREATE E-INVITE",
  };

  const pageSubtitleMap: Record<string, string> = {
    ealbum: "Transform your precious moments into a beautiful digital album",
    einvite: "Create stunning digital invitations that your guests will love",
    egallery: "Share your wedding memories with friends and family",
    createeinvite: "Create beautiful digital wedding invitations with our easy-to-use platform",
  };

  const buttonTextMap: Record<string, string> = {
    ealbum: "GET E-Album",
    einvite: "GET E-Invite",
    egallery: "GET E-Gallery",
    createeinvite: "CREATE E-INVITE",
  };

  const iconMap: Record<string, string> = {
    ealbum: "📸",
    einvite: "💌",
    egallery: "🖼️",
    createeinvite: "🎨",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (brideName && groomName) {
      setIsLoading(true);
      const brideNameLower = brideName.toLowerCase();
      const groomNameLower = groomName.toLowerCase();

      // Simulate loading for better UX
      setTimeout(() => {
        if (pageName === "ealbum") {
          navigate(`/ealbum/${groomNameLower}weds${brideNameLower}`);
        } else if (pageName === "einvite") {
          navigate(`/einvite/${groomNameLower}weds${brideNameLower}`);
        } else if (pageName === "egallery") {
          navigate(`/egallery/${groomNameLower}weds${brideNameLower}`);
        } else if (pageName === "createeinvite") {
          navigate(`/createeinvite/${groomNameLower}weds${brideNameLower}`);
        }
        setIsLoading(false);
      }, 1000);
    }
  };

  const pageTitle = pageName ? pageTitleMap[pageName] : "Welcome";
  const pageSubtitle = pageName ? pageSubtitleMap[pageName] : "Create something amazing";
  const buttonText = pageName ? buttonTextMap[pageName] : "Get Started";
  const pageIcon = pageName ? iconMap[pageName] : "✨";

  return (
    <div className="landing-page">
      {/* Animated background elements */}
      <div className="floating-elements">
        <div className="floating-element element-1">💕</div>
        <div className="floating-element element-2">🌹</div>
        <div className="floating-element element-3">✨</div>
        <div className="floating-element element-4">💍</div>
        <div className="floating-element element-5">🎉</div>
      </div>

      <div className="content-container">
        <div className="header-section">
          <div className="icon-container">
            <span className="page-icon">{pageIcon}</span>
          </div>
          <h1 className="main-title">{pageTitle}</h1>
          <p className="subtitle">{pageSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-group">
            <label htmlFor="groom-name" className="input-label">
              <span className="label-icon">👨</span>
              Groom's Name
            </label>
            <input
              id="groom-name"
              type="text"
              placeholder="Enter groom's name"
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="bride-name" className="input-label">
              <span className="label-icon">👰</span>
              Bride's Name
            </label>
            <input
              id="bride-name"
              type="text"
              placeholder="Enter bride's name"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Creating...
              </>
            ) : (
              <>
                <span className="btn-icon">🚀</span>
                {buttonText}
              </>
            )}
          </button>
        </form>

        <div className="footer-section">
          <div className="brand-info">
            <span className="brand-text">Powered by</span>
            <span className="brand-name">FreshFocuzStudio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
