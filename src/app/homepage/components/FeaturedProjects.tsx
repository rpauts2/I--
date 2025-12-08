'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tool: string;
  image: string;
  alt: string;
  likes: number;
  views: number;
  date: string;
  trending?: boolean;
}

const FeaturedProjects = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Все');
  const [likedProjects, setLikedProjects] = useState<Set<number>>(new Set());
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const filters = ['Все', 'Логотипы', 'Игры', 'Искусство', 'Веб-сайты', 'Trending'];

  const projects: Project[] = [
  {
    id: 1,
    title: "Токсичный Бренд Идентичность",
    description: "Полный набор брендинга с неоновыми элементами и футуристической эстетикой для технологического стартапа",
    category: "Логотипы",
    tool: "Midjourney + Figma",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16f6a9f8a-1764668406452.png",
    alt: "Современный логотип технологического бренда с яркими неоновыми зелеными и пурпурными акцентами на темном фоне",
    likes: 342,
    views: 1847,
    date: "2025-12-05",
    trending: true
  },
  {
    id: 2,
    title: "Киберпанк Раннер",
    description: "Бесконечная игра-раннер с процедурно генерируемыми уровнями и AI-управляемыми противниками",
    category: "Игры",
    tool: "Unity + ChatGPT",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_104abccaa-1764813785194.png",
    alt: "Скриншот киберпанк игры с неоновыми городскими пейзажами и футуристическими элементами интерфейса",
    likes: 567,
    views: 3421,
    date: "2025-12-04",
    trending: true
  },
  {
    id: 3,
    title: "Генеративные Портреты",
    description: "Серия AI-генерированных портретов исследующих границы между реальностью и цифровым искусством",
    category: "Искусство",
    tool: "DALL-E 3",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_106584dfb-1764689812608.png",
    alt: "Художественный AI-портрет с абстрактными элементами и яркими неоновыми цветовыми градиентами",
    likes: 891,
    views: 4532,
    date: "2025-12-03"
  },
  {
    id: 4,
    title: "Интерактивный Портфолио",
    description: "Персональный веб-сайт с 3D элементами и AI-управляемыми анимациями для креативного профессионала",
    category: "Веб-сайты",
    tool: "Next.js + Three.js",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_150ce4dec-1764997704463.png",
    alt: "Современный веб-дизайн портфолио с темной темой и интерактивными 3D элементами",
    likes: 423,
    views: 2156,
    date: "2025-12-02"
  },
  {
    id: 5,
    title: "Неоновая Типографика",
    description: "Экспериментальный проект исследующий динамическую типографику с AI-генерированными эффектами",
    category: "Искусство",
    tool: "Runway ML",
    image: "https://images.unsplash.com/photo-1681184819133-f02f835b2b9d",
    alt: "Яркая неоновая типографика с анимированными световыми эффектами на черном фоне",
    likes: 634,
    views: 2987,
    date: "2025-12-01"
  },
  {
    id: 6,
    title: "AI Логотип Генератор",
    description: "Интерактивный инструмент для создания уникальных логотипов используя машинное обучение",
    category: "Логотипы",
    tool: "Python + Stable Diffusion",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18805f4f1-1765109660570.png",
    alt: "Интерфейс AI инструмента для генерации логотипов с множеством вариантов дизайна",
    likes: 512,
    views: 3245,
    date: "2025-11-30"
  }];


  const filteredProjects = useMemo(() => {
    if (!isHydrated) return projects;
    if (activeFilter === 'Все') return projects;
    if (activeFilter === 'Trending') return projects.filter(p => p.trending);
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter, isHydrated]);

  const toggleLike = (projectId: number, e: React.MouseEvent) => {
    e.preventDefault();
    setLikedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  if (!isHydrated) {
    return (
      <section className="py-16 bg-primary">
        <div className="w-full px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-12 bg-surface animate-pulse mb-8 max-w-md"></div>
            <div className="flex space-x-4 mb-12">
              {[1, 2, 3, 4, 5].map((i) =>
              <div key={i} className="h-10 w-24 bg-surface animate-pulse"></div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) =>
              <div key={i} className="h-96 bg-surface animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </section>);

  }

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-toxic-lime rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative w-full px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-5xl font-extrabold text-foreground mb-3 font-cta">
              Избранные <span className="text-toxic-magenta relative inline-block">
                Проекты
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-toxic-magenta via-toxic-gold to-toxic-lime"></span>
              </span>
            </h2>
            <p className="text-text-secondary text-lg">Лучшие AI-креации нашего сообщества</p>
          </div>

          {/* Enhanced Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-14 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {filters.map((filter, index) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`group relative px-6 py-3 font-bold text-sm transition-all duration-300 border-2 overflow-hidden ${
                  activeFilter === filter
                    ? 'bg-toxic-lime text-primary border-toxic-lime shadow-toxic-lime scale-105'
                    : 'bg-transparent text-foreground border-border hover:border-toxic-lime hover:scale-105'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Shimmer effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                <span className="relative flex items-center space-x-2">
                  <span>{filter}</span>
                  {filter === 'Trending' && (
                    <Icon name="FireIcon" size={16} className="text-toxic-orange animate-bounce-subtle" />
                  )}
                  {activeFilter === filter && (
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* Enhanced Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.id}
                href="/ai-creation-gallery"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group bg-card border-4 border-border hover:border-toxic-magenta transition-all duration-500 shadow-card hover:shadow-toxic-magenta overflow-hidden hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Container with Enhanced Effects */}
                <div className="relative h-64 overflow-hidden">
                  {project.trending && (
                    <div className="absolute top-4 left-4 z-30 px-3 py-1.5 bg-toxic-orange text-primary text-xs font-bold font-accent border-2 border-toxic-orange flex items-center space-x-1 animate-glow-pulse">
                      <Icon name="FireIcon" size={14} />
                      <span>TRENDING</span>
                    </div>
                  )}
                  
                  <AppImage
                    src={project.image}
                    alt={project.alt}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      hoveredProject === project.id 
                        ? 'scale-125 rotate-2 brightness-110' :'scale-100 rotate-0 brightness-100'
                    }`}
                  />
                  
                  {/* Multi-layer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  
                  {/* Category Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1.5 bg-toxic-magenta text-primary text-xs font-bold font-accent border-2 border-toxic-magenta transition-transform duration-300 ${
                    hoveredProject === project.id ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
                  }`}>
                    {project.category}
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button
                      onClick={(e) => toggleLike(project.id, e)}
                      className={`p-3 bg-surface/90 backdrop-blur-sm border-2 hover:scale-110 transition-all duration-300 ${
                        likedProjects.has(project.id)
                          ? 'border-toxic-lime text-toxic-lime' :'border-border text-foreground hover:border-toxic-lime'
                      }`}
                      aria-label="Лайк проекту"
                    >
                      <Icon 
                        name={likedProjects.has(project.id) ? "HeartIcon" : "HeartIcon"} 
                        size={20}
                        className={likedProjects.has(project.id) ? 'fill-current' : ''}
                      />
                    </button>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="p-3 bg-surface/90 backdrop-blur-sm border-2 border-border text-foreground hover:border-toxic-magenta hover:scale-110 transition-all duration-300"
                      aria-label="Поделиться проектом"
                    >
                      <Icon name="ShareIcon" size={20} />
                    </button>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-6 relative">
                  {/* Animated Border Top */}
                  <div className={`absolute top-0 left-0 h-1 bg-toxic-magenta transition-all duration-500 ${
                    hoveredProject === project.id ? 'w-full' : 'w-0'
                  }`}></div>

                  <h3 className={`text-xl font-extrabold mb-2 font-cta transition-colors duration-300 ${
                    hoveredProject === project.id ? 'text-toxic-magenta' : 'text-foreground'
                  }`}>
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tool Badge with Icon */}
                  <div className="flex items-center space-x-2 mb-4 p-2 bg-surface border-l-4 border-toxic-gold">
                    <Icon name="WrenchScrewdriverIcon" size={16} className="text-toxic-gold" />
                    <span className="text-xs font-semibold text-foreground font-accent">
                      {project.tool}
                    </span>
                  </div>

                  {/* Enhanced Stats */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-border">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => toggleLike(project.id, e)}
                        className="group/like flex items-center space-x-1 hover:scale-110 transition-transform"
                      >
                        <Icon 
                          name="HeartIcon" 
                          size={18} 
                          className={`transition-all ${
                            likedProjects.has(project.id)
                              ? 'text-toxic-lime fill-current scale-110' :'text-toxic-lime group-hover/like:scale-110'
                          }`}
                        />
                        <span className={`text-xs font-semibold font-accent ${
                          likedProjects.has(project.id) ? 'text-toxic-lime' : 'text-foreground'
                        }`}>
                          {project.likes + (likedProjects.has(project.id) ? 1 : 0)}
                        </span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <Icon name="EyeIcon" size={18} className="text-text-secondary" />
                        <span className="text-xs font-semibold text-foreground font-accent">
                          {project.views}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="ClockIcon" size={16} className="text-text-secondary" />
                        <span className="text-xs text-text-secondary font-accent">
                          {new Date(project.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    </div>
                    <div className={`p-2 border-2 border-toxic-magenta transition-all duration-300 ${
                      hoveredProject === project.id 
                        ? 'translate-x-2 bg-toxic-magenta scale-110' :'translate-x-0 bg-transparent scale-100'
                    }`}>
                      <Icon
                        name="ArrowRightIcon"
                        size={18}
                        className={hoveredProject === project.id ? 'text-primary' : 'text-toxic-magenta'}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Enhanced View All Button */}
          <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/ai-creation-gallery"
              className="group inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-toxic-magenta to-toxic-gold text-primary font-bold text-lg font-cta hover:from-toxic-gold hover:to-toxic-lime transition-all duration-500 shadow-toxic-magenta hover:shadow-toxic-gold border-2 border-toxic-magenta hover:border-toxic-gold hover:scale-105 relative overflow-hidden"
            >
              {/* Animated shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
              <span className="relative">Смотреть Все Проекты</span>
              <Icon name="ArrowRightIcon" size={24} className="relative group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;