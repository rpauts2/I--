'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search creations..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Icon 
          name="MagnifyingGlassIcon" 
          size={20} 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-input text-foreground border-2 border-border focus:border-toxic-lime focus:outline-none transition-smooth font-semibold"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground transition-smooth"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;