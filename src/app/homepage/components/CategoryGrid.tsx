'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
  color: string;
  image: string;
  alt: string;
  route: string;
  gradient: string;
}

const CategoryGrid = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const categories: Category[] = [
    {
      id: 1,
      name: "Галерея AI",
      icon: "PhotoIcon",
      count: 487,
      color: "toxic-lime",
      gradient: "from-toxic-lime to-emerald-400",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_106584dfb-1764689812608.png",
      alt: "Коллаж из разнообразных AI-сгенерированных изображений с яркими неоновыми цветами",
      route: "/ai-creation-gallery"
    },
    {
      id: 2,
      name: "Игровая Площадка",
      icon: "CubeIcon",
      count: 124,
      color: "toxic-magenta",
      gradient: "from-toxic-magenta to-pink-500",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_12905181b-1764785838618.png",
      alt: "Интерактивная 3D игровая сцена с яркими неоновыми элементами и футуристическим дизайном",
      route: "/interactive-playground"
    },
    {
      id: 3,
      name: "Лаборатория Создателя",
      icon: "BeakerIcon",
      count: 342,
      color: "toxic-gold",
      gradient: "from-toxic-gold to-yellow-400",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_189d1e76c-1764654293705.png",
      alt: "Рабочее пространство дизайнера с множеством экранов показывающих AI инструменты и креативные проекты",
      route: "/creator-s-lab"
    },
    {
      id: 4,
      name: "Центр Ресурсов",
      icon: "BookOpenIcon",
      count: 256,
      color: "toxic-orange",
      gradient: "from-toxic-orange to-orange-400",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16387ac39-1765109665579.png",
      alt: "Организованная библиотека цифровых ресурсов и инструментов для AI творчества",
      route: "/resource-hub"
    },
  ];

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  if (!isHydrated) {
    return (
      <section className="py-16 bg-secondary">
        <div className="w-full px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-12 bg-surface animate-pulse mb-12 max-w-md"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) =>
              <div key={i} className="h-80 bg-surface animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </section>);

  }

  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'backgroundScroll 20s linear infinite'
          }}
        ></div>
      </div>

      <div className="relative w-full px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-16">
            <div className="animate-fade-in-up">
              <h2 className="text-5xl font-extrabold text-foreground font-cta mb-2">
                Исследуйте <span className="text-toxic-lime relative inline-block">
                  Категории
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-toxic-lime animate-shimmer"></span>
                </span>
              </h2>
              <p className="text-text-secondary text-lg">Четыре мира креативных экспериментов</p>
            </div>
            <Link
              href="/ai-creation-gallery"
              className="group flex items-center space-x-2 px-6 py-3 bg-surface border-2 border-toxic-lime hover:bg-toxic-lime transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Смотреть всё</span>
              <Icon name="ArrowRightIcon" size={20} className="group-hover:translate-x-2 transition-transform text-toxic-lime group-hover:text-primary" />
            </Link>
          </div>

          {/* Enhanced Grid with Stagger Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={category.route}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative overflow-hidden border-4 border-border hover:border-toxic-lime transition-all duration-500 shadow-card hover:shadow-toxic-lime hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}></div>
                
                {/* Background Image with Enhanced Effects */}
                <div className="relative h-80 overflow-hidden">
                  {!loadedImages.has(category.id) && (
                    <div className="absolute inset-0 bg-surface animate-pulse"></div>
                  )}
                  <AppImage
                    src={category.image}
                    alt={category.alt}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      hoveredId === category.id ? 'scale-125 rotate-2' : 'scale-100 rotate-0'
                    } ${loadedImages.has(category.id) ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(category.id)}
                  />
                  
                  {/* Multi-layer Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-transparent transition-opacity duration-500 ${
                    hoveredId === category.id ? 'opacity-95' : 'opacity-80'
                  }`}></div>
                  
                  {/* Animated Corner Accent */}
                  <div className={`absolute top-0 right-0 w-0 h-0 border-t-[60px] border-r-[60px] transition-all duration-300 ${
                    hoveredId === category.id 
                      ? `border-t-${category.color} border-r-${category.color}` 
                      : 'border-t-transparent border-r-transparent'
                  }`}></div>
                </div>

                {/* Enhanced Content with Animations */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                  {/* Icon with Pulse Effect */}
                  <div className={`w-16 h-16 bg-${category.color} flex items-center justify-center mb-4 transition-all duration-500 border-2 border-${category.color} ${
                    hoveredId === category.id 
                      ? 'scale-110 rotate-12 shadow-[0_0_30px_rgba(16,185,129,0.6)]' 
                      : 'scale-100 rotate-0'
                  }`}>
                    <Icon 
                      name={category.icon as any} 
                      size={32} 
                      className={`text-primary transition-transform duration-300 ${
                        hoveredId === category.id ? 'scale-110' : 'scale-100'
                      }`}
                    />
                  </div>
                  
                  {/* Title with Gradient on Hover */}
                  <h3 className={`text-2xl font-extrabold mb-2 font-cta transition-all duration-300 ${
                    hoveredId === category.id 
                      ? `text-${category.color}` 
                      : 'text-foreground'
                  }`}>
                    {category.name}
                  </h3>
                  
                  {/* Stats Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 bg-${category.color} rounded-full animate-glow-pulse`}></div>
                      <span className="text-text-secondary font-accent text-sm font-semibold">
                        {category.count} проектов
                      </span>
                    </div>
                    <div className={`p-2 bg-surface/50 backdrop-blur-sm border-2 border-${category.color} transition-all duration-300 ${
                      hoveredId === category.id ? 'translate-x-2 scale-110' : 'translate-x-0 scale-100'
                    }`}>
                      <Icon
                        name="ArrowRightIcon"
                        size={20}
                        className={`text-${category.color}`}
                      />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-1 bg-surface/50 overflow-hidden">
                    <div 
                      className={`h-full bg-${category.color} transition-all duration-700 ease-out ${
                        hoveredId === category.id ? 'w-full' : 'w-0'
                      }`}
                    ></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="inline-block animate-bounce-subtle">
              <Icon name="ChevronDownIcon" size={32} className="text-toxic-lime" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;