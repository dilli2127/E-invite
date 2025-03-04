import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LandingPage.css"; // For custom styling

const LandingPage: React.FC = () => {
  const location = useLocation();
  const pageName = location.pathname.split("/").filter(Boolean).pop();
  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");
  const navigate = useNavigate();
  const pageTitleMap: Record<string, string> = {
    ealbum: "Welcome to the E-Album",
    einvite: "Welcome to the E-Invite",
    egallery: "Welcome to the E-Gallery",
  };

  const buttonTextMap: Record<string, string> = {
    ealbum: "Get E-Album",
    einvite: "Get E-Invite",
    egallery: "Get E-Gallery",
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brideName && groomName) {
      const brideNameLower = brideName.toLowerCase();
      const groomNameLower = groomName.toLowerCase();

      if (pageName === "ealbum") {
        navigate(`/ealbum/${groomNameLower}weds${brideNameLower}`);
      } else if (pageName === "einvite") {
        navigate(`/einvite/${groomNameLower}weds${brideNameLower}`);
      } else if (pageName === "egallery") {
        navigate(`/egallery/${groomNameLower}weds${brideNameLower}`);
      }
    }
  };
  const pageTitle = pageName ? pageTitleMap[pageName] : "Welcome";
  const buttonText = pageName ? buttonTextMap[pageName] : "Get Started";
  return (
    <>
      <div className="landing-page">
        <div className="content-container">
          <h1>{pageTitle}</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Groom's Name"
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Bride's Name"
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-btn">
              {buttonText}
            </button>
          </form>
          <br />
          freshfocuzstudio
        </div>
      </div>
    </>
  );
};

export default LandingPage;
