'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'HomeIcon' },
    { label: 'AI Gallery', path: '/ai-creation-gallery', icon: 'PhotoIcon' },
    { label: 'Playground', path: '/interactive-playground', icon: 'BeakerIcon' },
    { label: 'Creator Lab', path: '/creator-s-lab', icon: 'SparklesIcon' },
    { label: 'Resources', path: '/resource-hub', icon: 'BookOpenIcon' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-primary border-b-2 border-toxic-lime ${className}`}>
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-toxic-lime flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-primary font-extrabold text-xl font-mono">AI</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-toxic-magenta"></div>
            </div>
            <span className="text-xl font-extrabold text-foreground tracking-tight hidden sm:block">
              AI Creator Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-text-secondary hover:text-foreground hover:bg-surface transition-smooth border-2 border-transparent hover:border-toxic-lime group"
              >
                <Icon name={item.icon as any} size={18} className="text-toxic-lime group-hover:text-toxic-gold transition-smooth" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/creator-s-lab"
              className="px-6 py-2.5 bg-toxic-lime text-primary font-bold text-sm font-cta hover:bg-toxic-gold transition-smooth shadow-toxic-lime hover:shadow-toxic-gold border-2 border-toxic-lime hover:border-toxic-gold"
            >
              Start Creating
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-foreground hover:bg-surface transition-smooth border-2 border-transparent hover:border-toxic-lime"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-secondary border-t-2 border-toxic-lime">
          <nav className="px-6 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-text-secondary hover:text-foreground hover:bg-surface transition-smooth border-2 border-transparent hover:border-toxic-lime"
              >
                <Icon name={item.icon as any} size={20} className="text-toxic-lime" />
                <span>{item.label}</span>
              </Link>
            ))}
            <Link
              href="/creator-s-lab"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-full px-6 py-3 mt-4 bg-toxic-lime text-primary font-bold text-sm font-cta hover:bg-toxic-gold transition-smooth shadow-toxic-lime hover:shadow-toxic-gold border-2 border-toxic-lime hover:border-toxic-gold"
            >
              Start Creating
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;