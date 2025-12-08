'use client';

import Icon from '@/components/ui/AppIcon';

interface FilterPanelProps {
  filters: {
    types: string[];
    formats: string[];
    sortOptions: Array<{ value: string; label: string }>;
  };
  activeFilters: {
    type: string;
    format: string;
    sort: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
}

const FilterPanel = ({ filters, activeFilters, onFilterChange }: FilterPanelProps) => {
  return (
    <div className="bg-card border-2 border-border p-6 space-y-6">
      {/* Type Filter */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="FunnelIcon" size={16} className="text-toxic-lime" />
          <span>ТИП РЕСУРСА</span>
        </h3>
        <div className="space-y-2">
          {filters.types.map((type) => (
            <button
              key={type}
              onClick={() => onFilterChange('type', type)}
              className={`w-full text-left px-3 py-2 text-sm font-semibold transition-smooth border ${
                activeFilters.type === type
                  ? 'bg-toxic-lime text-primary border-toxic-lime' :'bg-muted text-text-secondary border-border hover:border-toxic-lime hover:text-foreground'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Format Filter */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="DocumentIcon" size={16} className="text-toxic-magenta" />
          <span>ФОРМАТ</span>
        </h3>
        <div className="space-y-2">
          {filters.formats.map((format) => (
            <button
              key={format}
              onClick={() => onFilterChange('format', format)}
              className={`w-full text-left px-3 py-2 text-sm font-semibold transition-smooth border ${
                activeFilters.format === format
                  ? 'bg-toxic-magenta text-primary border-toxic-magenta' :'bg-muted text-text-secondary border-border hover:border-toxic-magenta hover:text-foreground'
              }`}
            >
              {format}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="ArrowsUpDownIcon" size={16} className="text-toxic-gold" />
          <span>СОРТИРОВКА</span>
        </h3>
        <select
          value={activeFilters.sort}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          className="w-full px-3 py-2.5 bg-input text-foreground border-2 border-border focus:border-toxic-gold focus:outline-none transition-smooth font-semibold text-sm"
        >
          {filters.sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;