'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CTASection = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className="py-24 bg-secondary">
        <div className="w-full px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-64 bg-surface animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-toxic-lime rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-toxic-magenta rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative w-full px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary border-4 border-toxic-lime p-12 lg:p-16 text-center shadow-toxic-lime">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-toxic-lime flex items-center justify-center border-2 border-toxic-lime">
                <Icon name="RocketLaunchIcon" size={48} className="text-primary" />
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-6 font-cta">
              Готовы Начать <span className="text-toxic-lime">Создавать?</span>
            </h2>

            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              Присоединяйтесь к цифровой лаборатории и начните создавать удивительные проекты с помощью AI. Исследуйте инструменты, изучайте техники и делитесь своими творениями.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/creator-s-lab"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-toxic-lime text-primary font-bold text-lg font-cta hover:bg-toxic-gold transition-smooth shadow-toxic-lime hover:shadow-toxic-gold border-2 border-toxic-lime hover:border-toxic-gold"
              >
                <span>Начать Создавать</span>
                <Icon name="ArrowRightIcon" size={24} />
              </Link>

              <Link
                href="/resource-hub"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-transparent text-foreground font-bold text-lg font-cta hover:bg-surface transition-smooth border-2 border-foreground hover:border-toxic-lime"
              >
                <span>Изучить Ресурсы</span>
                <Icon name="BookOpenIcon" size={24} />
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-12 pt-8 border-t-2 border-border">
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="flex items-center space-x-2">
                  <Icon name="UserGroupIcon" size={24} className="text-toxic-lime" />
                  <span className="text-text-secondary font-accent">
                    <span className="text-foreground font-bold">2,500+</span> Подписчиков
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="HeartIcon" size={24} className="text-toxic-magenta" />
                  <span className="text-text-secondary font-accent">
                    <span className="text-foreground font-bold">15,000+</span> Лайков
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="ChatBubbleLeftRightIcon" size={24} className="text-toxic-gold" />
                  <span className="text-text-secondary font-accent">
                    <span className="text-foreground font-bold">3,200+</span> Комментариев
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;