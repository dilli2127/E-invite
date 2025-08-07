import React from 'react';
import ModernMinimal from './ModernMinimal';

export interface TemplateProps {
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

interface TemplateRegistryProps extends TemplateProps {
  templateId: string;
}

const TemplateRegistry: React.FC<TemplateRegistryProps> = ({ templateId, ...props }) => {
  const renderTemplate = () => {
    switch (templateId) {
      case 'modern-minimal':
        return <ModernMinimal {...props} />;
      case 'elegant-rose':
        return <ModernMinimal {...props} />; // For now, using ModernMinimal as placeholder
      case 'romantic-floral':
        return <ModernMinimal {...props} />; // For now, using ModernMinimal as placeholder
      case 'classic-elegance':
        return <ModernMinimal {...props} />; // For now, using ModernMinimal as placeholder
      case 'modern-geometric':
        return <ModernMinimal {...props} />; // For now, using ModernMinimal as placeholder
      case 'vintage-charm':
        return <ModernMinimal {...props} />; // For now, using ModernMinimal as placeholder
      default:
        return <ModernMinimal {...props} />;
    }
  };

  return (
    <div className="template-container">
      {renderTemplate()}
    </div>
  );
};

export default TemplateRegistry; 