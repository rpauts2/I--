'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
  onClearAll: () => void;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategories, 
  onCategoryChange,
  onClearAll 
}: CategoryFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-card border-2 border-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-surface transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <Icon name="FunnelIcon" size={20} className="text-toxic-lime" />
          <h3 className="font-bold text-foreground">Categories</h3>
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} 
          size={20} 
          className="text-text-secondary" 
        />
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center justify-between p-3 hover:bg-surface cursor-pointer transition-smooth border-2 border-transparent hover:border-toxic-lime group"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => onCategoryChange(category.id)}
                  className="w-5 h-5 accent-toxic-lime cursor-pointer"
                />
                <Icon 
                  name={category.icon as any} 
                  size={18} 
                  className="text-toxic-lime group-hover:text-toxic-gold transition-smooth" 
                />
                <span className="text-sm font-semibold text-text-secondary group-hover:text-foreground transition-smooth">
                  {category.name}
                </span>
              </div>
              <span className="text-xs font-mono text-text-secondary bg-surface px-2 py-1">
                {category.count}
              </span>
            </label>
          ))}

          {selectedCategories.length > 0 && (
            <button
              onClick={onClearAll}
              className="w-full mt-4 px-4 py-2 bg-destructive text-destructive-foreground font-bold text-sm hover:bg-toxic-magenta transition-smooth border-2 border-destructive hover:border-toxic-magenta"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;