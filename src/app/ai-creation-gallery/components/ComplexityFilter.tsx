'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ComplexityFilterProps {
  selectedComplexity: string[];
  onComplexityChange: (complexity: string) => void;
}

const ComplexityFilter = ({ selectedComplexity, onComplexityChange }: ComplexityFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const complexityLevels = [
    { id: 'beginner', label: 'Beginner', icon: 'AcademicCapIcon', color: 'text-toxic-lime' },
    { id: 'intermediate', label: 'Intermediate', icon: 'BeakerIcon', color: 'text-toxic-gold' },
    { id: 'advanced', label: 'Advanced', icon: 'RocketLaunchIcon', color: 'text-toxic-magenta' },
    { id: 'experimental', label: 'Experimental', icon: 'BoltIcon', color: 'text-toxic-orange' },
  ];

  return (
    <div className="bg-card border-2 border-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-surface transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <Icon name="ChartBarIcon" size={20} className="text-toxic-magenta" />
          <h3 className="font-bold text-foreground">Complexity</h3>
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} 
          size={20} 
          className="text-text-secondary" 
        />
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-2">
          {complexityLevels.map((level) => (
            <label
              key={level.id}
              className="flex items-center space-x-3 p-3 hover:bg-surface cursor-pointer transition-smooth border-2 border-transparent hover:border-toxic-magenta group"
            >
              <input
                type="checkbox"
                checked={selectedComplexity.includes(level.id)}
                onChange={() => onComplexityChange(level.id)}
                className="w-5 h-5 accent-toxic-magenta cursor-pointer"
              />
              <Icon 
                name={level.icon as any} 
                size={18} 
                className={`${level.color} group-hover:text-foreground transition-smooth`} 
              />
              <span className="text-sm font-semibold text-text-secondary group-hover:text-foreground transition-smooth">
                {level.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplexityFilter;