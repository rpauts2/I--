'use client';

import { useState } from 'react';
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
}

interface ProjectCardProps {
  project: Project;
  onProjectClick: (project: Project) => void;
}

const ProjectCard = ({ project, onProjectClick }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const complexityColors: Record<string, string> = {
    beginner: 'bg-toxic-lime text-primary',
    intermediate: 'bg-toxic-gold text-primary',
    advanced: 'bg-toxic-magenta text-foreground',
    experimental: 'bg-toxic-orange text-foreground',
  };

  return (
    <div
      className="group bg-card border-2 border-border hover:border-toxic-lime transition-smooth cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onProjectClick(project)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <AppImage
          src={project.image}
          alt={project.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        
        <div className={`absolute top-3 right-3 px-3 py-1 ${complexityColors[project.complexity]} text-xs font-bold font-mono`}>
          {project.complexity.toUpperCase()}
        </div>

        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="flex items-center justify-between text-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="EyeIcon" size={16} className="text-toxic-lime" />
                <span className="text-xs font-mono">{project.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="HeartIcon" size={16} className="text-toxic-magenta" />
                <span className="text-xs font-mono">{project.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-foreground text-lg group-hover:text-toxic-lime transition-smooth line-clamp-1">
            {project.title}
          </h3>
          <Icon name="ArrowTopRightOnSquareIcon" size={18} className="text-text-secondary group-hover:text-toxic-lime transition-smooth flex-shrink-0 ml-2" />
        </div>

        <p className="text-sm text-text-secondary line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-surface text-text-secondary text-xs font-mono border border-border"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs font-mono text-text-secondary">{project.tool}</span>
          <span className="text-xs font-mono text-text-secondary">{project.date}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;