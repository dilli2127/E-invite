import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './CreateEInvite.module.css';
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
    <div className={styles.createEinvitePage}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <h1 className={styles.mainTitle}>
            <span className={styles.titleIcon}>💍</span>
            Create Your E-Invite
          </h1>
          <p className={styles.subtitle}>
            Choose from our beautiful templates to create your perfect wedding invitation
          </p>
          {coupleNames && coupleNames !== 'new' && (
            <div className={styles.coupleInfo}>
              <span className={styles.coupleNames}>
                {groomName} & {brideName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Name Form for New Invite */}
      {showNameForm && (
        <div className={styles.nameFormSection}>
          <div className={styles.nameFormContainer}>
            <h2 className={styles.nameFormTitle}>
              <span className={styles.formIcon}>👰🤵</span>
              Enter Couple Names
            </h2>
            <p className={styles.nameFormSubtitle}>
              Please provide the names to personalize your invitation
            </p>
            
            <form onSubmit={handleNameSubmit} className={styles.nameForm}>
              <div className={styles.nameInputGroup}>
                <label htmlFor="temp-groom-name" className={styles.nameInputLabel}>
                  <span className={styles.labelIcon}>👨</span>
                  Groom's Name
                </label>
                <input
                  id="temp-groom-name"
                  type="text"
                  placeholder="Enter groom's name"
                  value={tempGroomName}
                  onChange={(e) => setTempGroomName(e.target.value)}
                  className={styles.nameInput}
                  required
                />
              </div>

              <div className={styles.nameInputGroup}>
                <label htmlFor="temp-bride-name" className={styles.nameInputLabel}>
                  <span className={styles.labelIcon}>👰</span>
                  Bride's Name
                </label>
                <input
                  id="temp-bride-name"
                  type="text"
                  placeholder="Enter bride's name"
                  value={tempBrideName}
                  onChange={(e) => setTempBrideName(e.target.value)}
                  className={styles.nameInput}
                  required
                />
              </div>

              <button type="submit" className={styles.nameSubmitBtn}>
                <span className="btn-icon">✨</span>
                Continue to Templates
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>

        <div className={styles.categoryFilters}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryBtn} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className={styles.templatesContainer}>
        <div className={styles.templatesGrid}>
          {filteredTemplates.map(template => (
            <div key={template.id} className={styles.templateCard}>
              <div className={styles.templatePreview}>
                <div className={styles.previewPlaceholder}>
                  <span className={styles.previewIcon}>📱</span>
                  <span className={styles.previewText}>{template.name}</span>
                </div>
                <div className={styles.templateOverlay}>
                  <button
                    className={styles.previewBtn}
                    onClick={() => handlePreviewTemplate(template)}
                  >
                    👁️ Preview
                  </button>
                  <button
                    className={styles.selectBtn}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    ✨ Select Template
                  </button>
                </div>
              </div>
              
              <div className={styles.templateInfo}>
                <h3 className={styles.templateName}>{template.name}</h3>
                <p className={styles.templateDescription}>{template.description}</p>
                
                <div className={styles.templateColors}>
                  {template.colors.map((color, index) => (
                    <div
                      key={index}
                      className={styles.colorSwatch}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                
                <div className={styles.templateFeatures}>
                  {template.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className={styles.featureTag}>
                      {feature}
                    </span>
                  ))}
                  {template.features.length > 3 && (
                    <span className={`${styles.featureTag} ${styles.more}`}>
                      +{template.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className={styles.noTemplates}>
            <span className={styles.noTemplatesIcon}>🔍</span>
            <h3>No templates found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Template Selection Modal */}
      {showTemplateModal && selectedTemplate && (
        <div className={styles.modalOverlay} onClick={() => setShowTemplateModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Selected Template: {selectedTemplate.name}</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setShowTemplateModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.templateDetails}>
                <div className={styles.templatePreviewLarge}>
                  <div className={styles.previewPlaceholderLarge}>
                    <span className={styles.previewIconLarge}>📱</span>
                    <span className={styles.previewTextLarge}>{selectedTemplate.name}</span>
                  </div>
                </div>
                
                <div className={styles.templateSpecs}>
                  <h3>Template Features</h3>
                  <ul className={styles.featuresList}>
                    {selectedTemplate.features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        <span className={styles.featureIcon}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <h3>Color Palette</h3>
                  <div className={styles.colorPalette}>
                    {selectedTemplate.colors.map((color, index) => (
                      <div key={index} className={styles.colorItem}>
                        <div
                          className={styles.colorSwatchLarge}
                          style={{ backgroundColor: color }}
                        />
                        <span className={styles.colorCode}>{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowTemplateModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.createBtn}
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