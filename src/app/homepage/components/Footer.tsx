'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const Footer = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerLinks = {
    explore: [
      { label: 'Галерея AI', path: '/ai-creation-gallery' },
      { label: 'Игровая Площадка', path: '/interactive-playground' },
      { label: 'Лаборатория', path: '/creator-s-lab' },
      { label: 'Ресурсы', path: '/resource-hub' }
    ],
    social: [
      { label: 'GitHub', icon: 'CodeBracketIcon', url: '#' },
      { label: 'Twitter', icon: 'ChatBubbleLeftRightIcon', url: '#' },
      { label: 'Instagram', icon: 'PhotoIcon', url: '#' },
      { label: 'YouTube', icon: 'VideoCameraIcon', url: '#' }
    ]
  };

  if (!isHydrated) {
    return (
      <footer className="bg-primary border-t-4 border-toxic-lime py-12">
        <div className="w-full px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-32 bg-surface animate-pulse"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-primary border-t-4 border-toxic-lime">
      <div className="w-full px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <Link href="/homepage" className="flex items-center space-x-3 mb-4 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-toxic-lime flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <span className="text-primary font-extrabold text-2xl font-mono">AI</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-toxic-magenta"></div>
                </div>
                <span className="text-2xl font-extrabold text-foreground tracking-tight">
                  AI Creator Hub
                </span>
              </Link>
              <p className="text-text-secondary text-sm mb-6">
                Цифровая лаборатория креативных экспериментов. Где человеческое творчество встречается с возможностями искусственного интеллекта.
              </p>
              <div className="flex items-center space-x-4">
                {footerLinks.social.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    className="w-10 h-10 bg-surface border-2 border-border hover:border-toxic-lime flex items-center justify-center transition-smooth group"
                    aria-label={social.label}
                  >
                    <Icon 
                      name={social.icon as any} 
                      size={20} 
                      className="text-text-secondary group-hover:text-toxic-lime transition-smooth"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-extrabold text-foreground mb-4 font-cta">
                Исследовать
              </h3>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-text-secondary hover:text-toxic-lime transition-smooth flex items-center space-x-2 group"
                    >
                      <Icon 
                        name="ArrowRightIcon" 
                        size={16} 
                        className="opacity-0 group-hover:opacity-100 transition-smooth"
                      />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-extrabold text-foreground mb-4 font-cta">
                Подписаться
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Получайте обновления о новых проектах и экспериментах
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-2 bg-secondary text-foreground placeholder-text-secondary border-2 border-border focus:border-toxic-lime focus:outline-none transition-smooth"
                />
                <button className="px-4 py-2 bg-toxic-lime text-primary hover:bg-toxic-gold transition-smooth border-2 border-toxic-lime hover:border-toxic-gold">
                  <Icon name="PaperAirplaneIcon" size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t-2 border-border">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-text-secondary text-sm font-accent">
                © {currentYear} AI Creator Hub. Все права защищены.
              </p>
              <div className="flex items-center space-x-6">
                <Link href="#" className="text-text-secondary hover:text-toxic-lime transition-smooth text-sm">
                  Политика конфиденциальности
                </Link>
                <Link href="#" className="text-text-secondary hover:text-toxic-lime transition-smooth text-sm">
                  Условия использования
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;