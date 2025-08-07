import React from 'react';
import './TemplateStyles.css';

interface ModernMinimalProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  venue: string;
  address: string;
  description: string;
  rsvpEmail: string;
  rsvpPhone: string;
  primaryColor: string;
  secondaryColor: string;
}

const ModernMinimal: React.FC<ModernMinimalProps> = ({
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  venue,
  address,
  description,
  rsvpEmail,
  rsvpPhone,
  primaryColor,
  secondaryColor
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="template-modern-minimal" style={{ '--primary-color': primaryColor, '--secondary-color': secondaryColor } as React.CSSProperties}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="couple-names">
            <h1 className="groom-name">{groomName || 'Groom'}</h1>
            <div className="and-symbol">&</div>
            <h1 className="bride-name">{brideName || 'Bride'}</h1>
          </div>
          <div className="wedding-date">
            {formatDate(weddingDate) || 'Wedding Date'}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="details-section">
        <div className="container">
          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-icon">🕐</div>
              <h3>Time</h3>
              <p>{weddingTime || '6:00 PM'}</p>
            </div>
            
            <div className="detail-card">
              <div className="detail-icon">📍</div>
              <h3>Venue</h3>
              <p>{venue || 'Wedding Venue'}</p>
            </div>
            
            <div className="detail-card">
              <div className="detail-icon">🗺️</div>
              <h3>Address</h3>
              <p>{address || 'Venue Address'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      {description && (
        <section className="description-section">
          <div className="container">
            <div className="description-content">
              <p className="description-text">{description}</p>
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      <section className="rsvp-section">
        <div className="container">
          <h2 className="rsvp-title">RSVP</h2>
          <div className="rsvp-content">
            <div className="rsvp-methods">
              {rsvpEmail && (
                <div className="rsvp-method">
                  <div className="rsvp-icon">📧</div>
                  <div className="rsvp-details">
                    <h4>Email</h4>
                    <a href={`mailto:${rsvpEmail}`} className="rsvp-link">{rsvpEmail}</a>
                  </div>
                </div>
              )}
              
              {rsvpPhone && (
                <div className="rsvp-method">
                  <div className="rsvp-icon">📱</div>
                  <div className="rsvp-details">
                    <h4>Phone</h4>
                    <a href={`tel:${rsvpPhone}`} className="rsvp-link">{rsvpPhone}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="template-footer">
        <div className="container">
          <p className="footer-text">
            We can't wait to celebrate with you! 💕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ModernMinimal; 