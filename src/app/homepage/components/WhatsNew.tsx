'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Update {
  id: number;
  type: 'project' | 'experiment' | 'tool' | 'resource';
  title: string;
  description: string;
  date: string;
  icon: string;
  color: string;
  link: string;
}

const WhatsNew = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const updates: Update[] = [
    {
      id: 1,
      type: 'project',
      title: "Новый AI Логотип Проект",
      description: "Создан уникальный логотип для технологического стартапа используя Midjourney и Figma",
      date: "2025-12-05",
      icon: "SparklesIcon",
      color: "toxic-lime",
      link: "/ai-creation-gallery"
    },
    {
      id: 2,
      type: 'experiment',
      title: "Эксперимент с Генеративной Музыкой",
      description: "Исследование AI-генерации музыки для игровых саундтреков",
      date: "2025-12-04",
      icon: "BeakerIcon",
      color: "toxic-magenta",
      link: "/creator-s-lab"
    },
    {
      id: 3,
      type: 'tool',
      title: "Обновлен Промпт Генератор",
      description: "Добавлены новые шаблоны и улучшена точность генерации промптов",
      date: "2025-12-03",
      icon: "WrenchScrewdriverIcon",
      color: "toxic-gold",
      link: "/resource-hub"
    },
    {
      id: 4,
      type: 'resource',
      title: "Гайд по Stable Diffusion",
      description: "Подробное руководство по созданию качественных изображений",
      date: "2025-12-02",
      icon: "BookOpenIcon",
      color: "toxic-orange",
      link: "/resource-hub"
    }
  ];

  if (!isHydrated) {
    return (
      <section className="py-16 bg-secondary">
        <div className="w-full px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-12 bg-surface animate-pulse mb-12 max-w-md"></div>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-surface animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-secondary">
      <div className="w-full px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-extrabold text-foreground font-cta">
              Что <span className="text-toxic-gold">Нового</span>
            </h2>
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="ClockIcon" size={20} className="text-toxic-gold" />
              <span className="text-sm font-semibold font-accent">Последние обновления</span>
            </div>
          </div>

          <div className="space-y-6">
            {updates.map((update) => (
              <Link
                key={update.id}
                href={update.link}
                className="group block bg-card border-4 border-border hover:border-toxic-lime transition-smooth shadow-card hover:shadow-toxic-lime"
              >
                <div className="p-6 flex items-start space-x-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 bg-${update.color} flex items-center justify-center border-2 border-${update.color} group-hover:scale-110 transition-smooth`}>
                    <Icon name={update.icon as any} size={32} className="text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 bg-${update.color} text-primary text-xs font-bold font-accent border-2 border-${update.color}`}>
                            {update.type === 'project' && 'ПРОЕКТ'}
                            {update.type === 'experiment' && 'ЭКСПЕРИМЕНТ'}
                            {update.type === 'tool' && 'ИНСТРУМЕНТ'}
                            {update.type === 'resource' && 'РЕСУРС'}
                          </span>
                          <span className="text-xs text-text-secondary font-accent">
                            {new Date(update.date).toLocaleDateString('ru-RU', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        <h3 className="text-xl font-extrabold text-foreground mb-2 font-cta group-hover:text-toxic-lime transition-smooth">
                          {update.title}
                        </h3>
                        <p className="text-text-secondary text-sm">
                          {update.description}
                        </p>
                      </div>
                      <Icon 
                        name="ArrowRightIcon" 
                        size={24} 
                        className="flex-shrink-0 text-toxic-lime group-hover:translate-x-2 transition-smooth ml-4"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Subscribe CTA */}
          <div className="mt-12 p-8 bg-surface border-4 border-toxic-lime text-center">
            <Icon name="BellIcon" size={48} className="text-toxic-lime mx-auto mb-4" />
            <h3 className="text-2xl font-extrabold text-foreground mb-3 font-cta">
              Не Пропустите Обновления
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Подпишитесь на уведомления и будьте в курсе всех новых проектов, экспериментов и ресурсов
            </p>
            <button className="px-8 py-4 bg-toxic-lime text-primary font-bold text-lg font-cta hover:bg-toxic-gold transition-smooth shadow-toxic-lime hover:shadow-toxic-gold border-2 border-toxic-lime hover:border-toxic-gold">
              Подписаться
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNew;