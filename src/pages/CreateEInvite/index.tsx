import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CreateEInvite.css';
import { templates, categories, TemplateData } from './templates';

const CreateEInvite: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showNameForm, setShowNameForm] = useState(false);

  // Extract couple names from URL
  const coupleNames = id ? decodeURIComponent(id) : '';
  const [groomName, setGroomName] = useState('');
  const [brideName, setBrideName] = useState('');
  const [tempGroomName, setTempGroomName] = useState('');
  const [tempBrideName, setTempBrideName] = useState('');

  useEffect(() => {
    if (coupleNames && coupleNames !== 'new') {
      // Parse couple names from URL (format: groomwedsbride)
      const names = coupleNames.split('weds');
      if (names.length === 2) {
        setGroomName(names[0].charAt(0).toUpperCase() + names[0].slice(1));
        setBrideName(names[1].charAt(0).toUpperCase() + names[1].slice(1));
      }
    } else if (coupleNames === 'new') {
      // Show name form for new invite creation
      setShowNameForm(true);
    }
  }, [coupleNames]);

  // Filter templates based on category and search
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTemplateSelect = (template: TemplateData) => {
    setSelectedTemplate(template);
    setShowTemplateModal(true);
  };

  const handleCreateInvite = () => {
    if (selectedTemplate) {
      // Navigate to template customization page
      const coupleId = id === 'new' ? `${tempGroomName.toLowerCase()}weds${tempBrideName.toLowerCase()}` : id;
      navigate(`/customize/${selectedTemplate.id}/${coupleId}`);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempGroomName && tempBrideName) {
      setGroomName(tempGroomName);
      setBrideName(tempBrideName);
      setShowNameForm(false);
    }
  };

  const handlePreviewTemplate = (template: TemplateData) => {
    // Open template preview in new tab
    window.open(`/preview/${template.id}`, '_blank');
  };

  return (
    <div className="create-einvite-page">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-content">
          <h1 className="main-title">
            <span className="title-icon">💍</span>
            Create Your E-Invite
          </h1>
          <p className="subtitle">
            Choose from our beautiful templates to create your perfect wedding invitation
          </p>
          {coupleNames && coupleNames !== 'new' && (
            <div className="couple-info">
              <span className="couple-names">
                {groomName} & {brideName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Name Form for New Invite */}
      {showNameForm && (
        <div className="name-form-section">
          <div className="name-form-container">
            <h2 className="name-form-title">
              <span className="form-icon">👰🤵</span>
              Enter Couple Names
            </h2>
            <p className="name-form-subtitle">
              Please provide the names to personalize your invitation
            </p>
            
            <form onSubmit={handleNameSubmit} className="name-form">
              <div className="name-input-group">
                <label htmlFor="temp-groom-name" className="name-input-label">
                  <span className="label-icon">👨</span>
                  Groom's Name
                </label>
                <input
                  id="temp-groom-name"
                  type="text"
                  placeholder="Enter groom's name"
                  value={tempGroomName}
                  onChange={(e) => setTempGroomName(e.target.value)}
                  className="name-input"
                  required
                />
              </div>

              <div className="name-input-group">
                <label htmlFor="temp-bride-name" className="name-input-label">
                  <span className="label-icon">👰</span>
                  Bride's Name
                </label>
                <input
                  id="temp-bride-name"
                  type="text"
                  placeholder="Enter bride's name"
                  value={tempBrideName}
                  onChange={(e) => setTempBrideName(e.target.value)}
                  className="name-input"
                  required
                />
              </div>

              <button type="submit" className="name-submit-btn">
                <span className="btn-icon">✨</span>
                Continue to Templates
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="filter-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="templates-container">
        <div className="templates-grid">
          {filteredTemplates.map(template => (
            <div key={template.id} className="template-card">
              <div className="template-preview">
                <div className="preview-placeholder">
                  <span className="preview-icon">📱</span>
                  <span className="preview-text">{template.name}</span>
                </div>
                <div className="template-overlay">
                  <button
                    className="preview-btn"
                    onClick={() => handlePreviewTemplate(template)}
                  >
                    👁️ Preview
                  </button>
                  <button
                    className="select-btn"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    ✨ Select Template
                  </button>
                </div>
              </div>
              
              <div className="template-info">
                <h3 className="template-name">{template.name}</h3>
                <p className="template-description">{template.description}</p>
                
                <div className="template-colors">
                  {template.colors.map((color, index) => (
                    <div
                      key={index}
                      className="color-swatch"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                
                <div className="template-features">
                  {template.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                  {template.features.length > 3 && (
                    <span className="feature-tag more">
                      +{template.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="no-templates">
            <span className="no-templates-icon">🔍</span>
            <h3>No templates found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Template Selection Modal */}
      {showTemplateModal && selectedTemplate && (
        <div className="modal-overlay" onClick={() => setShowTemplateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Selected Template: {selectedTemplate.name}</h2>
              <button
                className="close-btn"
                onClick={() => setShowTemplateModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="template-details">
                <div className="template-preview-large">
                  <div className="preview-placeholder-large">
                    <span className="preview-icon-large">📱</span>
                    <span className="preview-text-large">{selectedTemplate.name}</span>
                  </div>
                </div>
                
                <div className="template-specs">
                  <h3>Template Features</h3>
                  <ul className="features-list">
                    {selectedTemplate.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="feature-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <h3>Color Palette</h3>
                  <div className="color-palette">
                    {selectedTemplate.colors.map((color, index) => (
                      <div key={index} className="color-item">
                        <div
                          className="color-swatch-large"
                          style={{ backgroundColor: color }}
                        />
                        <span className="color-code">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowTemplateModal(false)}
              >
                Cancel
              </button>
              <button
                className="create-btn"
                onClick={handleCreateInvite}
              >
                Create Invite with This Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEInvite; 