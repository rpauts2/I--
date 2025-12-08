'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ShareButtonsProps {
  gameTitle: string;
  gameId: number;
}

const ShareButtons = ({ gameTitle, gameId }: ShareButtonsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleShare = (platform: string) => {
    if (!isHydrated) return;

    const url = `${window.location.origin}/interactive-playground?game=${gameId}`;
    const text = `Попробуйте ${gameTitle} в AI Creator Hub!`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-text-secondary">Поделиться:</span>
      <button
        onClick={() => handleShare('twitter')}
        className="p-2 bg-card border-2 border-border hover:border-toxic-lime hover:bg-surface transition-smooth"
        aria-label="Share on Twitter"
      >
        <Icon name="ShareIcon" size={16} className="text-toxic-lime" />
      </button>
      <button
        onClick={() => handleShare('facebook')}
        className="p-2 bg-card border-2 border-border hover:border-toxic-lime hover:bg-surface transition-smooth"
        aria-label="Share on Facebook"
      >
        <Icon name="ShareIcon" size={16} className="text-toxic-lime" />
      </button>
      <button
        onClick={() => handleShare('telegram')}
        className="p-2 bg-card border-2 border-border hover:border-toxic-lime hover:bg-surface transition-smooth"
        aria-label="Share on Telegram"
      >
        <Icon name="PaperAirplaneIcon" size={16} className="text-toxic-lime" />
      </button>
      <button
        onClick={() => handleShare('copy')}
        className="p-2 bg-card border-2 border-border hover:border-toxic-lime hover:bg-surface transition-smooth relative"
        aria-label="Copy link"
      >
        <Icon name={copied ? 'CheckIcon' : 'LinkIcon'} size={16} className="text-toxic-lime" />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-toxic-lime text-primary text-xs font-bold whitespace-nowrap">
            Скопировано!
          </span>
        )}
      </button>
    </div>
  );
};

export default ShareButtons;