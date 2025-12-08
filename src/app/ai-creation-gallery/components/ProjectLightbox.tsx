'use client';

import { useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  category: string;
  tool: string;
  complexity: string;
  date: string;
  tags: string[];
  views: number;
  likes: number;
  fullDescription: string;
}

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectLightbox = ({ project, onClose }: ProjectLightboxProps) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!project) return null;

  const complexityColors: Record<string, string> = {
    beginner: 'bg-toxic-lime text-primary',
    intermediate: 'bg-toxic-gold text-primary',
    advanced: 'bg-toxic-magenta text-foreground',
    experimental: 'bg-toxic-orange text-foreground',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-card border-2 border-toxic-lime">
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 p-2 bg-destructive text-destructive-foreground hover:bg-toxic-magenta transition-smooth border-2 border-destructive hover:border-toxic-magenta"
          aria-label="Close lightbox"
        >
          <Icon name="XMarkIcon" size={24} />
        </button>

        <div className="grid lg:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <div className="relative overflow-hidden aspect-[4/3]">
              <AppImage
                src={project.image}
                alt={project.alt}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-3 right-3 px-3 py-1 ${complexityColors[project.complexity]} text-xs font-bold font-mono`}>
                {project.complexity.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface border-2 border-border">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Icon name="EyeIcon" size={20} className="text-toxic-lime" />
                  <span className="text-sm font-mono text-foreground">{project.views}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="HeartIcon" size={20} className="text-toxic-magenta" />
                  <span className="text-sm font-mono text-foreground">{project.likes}</span>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-toxic-lime text-primary font-bold text-sm hover:bg-toxic-gold transition-smooth">
                <Icon name="ShareIcon" size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{project.title}</h2>
              <p className="text-text-secondary">{project.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-surface border-2 border-border">
                <Icon name="TagIcon" size={20} className="text-toxic-lime" />
                <div>
                  <span className="text-xs text-text-secondary block">Category</span>
                  <span className="text-sm font-bold text-foreground">{project.category}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-surface border-2 border-border">
                <Icon name="WrenchScrewdriverIcon" size={20} className="text-toxic-gold" />
                <div>
                  <span className="text-xs text-text-secondary block">AI Tool</span>
                  <span className="text-sm font-bold text-foreground">{project.tool}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-surface border-2 border-border">
                <Icon name="CalendarIcon" size={20} className="text-toxic-magenta" />
                <div>
                  <span className="text-xs text-text-secondary block">Created</span>
                  <span className="text-sm font-bold text-foreground">{project.date}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center space-x-2">
                <Icon name="DocumentTextIcon" size={20} className="text-toxic-lime" />
                <span>Full Description</span>
              </h3>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center space-x-2">
                <Icon name="HashtagIcon" size={20} className="text-toxic-gold" />
                <span>Tags</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-surface text-text-secondary text-sm font-mono border border-border hover:border-toxic-lime transition-smooth"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLightbox;