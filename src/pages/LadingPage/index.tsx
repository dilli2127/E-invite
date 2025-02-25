import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./LandingPage.css"; // For custom styling
import AppHeader from "../../components/Header/Header";

const LandingPage: React.FC = () => {
  const location = useLocation();
  const pageName = location.pathname.split("/").filter(Boolean).pop();
  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");
  const navigate = useNavigate();
  console.log("page_url", pageName);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brideName && groomName) {
      navigate(`/einvite/${groomName}weds${brideName}`);
    }
  };
  const pageTitle =
    pageName === "ealbum"
      ? "Welcome to the E-Album"
      : "Welcome to the E-Invite";
  const Button = pageName === "ealbum" ? "Get E-Album" : "Get E-Invite";
  return (
    <>
      <AppHeader />
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
              {Button}
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
