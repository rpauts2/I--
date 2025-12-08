'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ResourceCardProps {
  resource: {
    id: number;
    title: string;
    description: string;
    category: string;
    type: string;
    image: string;
    alt: string;
    downloads: number;
    rating: number;
    size: string;
    format: string;
    tags: string[];
    isPremium: boolean;
  };
  onDownload: (id: number) => void;
}

const ResourceCard = ({ resource, onDownload }: ResourceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-card border-2 border-border hover:border-toxic-lime transition-smooth overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <AppImage
          src={resource.image}
          alt={resource.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {resource.isPremium && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-toxic-gold text-primary text-xs font-bold font-cta border-2 border-primary">
            PREMIUM
          </div>
        )}
        <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-toxic-lime text-xs font-bold font-mono border border-toxic-lime">
          {resource.type}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        {/* Title & Category */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-toxic-lime font-mono uppercase tracking-wider">
              {resource.category}
            </span>
            <div className="flex items-center space-x-1">
              <Icon name="StarIcon" size={14} className="text-toxic-gold" variant="solid" />
              <span className="text-sm font-bold text-foreground">{resource.rating}</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-toxic-lime transition-smooth line-clamp-2">
            {resource.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
          {resource.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-text-secondary text-xs font-semibold border border-border hover:border-toxic-lime transition-smooth"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Stats & Download */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="ArrowDownTrayIcon" size={14} className="text-toxic-lime" />
              <span className="font-semibold">{resource.downloads.toLocaleString('ru-RU')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="DocumentIcon" size={14} className="text-toxic-magenta" />
              <span className="font-semibold">{resource.size}</span>
            </div>
          </div>
          <button
            onClick={() => onDownload(resource.id)}
            className="px-4 py-2 bg-toxic-lime text-primary text-xs font-bold font-cta hover:bg-toxic-gold transition-smooth border-2 border-toxic-lime hover:border-toxic-gold shadow-toxic-lime hover:shadow-toxic-gold"
          >
            {resource.isPremium ? 'ПОЛУЧИТЬ' : 'СКАЧАТЬ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;