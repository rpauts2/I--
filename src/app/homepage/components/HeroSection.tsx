'use client';

import { useState, useEffect, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CreationItem {
  id: number;
  title: string;
  category: string;
  image: string;
  alt: string;
  tool: string;
  date: string;
}

const HeroSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const featuredCreations: CreationItem[] = [
  {
    id: 1,
    title: "Неоновый Киберпанк Логотип",
    category: "Логотипы",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17adf3a53-1764837265088.png",
    alt: "Яркий неоновый логотип в стиле киберпанк с электрическими зелеными и пурпурными цветами на темном фоне",
    tool: "Midjourney",
    date: "2025-12-05"
  },
  {
    id: 2,
    title: "Интерактивная 3D Игра",
    category: "Игры",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12905181b-1764785838618.png",
    alt: "Красочная 3D игровая сцена с футуристическими элементами и яркими неоновыми акцентами",
    tool: "Unity + AI",
    date: "2025-12-04"
  },
  {
    id: 3,
    title: "Генеративное Искусство",
    category: "Искусство",
    image: "https://images.unsplash.com/photo-1614850523215-fdbdb473e226",
    alt: "Абстрактное генеративное искусство с плавными градиентами от зеленого к пурпурному и золотому",
    tool: "DALL-E 3",
    date: "2025-12-03"
  },
  {
    id: 4,
    title: "AI Веб-Дизайн",
    category: "Веб-сайты",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1638d3f29-1764645307453.png",
    alt: "Современный веб-дизайн интерфейса с темной темой и яркими токсичными цветовыми акцентами",
    tool: "Figma + AI",
    date: "2025-12-02"
  }];


  // Improved auto-play with pause on hover
  useEffect(() => {
    if (!isHydrated || !isAutoPlaying) return;

    const autoPlayInterval = setInterval(() => {
      setDirection('next');
      setCurrentSlide((prev) => (prev + 1) % featuredCreations.length);
    }, 5000);

    return () => clearInterval(autoPlayInterval);
  }, [isHydrated, isAutoPlaying, featuredCreations.length]);

  const nextSlide = useCallback(() => {
    if (!isHydrated) return;
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % featuredCreations.length);
    setIsAutoPlaying(false);
  }, [isHydrated, featuredCreations.length]);

  const prevSlide = useCallback(() => {
    if (!isHydrated) return;
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + featuredCreations.length) % featuredCreations.length);
    setIsAutoPlaying(false);
  }, [isHydrated, featuredCreations.length]);

  const goToSlide = useCallback((index: number) => {
    if (!isHydrated) return;
    setDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  }, [isHydrated, currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    if (!isHydrated) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHydrated, nextSlide, prevSlide]);

  if (!isHydrated) {
    return (
      <section className="relative min-h-screen bg-primary pt-24 pb-16">
        <div className="w-full px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-16 bg-surface animate-pulse mb-4"></div>
              <div className="h-8 bg-surface animate-pulse max-w-2xl mx-auto"></div>
            </div>
            <div className="relative h-[600px] bg-surface animate-pulse"></div>
          </div>
        </div>
      </section>);

  }

  const currentCreation = featuredCreations[currentSlide];

  return (
    <section 
      className="relative min-h-screen bg-primary pt-24 pb-16 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-toxic-lime rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-toxic-magenta rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-toxic-gold rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-toxic-orange rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative w-full px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Hero Text with Stagger Animation */}
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground mb-6 font-cta">
              <span className="inline-block animate-fade-in-up glitch-text">Цифровая</span>{' '}
              <span className="text-toxic-lime inline-block animate-fade-in-up glitch-text" style={{ animationDelay: '0.1s' }}>Алхимия</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Где человеческое творчество встречается с возможностями ИИ.
              Исследуйте живую лабораторию креативных экспериментов.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="group flex items-center space-x-2 px-4 py-2 bg-surface border-2 border-toxic-lime hover:bg-toxic-lime hover:scale-105 transition-all duration-300 cursor-pointer">
                <Icon name="SparklesIcon" size={20} className="text-toxic-lime group-hover:text-primary transition-colors" />
                <span className="text-sm font-semibold text-foreground group-hover:text-primary font-accent transition-colors">1,247 Проектов</span>
              </div>
              <div className="group flex items-center space-x-2 px-4 py-2 bg-surface border-2 border-toxic-magenta hover:bg-toxic-magenta hover:scale-105 transition-all duration-300 cursor-pointer">
                <Icon name="BeakerIcon" size={20} className="text-toxic-magenta group-hover:text-primary transition-colors" />
                <span className="text-sm font-semibold text-foreground group-hover:text-primary font-accent transition-colors">342 Эксперимента</span>
              </div>
              <div className="group flex items-center space-x-2 px-4 py-2 bg-surface border-2 border-toxic-gold hover:bg-toxic-gold hover:scale-105 transition-all duration-300 cursor-pointer">
                <Icon name="WrenchScrewdriverIcon" size={20} className="text-toxic-gold group-hover:text-primary transition-colors" />
                <span className="text-sm font-semibold text-foreground group-hover:text-primary font-accent transition-colors">28 Инструментов</span>
              </div>
            </div>
          </div>

          {/* Enhanced Carousel with Transition Effects */}
          <div className="relative">
            {/* Main Image with Slide Animation */}
            <div className="relative h-[500px] lg:h-[600px] overflow-hidden border-4 border-toxic-lime shadow-toxic-lime group">
              <div className={`absolute inset-0 transition-transform duration-700 ease-out ${
                direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'
              }`} key={currentSlide}>
                <AppImage
                  src={currentCreation.image}
                  alt={currentCreation.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
              
              {/* Progress Bar */}
              {isAutoPlaying && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-toxic-lime/30">
                  <div className="h-full bg-toxic-lime animate-progress-bar"></div>
                </div>
              )}
              
              {/* Enhanced Content Overlay with Animation */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-4 py-1.5 bg-toxic-lime text-primary text-xs font-bold font-accent border-2 border-toxic-lime hover:scale-105 transition-transform cursor-pointer">
                    {currentCreation.category}
                  </span>
                  <span className="px-4 py-1.5 bg-surface text-foreground text-xs font-semibold border-2 border-toxic-magenta hover:scale-105 transition-transform cursor-pointer">
                    {currentCreation.tool}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-3 font-cta hover:text-toxic-lime transition-colors">
                  {currentCreation.title}
                </h2>
                <p className="text-text-secondary text-sm font-accent flex items-center space-x-2">
                  <Icon name="CalendarIcon" size={16} className="text-toxic-lime" />
                  <span>Создано: {new Date(currentCreation.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </p>
              </div>
            </div>

            {/* Enhanced Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-primary/90 backdrop-blur-sm border-2 border-toxic-lime hover:bg-toxic-lime hover:scale-110 hover:rotate-[-5deg] text-foreground transition-all duration-300 flex items-center justify-center shadow-toxic-lime group"
              aria-label="Предыдущий слайд"
            >
              <Icon name="ChevronLeftIcon" size={28} className="group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-primary/90 backdrop-blur-sm border-2 border-toxic-lime hover:bg-toxic-lime hover:scale-110 hover:rotate-[5deg] text-foreground transition-all duration-300 flex items-center justify-center shadow-toxic-lime group"
              aria-label="Следующий слайд"
            >
              <Icon name="ChevronRightIcon" size={28} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Enhanced Dots Navigation with Thumbnails */}
            <div className="flex items-center justify-center space-x-3 mt-8">
              {featuredCreations.map((creation, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative transition-all duration-300 border-2 group ${
                    currentSlide === index
                      ? 'bg-toxic-lime border-toxic-lime w-12 h-4 scale-110' :'bg-transparent border-text-secondary hover:border-toxic-lime w-4 h-4 hover:scale-110'
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                  aria-current={currentSlide === index ? 'true' : 'false'}
                >
                  {/* Tooltip on hover */}
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-surface border-2 border-toxic-lime text-foreground text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {creation.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 px-3 py-1.5 bg-surface/90 backdrop-blur-sm border-2 border-toxic-lime text-foreground text-xs font-semibold">
              <Icon name={isAutoPlaying ? "PlayIcon" : "PauseIcon"} size={14} className="text-toxic-lime" />
              <span>{isAutoPlaying ? 'Авто' : 'Пауза'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;