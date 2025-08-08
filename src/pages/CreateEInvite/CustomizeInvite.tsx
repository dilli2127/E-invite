import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './CustomizeInvite.module.css';
import { templates, TemplateData } from './templates';

const CustomizeInvite: React.FC = () => {
  const { templateId, coupleId } = useParams<{ templateId: string; coupleId: string }>();
  const navigate = useNavigate();
  
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);
  const [customizationData, setCustomizationData] = useState({
    groomName: '',
    brideName: '',
    weddingDate: '',
    weddingTime: '',
    venue: '',
    address: '',
    description: '',
    rsvpEmail: '',
    rsvpPhone: '',
    theme: 'default',
    primaryColor: '#667eea',
    secondaryColor: '#764ba2'
  });

  useEffect(() => {
    if (templateId) {
      const template = templates.find(t => t.id === templateId);
      if (template) {
        setSelectedTemplate(template);
        setCustomizationData(prev => ({
          ...prev,
          primaryColor: template.colors[0],
          secondaryColor: template.colors[1] || template.colors[0]
        }));
      }
    }

    if (coupleId) {
      // Parse couple names from URL
      const names = coupleId.split('weds');
      if (names.length === 2) {
        setCustomizationData(prev => ({
          ...prev,
          groomName: names[0].charAt(0).toUpperCase() + names[0].slice(1),
          brideName: names[1].charAt(0).toUpperCase() + names[1].slice(1)
        }));
      }
    }
  }, [templateId, coupleId]);

  const handleInputChange = (field: string, value: string) => {
    setCustomizationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveInvite = async () => {
    try {
      // Here you would save the invite data to your backend
      const inviteData = {
        templateId,
        coupleId,
        customizationData,
        createdAt: new Date().toISOString()
      };

      // Simulate API call
      console.log('Saving invite data:', inviteData);
      
      // Navigate to the created invite
      navigate(`/einvite/${coupleId}`);
    } catch (error) {
      console.error('Error saving invite:', error);
      alert('Error saving invite. Please try again.');
    }
  };

  const handlePreview = () => {
    // Open preview in new tab
    window.open(`/preview/${templateId}/${coupleId}`, '_blank');
  };

  if (!selectedTemplate) {
    return (
      <div className="customize-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="customize-page">
      {/* Header */}
      <div className="customize-header">
        <div className="header-content">
          <h1 className="customize-title">
            <span className="title-icon">🎨</span>
            Customize Your Invite
          </h1>
          <p className="customize-subtitle">
            Personalize your {selectedTemplate.name} template
          </p>
        </div>
      </div>

      <div className="customize-container">
        {/* Preview Section */}
        <div className="preview-section">
          <div className="preview-header">
            <h3>Live Preview</h3>
            <button className="preview-btn" onClick={handlePreview}>
              👁️ Full Preview
            </button>
          </div>
          <div className="preview-frame">
            <div className="invite-preview">
              <div className="preview-header-invite">
                <h2 className="preview-couple-names">
                  {customizationData.groomName || 'Groom'} & {customizationData.brideName || 'Bride'}
                </h2>
                <p className="preview-date">
                  {customizationData.weddingDate || 'Wedding Date'}
                </p>
              </div>
              <div className="preview-content">
                <p className="preview-venue">
                  {customizationData.venue || 'Venue Name'}
                </p>
                <p className="preview-address">
                  {customizationData.address || 'Venue Address'}
                </p>
                <p className="preview-description">
                  {customizationData.description || 'Wedding description will appear here...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customization Form */}
        <div className="customization-section">
          <div className="form-container">
            <h3 className="form-title">Customize Details</h3>
            
            <div className="form-group">
              <label>Groom's Name</label>
              <input
                type="text"
                value={customizationData.groomName}
                onChange={(e) => handleInputChange('groomName', e.target.value)}
                placeholder="Enter groom's name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Bride's Name</label>
              <input
                type="text"
                value={customizationData.brideName}
                onChange={(e) => handleInputChange('brideName', e.target.value)}
                placeholder="Enter bride's name"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Wedding Date</label>
                <input
                  type="date"
                  value={customizationData.weddingDate}
                  onChange={(e) => handleInputChange('weddingDate', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Wedding Time</label>
                <input
                  type="time"
                  value={customizationData.weddingTime}
                  onChange={(e) => handleInputChange('weddingTime', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Venue Name</label>
              <input
                type="text"
                value={customizationData.venue}
                onChange={(e) => handleInputChange('venue', e.target.value)}
                placeholder="Enter venue name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Venue Address</label>
              <textarea
                value={customizationData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter venue address"
                className="form-textarea"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Wedding Description</label>
              <textarea
                value={customizationData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter wedding description or special message"
                className="form-textarea"
                rows={4}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>RSVP Email</label>
                <input
                  type="email"
                  value={customizationData.rsvpEmail}
                  onChange={(e) => handleInputChange('rsvpEmail', e.target.value)}
                  placeholder="Enter RSVP email"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>RSVP Phone</label>
                <input
                  type="tel"
                  value={customizationData.rsvpPhone}
                  onChange={(e) => handleInputChange('rsvpPhone', e.target.value)}
                  placeholder="Enter RSVP phone"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Primary Color</label>
              <div className="color-picker">
                <input
                  type="color"
                  value={customizationData.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  className="color-input"
                />
                <span className="color-code">{customizationData.primaryColor}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Secondary Color</label>
              <div className="color-picker">
                <input
                  type="color"
                  value={customizationData.secondaryColor}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                  className="color-input"
                />
                <span className="color-code">{customizationData.secondaryColor}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="back-btn"
              onClick={() => navigate(`/createeinvite/${coupleId}`)}
            >
              ← Back to Templates
            </button>
            <button
              className="save-btn"
              onClick={handleSaveInvite}
            >
              💾 Save & Create Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeInvite; 