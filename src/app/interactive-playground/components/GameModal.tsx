'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface GameModalProps {
  game: {
    id: number;
    title: string;
    iframeUrl: string;
    description: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const GameModal = ({ game, isOpen, onClose }: GameModalProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, isHydrated]);

  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-[90vh] bg-primary border-4 border-toxic-lime shadow-modal flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-toxic-lime bg-secondary">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-toxic-lime"></div>
            <h2 className="text-xl font-bold text-foreground font-cta">{game.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-foreground hover:text-toxic-lime hover:bg-surface transition-smooth border-2 border-transparent hover:border-toxic-lime"
            aria-label="Close game"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        {/* Game Content */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="w-full h-full bg-muted border-2 border-border">
            <iframe
              src={game.iframeUrl}
              title={game.title}
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-toxic-lime bg-secondary">
          <p className="text-sm text-text-secondary">{game.description}</p>
        </div>
      </div>
    </div>
  );
};

export default GameModal;