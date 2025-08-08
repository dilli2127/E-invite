import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TemplateRegistry from './templates/TemplateRegistry';
import styles from './PreviewInvite.module.css';

const PreviewInvite: React.FC = () => {
  const { templateId, coupleId } = useParams<{ templateId: string; coupleId?: string }>();
  
  const [inviteData, setInviteData] = useState({
    groomName: '',
    brideName: '',
    weddingDate: '',
    weddingTime: '',
    venue: '',
    address: '',
    description: '',
    rsvpEmail: '',
    rsvpPhone: '',
    primaryColor: '#667eea',
    secondaryColor: '#764ba2'
  });

  useEffect(() => {
    // In a real app, you would fetch the invite data from your backend
    // For now, we'll use sample data
    if (coupleId) {
      const names = coupleId.split('weds');
      if (names.length === 2) {
        setInviteData(prev => ({
          ...prev,
          groomName: names[0].charAt(0).toUpperCase() + names[0].slice(1),
          brideName: names[1].charAt(0).toUpperCase() + names[1].slice(1),
          weddingDate: '2024-06-15',
          weddingTime: '6:00 PM',
          venue: 'Grand Hotel Ballroom',
          address: '123 Wedding Street, City, State 12345',
          description: 'Join us for a beautiful celebration of love and commitment. We can\'t wait to share this special day with our family and friends.',
          rsvpEmail: 'rsvp@wedding.com',
          rsvpPhone: '+1 (555) 123-4567'
        }));
      }
    } else {
      // Use sample data when no coupleId is provided (for template preview)
      setInviteData(prev => ({
        ...prev,
        groomName: 'John',
        brideName: 'Sarah',
        weddingDate: '2024-06-15',
        weddingTime: '6:00 PM',
        venue: 'Grand Hotel Ballroom',
        address: '123 Wedding Street, City, State 12345',
        description: 'Join us for a beautiful celebration of love and commitment. We can\'t wait to share this special day with our family and friends.',
        rsvpEmail: 'rsvp@wedding.com',
        rsvpPhone: '+1 (555) 123-4567'
      }));
    }
  }, [coupleId]);

  if (!templateId) {
    return (
      <div className={styles.previewPage}>
        <div className={styles.errorContainer}>
          <h2>Template not found</h2>
          <p>Please select a valid template.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.previewPage}>
      <div className={styles.previewHeader}>
        <div className={styles.previewControls}>
          <button className={styles.closeBtn} onClick={() => window.close()}>
            ✕ Close Preview
          </button>
          <button className={styles.printBtn} onClick={() => window.print()}>
            🖨️ Print Invite
          </button>
        </div>
      </div>
      
      <div className={styles.previewContent}>
        <TemplateRegistry
          templateId={templateId}
          {...inviteData}
        />
      </div>
    </div>
  );
};

export default PreviewInvite; 