import React from 'react';

// Template interfaces
export interface TemplateData {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'classic' | 'elegant' | 'romantic';
  colors: string[];
  features: string[];
}

// Template data
export const templates: TemplateData[] = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean and contemporary design with elegant typography',
    preview: '/templates/modern-minimal-preview.jpg',
    category: 'modern',
    colors: ['#2c3e50', '#ecf0f1', '#e74c3c'],
    features: ['Responsive Design', 'Photo Gallery', 'RSVP Form', 'Location Map']
  },
  {
    id: 'elegant-rose',
    name: 'Elegant Rose',
    description: 'Sophisticated design with rose gold accents',
    preview: '/templates/elegant-rose-preview.jpg',
    category: 'elegant',
    colors: ['#d4af37', '#f8f9fa', '#6c757d'],
    features: ['Elegant Typography', 'Photo Slideshow', 'Countdown Timer', 'Guest Book']
  },
  {
    id: 'romantic-floral',
    name: 'Romantic Floral',
    description: 'Beautiful floral patterns with romantic elements',
    preview: '/templates/romantic-floral-preview.jpg',
    category: 'romantic',
    colors: ['#ff69b4', '#f8f9fa', '#28a745'],
    features: ['Floral Backgrounds', 'Love Story Section', 'Music Player', 'Social Sharing']
  },
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    description: 'Timeless design with traditional wedding elements',
    preview: '/templates/classic-elegance-preview.jpg',
    category: 'classic',
    colors: ['#000000', '#ffffff', '#c0c0c0'],
    features: ['Traditional Layout', 'Formal Typography', 'Photo Gallery', 'RSVP System']
  },
  {
    id: 'modern-geometric',
    name: 'Modern Geometric',
    description: 'Contemporary design with geometric patterns',
    preview: '/templates/modern-geometric-preview.jpg',
    category: 'modern',
    colors: ['#3498db', '#2c3e50', '#e74c3c'],
    features: ['Geometric Elements', 'Interactive Animations', 'Photo Grid', 'Contact Form']
  },
  {
    id: 'vintage-charm',
    name: 'Vintage Charm',
    description: 'Retro-inspired design with vintage aesthetics',
    preview: '/templates/vintage-charm-preview.jpg',
    category: 'classic',
    colors: ['#8b4513', '#f5deb3', '#cd853f'],
    features: ['Vintage Typography', 'Sepia Photos', 'Timeline Section', 'Guest Comments']
  }
];

// Template categories
export const categories = [
  { id: 'all', name: 'All Templates', icon: '🎨' },
  { id: 'modern', name: 'Modern', icon: '✨' },
  { id: 'classic', name: 'Classic', icon: '👑' },
  { id: 'elegant', name: 'Elegant', icon: '💎' },
  { id: 'romantic', name: 'Romantic', icon: '💕' }
];

export default templates; 