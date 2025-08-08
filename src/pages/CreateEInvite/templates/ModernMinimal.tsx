import React from 'react';
import styles from './TemplateStyles.module.css';

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
    <div className={styles.modernMinimal} style={{ '--primary-color': primaryColor, '--secondary-color': secondaryColor } as React.CSSProperties}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.coupleNames}>
            <h1 className={styles.groomName}>{groomName || 'Groom'}</h1>
            <div className={styles.andSymbol}>&</div>
            <h1 className={styles.brideName}>{brideName || 'Bride'}</h1>
          </div>
          <div className={styles.weddingDate}>
            {formatDate(weddingDate) || 'Wedding Date'}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className={styles.detailsSection}>
        <div className={styles.container}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>🕐</div>
              <h3>Time</h3>
              <p>{weddingTime || '6:00 PM'}</p>
            </div>
            
            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>📍</div>
              <h3>Venue</h3>
              <p>{venue || 'Wedding Venue'}</p>
            </div>
            
            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>🗺️</div>
              <h3>Address</h3>
              <p>{address || 'Venue Address'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      {description && (
        <section className={styles.descriptionSection}>
          <div className={styles.container}>
            <div className={styles.descriptionContent}>
              <p className={styles.descriptionText}>{description}</p>
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      <section className={styles.rsvpSection}>
        <div className={styles.container}>
          <h2 className={styles.rsvpTitle}>RSVP</h2>
          <div className={styles.rsvpContent}>
            <div className={styles.rsvpMethods}>
              {rsvpEmail && (
                <div className={styles.rsvpMethod}>
                  <div className={styles.rsvpIcon}>📧</div>
                  <div className={styles.rsvpDetails}>
                    <h4>Email</h4>
                    <a href={`mailto:${rsvpEmail}`} className={styles.rsvpLink}>{rsvpEmail}</a>
                  </div>
                </div>
              )}
              
              {rsvpPhone && (
                <div className={styles.rsvpMethod}>
                  <div className={styles.rsvpIcon}>📱</div>
                  <div className={styles.rsvpDetails}>
                    <h4>Phone</h4>
                    <a href={`tel:${rsvpPhone}`} className={styles.rsvpLink}>{rsvpPhone}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.templateFooter}>
        <div className={styles.container}>
          <p className={styles.footerText}>
            We can't wait to celebrate with you! 💕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ModernMinimal; 