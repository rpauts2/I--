'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ResourceRequestFormProps {
  onSubmit: (request: { title: string; description: string; category: string }) => void;
}

const ResourceRequestForm = ({ onSubmit }: ResourceRequestFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Промпты',
  });

  const categories = ['Промпты', 'Шаблоны', 'Инструменты', 'Туториалы', 'Другое'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', description: '', category: 'Промпты' });
    setIsExpanded(false);
  };

  return (
    <div className="bg-card border-2 border-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-muted transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-toxic-magenta/10 border-2 border-toxic-magenta">
            <Icon name="LightBulbIcon" size={24} className="text-toxic-magenta" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-foreground">Запросить ресурс</h3>
            <p className="text-sm text-text-secondary">Нужен специфический инструмент или шаблон?</p>
          </div>
        </div>
        <Icon
          name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
          size={24}
          className="text-text-secondary"
        />
      </button>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4 border-t-2 border-border">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
              Название ресурса
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Например: Промпт для генерации логотипов"
              required
              className="w-full px-4 py-3 bg-input text-foreground placeholder:text-text-secondary border-2 border-border focus:border-toxic-magenta focus:outline-none transition-smooth font-semibold"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-foreground mb-2">
              Категория
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-input text-foreground border-2 border-border focus:border-toxic-magenta focus:outline-none transition-smooth font-semibold"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
              Описание
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Опишите, что вам нужно и как вы планируете это использовать..."
              required
              rows={4}
              className="w-full px-4 py-3 bg-input text-foreground placeholder:text-text-secondary border-2 border-border focus:border-toxic-magenta focus:outline-none transition-smooth font-semibold resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3.5 bg-toxic-magenta text-primary font-bold font-cta hover:bg-toxic-gold transition-smooth border-2 border-toxic-magenta hover:border-toxic-gold shadow-toxic-magenta hover:shadow-toxic-gold flex items-center justify-center space-x-2"
          >
            <span>ОТПРАВИТЬ ЗАПРОС</span>
            <Icon name="PaperAirplaneIcon" size={20} />
          </button>
        </form>
      )}
    </div>
  );
};

export default ResourceRequestForm;