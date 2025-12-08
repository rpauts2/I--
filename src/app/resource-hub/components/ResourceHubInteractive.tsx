'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import ResourceCard from './ResourceCard';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import StatsOverview from './StatsOverview';
import PremiumBanner from './PremiumBanner';
import EmailCaptureModal from './EmailCaptureModal';
import ResourceRequestForm from './ResourceRequestForm';

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  image: string;
  alt: string;
  downloads: number;
  rating: number;
  size: string;
  format: string;
  tags: string[];
  isPremium: boolean;
}

const ResourceHubInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    type: 'Все типы',
    format: 'Все форматы',
    sort: 'popular'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const categories = [
  { id: 'all', name: 'Все ресурсы', icon: 'Squares2X2Icon', count: 156 },
  { id: 'prompts', name: 'Промпты', icon: 'ChatBubbleLeftRightIcon', count: 48 },
  { id: 'templates', name: 'Шаблоны', icon: 'DocumentDuplicateIcon', count: 32 },
  { id: 'tools', name: 'Инструменты', icon: 'WrenchScrewdriverIcon', count: 24 },
  { id: 'tutorials', name: 'Туториалы', icon: 'AcademicCapIcon', count: 28 },
  { id: 'workflows', name: 'Воркфлоу', icon: 'ArrowPathIcon', count: 24 }];


  const stats = [
  { label: 'Всего ресурсов', value: '156', icon: 'FolderIcon', color: 'toxic-lime' },
  { label: 'Скачиваний', value: '12.5K', icon: 'ArrowDownTrayIcon', color: 'toxic-magenta' },
  { label: 'Активных пользователей', value: '3.2K', icon: 'UsersIcon', color: 'toxic-gold' },
  { label: 'Средний рейтинг', value: '4.8', icon: 'StarIcon', color: 'toxic-orange' }];


  const mockResources: Resource[] = [
  {
    id: 1,
    title: 'Мастер-промпт для генерации логотипов',
    description: 'Профессиональный промпт для создания уникальных логотипов с помощью AI. Включает 50+ вариаций стилей и детальные инструкции.',
    category: 'Промпты',
    type: 'Промпт',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16cd03f7e-1764695172441.png",
    alt: 'Colorful abstract logo designs displayed on dark background with neon accents',
    downloads: 2847,
    rating: 4.9,
    size: '2.4 МБ',
    format: 'PDF',
    tags: ['логотипы', 'брендинг', 'дизайн'],
    isPremium: false
  },
  {
    id: 2,
    title: 'Шаблон лендинга для AI-продуктов',
    description: 'Готовый HTML/CSS шаблон с современным дизайном, оптимизированный для конверсии. Полностью адаптивный и легко кастомизируемый.',
    category: 'Шаблоны',
    type: 'Шаблон',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15e5f82ff-1764696883262.png",
    alt: 'Modern website landing page mockup with vibrant gradient colors on laptop screen',
    downloads: 1923,
    rating: 4.7,
    size: '8.1 МБ',
    format: 'ZIP',
    tags: ['веб-дизайн', 'лендинг', 'конверсия'],
    isPremium: true
  },
  {
    id: 3,
    title: 'AI Image Upscaler - Инструмент увеличения',
    description: 'Скрипт для автоматического увеличения изображений с сохранением качества. Поддержка пакетной обработки и различных форматов.',
    category: 'Инструменты',
    type: 'Инструмент',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_129485873-1764904722437.png",
    alt: 'Digital image enhancement tool interface showing before and after comparison',
    downloads: 3156,
    rating: 4.8,
    size: '15.3 МБ',
    format: 'EXE',
    tags: ['обработка', 'изображения', 'AI'],
    isPremium: false
  },
  {
    id: 4,
    title: 'Полный гайд по Midjourney v6',
    description: 'Исчерпывающее руководство по работе с Midjourney v6. Включает 100+ примеров промптов, советы по стилизации и оптимизации.',
    category: 'Туториалы',
    type: 'Туториал',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_195288152-1764725375091.png",
    alt: 'Open tutorial book with colorful AI-generated artwork examples on pages',
    downloads: 4521,
    rating: 5.0,
    size: '45.7 МБ',
    format: 'PDF',
    tags: ['midjourney', 'обучение', 'промпты'],
    isPremium: true
  },
  {
    id: 5,
    title: 'Воркфлоу для создания персонажей',
    description: 'Пошаговый процесс создания уникальных персонажей с помощью AI. От концепта до финальной визуализации.',
    category: 'Воркфлоу',
    type: 'Воркфлоу',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1666cfd72-1765109661522.png",
    alt: 'Character design workflow diagram with multiple AI-generated character variations',
    downloads: 2134,
    rating: 4.6,
    size: '12.8 МБ',
    format: 'PDF',
    tags: ['персонажи', 'концепт-арт', 'процесс'],
    isPremium: false
  },
  {
    id: 6,
    title: 'Коллекция промптов для архитектуры',
    description: 'Специализированная коллекция промптов для генерации архитектурных концептов. 200+ готовых промптов с примерами.',
    category: 'Промпты',
    type: 'Промпт',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19e6c1a3b-1764655343347.png",
    alt: 'Futuristic architectural designs and building concepts rendered in AI',
    downloads: 1687,
    rating: 4.7,
    size: '5.2 МБ',
    format: 'PDF',
    tags: ['архитектура', 'дизайн', 'концепты'],
    isPremium: true
  }];


  const filters = {
    types: ['Все типы', 'Промпт', 'Шаблон', 'Инструмент', 'Туториал', 'Воркфлоу'],
    formats: ['Все форматы', 'PDF', 'ZIP', 'EXE', 'JSON', 'TXT'],
    sortOptions: [
    { value: 'popular', label: 'Популярные' },
    { value: 'recent', label: 'Новые' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'downloads', label: 'По скачиваниям' }]

  };

  const handleDownload = (resourceId: number) => {
    const resource = mockResources.find((r) => r.id === resourceId);
    if (resource) {
      setSelectedResource(resource);
      setIsModalOpen(true);
    }
  };

  const handleEmailSubmit = (email: string) => {
    console.log('Email submitted:', email);
    setIsModalOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleSubscribe = () => {
    console.log('Premium subscription initiated');
    alert('Функция подписки будет доступна в ближайшее время!');
  };

  const handleResourceRequest = (request: {title: string;description: string;category: string;}) => {
    console.log('Resource request:', request);
    alert('Спасибо за ваш запрос! Мы рассмотрим его в ближайшее время.');
  };

  const filteredResources = mockResources.filter((resource) => {
    const matchesCategory = activeCategory === 'all' || resource.category === categories.find((c) => c.id === activeCategory)?.name;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeFilters.type === 'Все типы' || resource.type === activeFilters.type;
    const matchesFormat = activeFilters.format === 'Все форматы' || resource.format === activeFilters.format;
    return matchesCategory && matchesSearch && matchesType && matchesFormat;
  });

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icon name="ArrowPathIcon" size={48} className="text-toxic-lime animate-spin mx-auto" />
          <p className="text-text-secondary font-semibold">Загрузка ресурсов...</p>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      {/* Success Message */}
      {showSuccessMessage &&
      <div className="fixed top-20 right-4 z-50 bg-toxic-lime text-primary px-6 py-4 border-2 border-primary shadow-toxic-lime animate-pulse">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircleIcon" size={24} variant="solid" />
            <span className="font-bold">Ссылка для скачивания отправлена на ваш email!</span>
          </div>
        </div>
      }

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 lg:px-8 border-b-2 border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-toxic-lime/10 border-2 border-toxic-lime">
              <Icon name="FolderIcon" size={20} className="text-toxic-lime" />
              <span className="text-sm font-bold text-toxic-lime font-cta uppercase tracking-wider">
                ХРАНИЛИЩЕ РЕСУРСОВ
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Инструменты для <span className="text-toxic-lime">AI-творчества</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Коллекция промптов, шаблонов, инструментов и туториалов для создания с помощью искусственного интеллекта
            </p>
          </div>

          {/* Stats */}
          <StatsOverview stats={stats} />
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 px-6 lg:px-8 bg-card border-b-2 border-border">
        <div className="max-w-7xl mx-auto space-y-6">
          <SearchBar onSearch={setSearchQuery} />
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory} />

        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1 space-y-6">
              <FilterPanel
                filters={filters}
                activeFilters={activeFilters}
                onFilterChange={(filterType, value) =>
                setActiveFilters({ ...activeFilters, [filterType]: value })
                } />

              <ResourceRequestForm onSubmit={handleResourceRequest} />
            </div>

            {/* Resources Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-text-secondary font-semibold">
                  Найдено <span className="text-foreground font-bold">{filteredResources.length}</span> ресурсов
                </p>
              </div>

              {filteredResources.length > 0 ?
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResources.map((resource) =>
                <ResourceCard key={resource.id} resource={resource} onDownload={handleDownload} />
                )}
                </div> :

              <div className="text-center py-16 bg-card border-2 border-border">
                  <Icon name="FolderOpenIcon" size={64} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Ресурсы не найдены</h3>
                  <p className="text-text-secondary">Попробуйте изменить параметры поиска или фильтры</p>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      {/* Premium Banner */}
      <section className="py-12">
        <PremiumBanner onSubscribe={handleSubscribe} />
      </section>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resourceTitle={selectedResource?.title || ''}
        onSubmit={handleEmailSubmit} />

    </div>);

};

export default ResourceHubInteractive;