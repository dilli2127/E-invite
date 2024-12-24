import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // For custom styling

const LandingPage: React.FC = () => {
  const [brideName, setBrideName] = useState('');
  const [groomName, setGroomName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brideName && groomName) {
      // Redirect to the invite page with bride and groom names
      navigate(`/einvite/${brideName}weds${groomName}`);
    }
  };

  return (
    <div className="landing-page">
      <div className="content-container">
        <h1>Welcome to the Wedding Invitation</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Bride's Name"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Groom's Name"
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Create Invitation
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;