'use client';

import Icon from '@/components/ui/AppIcon';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: FilterBarProps) => {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Icon
          name="MagnifyingGlassIcon"
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск игр и интерактивных проектов..."
          className="w-full pl-12 pr-4 py-3 bg-card text-foreground border-2 border-border focus:border-toxic-lime focus:outline-none transition-smooth placeholder:text-text-secondary"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 text-sm font-semibold border-2 transition-smooth ${
              selectedCategory === category
                ? 'bg-toxic-lime text-primary border-toxic-lime shadow-toxic-lime'
                : 'bg-card text-text-secondary border-border hover:border-toxic-lime hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-text-secondary">Сортировка:</span>
        <div className="flex gap-2">
          {['Популярные', 'Новые', 'Рейтинг'].map((option) => (
            <button
              key={option}
              onClick={() => onSortChange(option)}
              className={`px-3 py-1.5 text-sm font-semibold border-2 transition-smooth ${
                sortBy === option
                  ? 'bg-toxic-magenta text-foreground border-toxic-magenta'
                  : 'bg-card text-text-secondary border-border hover:border-toxic-magenta hover:text-foreground'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;