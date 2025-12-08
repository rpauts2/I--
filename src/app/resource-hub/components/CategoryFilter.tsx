'use client';

import Icon from '@/components/ui/AppIcon';

interface CategoryFilterProps {
  categories: Array<{
    id: string;
    name: string;
    icon: string;
    count: number;
  }>;
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-bold font-cta transition-smooth border-2 ${
            activeCategory === category.id
              ? 'bg-toxic-lime text-primary border-toxic-lime shadow-toxic-lime'
              : 'bg-card text-text-secondary border-border hover:border-toxic-lime hover:text-foreground'
          }`}
        >
          <Icon name={category.icon as any} size={18} />
          <span>{category.name}</span>
          <span
            className={`px-2 py-0.5 text-xs font-bold font-mono ${
              activeCategory === category.id
                ? 'bg-primary text-toxic-lime' :'bg-muted text-text-secondary'
            }`}
          >
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;