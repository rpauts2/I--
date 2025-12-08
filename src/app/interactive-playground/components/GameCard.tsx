'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface GameCardProps {
  game: {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    thumbnailAlt: string;
    category: string;
    plays: number;
    rating: number;
    iframeUrl: string;
    tags: string[];
  };
  onPlay: (gameId: number) => void;
  onRate: (gameId: number, rating: number) => void;
}

const GameCard = ({ game, onPlay, onRate }: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
    onRate(game.id, rating);
  };

  return (
    <div
      className="bg-card border-2 border-border hover:border-toxic-lime transition-smooth overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <AppImage
          src={game.thumbnail}
          alt={game.thumbnailAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        
        {/* Play Button Overlay */}
        <button
          onClick={() => onPlay(game.id)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
          aria-label={`Play ${game.title}`}
        >
          <div className="w-16 h-16 bg-toxic-lime flex items-center justify-center shadow-toxic-lime hover:bg-toxic-gold hover:shadow-toxic-gold transition-smooth">
            <Icon name="PlayIcon" size={32} className="text-primary ml-1" variant="solid" />
          </div>
        </button>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-primary border-2 border-toxic-magenta">
          <span className="text-xs font-bold text-toxic-magenta font-mono uppercase tracking-wider">
            {game.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-toxic-lime transition-smooth">
          {game.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
          {game.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {game.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-semibold text-text-secondary bg-muted border border-border hover:border-toxic-lime transition-smooth"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Stats & Rating */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          {/* Plays */}
          <div className="flex items-center space-x-2">
            <Icon name="PlayIcon" size={16} className="text-toxic-lime" />
            <span className="text-sm font-semibold text-text-secondary">
              {game.plays.toLocaleString('ru-RU')} plays
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                className="transition-smooth hover:scale-110"
                aria-label={`Rate ${star} stars`}
              >
                <Icon
                  name="StarIcon"
                  size={16}
                  variant={star <= (userRating || game.rating) ? 'solid' : 'outline'}
                  className={
                    star <= (userRating || game.rating)
                      ? 'text-toxic-gold' :'text-text-secondary hover:text-toxic-gold'
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;