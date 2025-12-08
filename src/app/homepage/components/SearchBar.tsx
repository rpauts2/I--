'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchSuggestion {
  id: number;
  text: string;
  category: string;
  icon: string;
}

const SearchBar = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const suggestions: SearchSuggestion[] = [
    { id: 1, text: "Неоновые логотипы", category: "Логотипы", icon: "SparklesIcon" },
    { id: 2, text: "3D игры", category: "Игры", icon: "CubeIcon" },
    { id: 3, text: "Генеративное искусство", category: "Искусство", icon: "PaintBrushIcon" },
    { id: 4, text: "AI веб-дизайн", category: "Веб-сайты", icon: "GlobeAltIcon" },
    { id: 5, text: "Midjourney промпты", category: "Ресурсы", icon: "CommandLineIcon" },
    { id: 6, text: "Интерактивные эксперименты", category: "Эксперименты", icon: "BeakerIcon" }
  ];

  const filteredSuggestions = isHydrated && searchQuery.length > 0
    ? suggestions.filter(s => 
        s.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : suggestions.slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHydrated || !searchQuery.trim()) return;
    console.log('Поиск:', searchQuery);
  };

  const handleSuggestionClick = (text: string) => {
    if (!isHydrated) return;
    setSearchQuery(text);
    setShowSuggestions(false);
  };

  if (!isHydrated) {
    return (
      <div className="w-full max-w-3xl mx-auto mb-16">
        <div className="h-16 bg-surface animate-pulse border-2 border-border"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mb-16 relative">
      <form onSubmit={handleSearch} className="relative">
        <div className={`relative border-4 transition-smooth ${
          isFocused ? 'border-toxic-lime shadow-toxic-lime' : 'border-border'
        }`}>
          <Icon 
            name="MagnifyingGlassIcon" 
            size={24} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder="Поиск проектов, инструментов, экспериментов..."
            className="w-full pl-14 pr-14 py-4 bg-secondary text-foreground placeholder-text-secondary focus:outline-none text-lg font-medium"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-toxic-lime text-primary font-bold text-sm hover:bg-toxic-gold transition-smooth border-2 border-toxic-lime hover:border-toxic-gold"
            aria-label="Поиск"
          >
            <Icon name="ArrowRightIcon" size={20} />
          </button>
        </div>
      </form>

      {/* Autocomplete Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-secondary border-4 border-toxic-lime shadow-toxic-lime z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="px-4 py-2 text-xs font-bold text-text-secondary font-accent">
              ПОПУЛЯРНЫЕ ЗАПРОСЫ
            </div>
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.text)}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-surface transition-smooth border-2 border-transparent hover:border-toxic-lime text-left"
              >
                <Icon name={suggestion.icon as any} size={20} className="text-toxic-lime" />
                <div className="flex-1">
                  <div className="text-foreground font-semibold">{suggestion.text}</div>
                  <div className="text-text-secondary text-xs font-accent">{suggestion.category}</div>
                </div>
                <Icon name="ArrowRightIcon" size={16} className="text-text-secondary" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;