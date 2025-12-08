import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Tutorial {
  id: number;
  title: string;
  duration: string;
  views: number;
  thumbnail: string;
  alt: string;
  category: string;
}

interface VideoTutorialProps {
  tutorial: Tutorial;
  onPlay: (id: number) => void;
}

const VideoTutorial = ({ tutorial, onPlay }: VideoTutorialProps) => {
  return (
    <div className="bg-card border-2 border-border hover:border-toxic-lime transition-smooth group">
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={tutorial.thumbnail}
          alt={tutorial.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
          <button
            onClick={() => onPlay(tutorial.id)}
            className="w-16 h-16 bg-toxic-lime flex items-center justify-center hover:bg-toxic-gold transition-smooth"
            aria-label={`Play ${tutorial.title}`}
          >
            <Icon name="PlayIcon" size={32} variant="solid" className="text-primary ml-1" />
          </button>
        </div>
        <div className="absolute bottom-4 right-4 px-2 py-1 bg-black bg-opacity-80 text-foreground text-xs font-bold">
          {tutorial.duration}
        </div>
      </div>
      
      <div className="p-4">
        <span className="inline-block px-2 py-1 bg-surface text-toxic-lime text-xs font-semibold border border-toxic-lime mb-2">
          {tutorial.category}
        </span>
        
        <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2 group-hover:text-toxic-lime transition-smooth">
          {tutorial.title}
        </h3>
        
        <div className="flex items-center space-x-1 text-text-secondary">
          <Icon name="EyeIcon" size={14} />
          <span className="text-xs font-semibold">{tutorial.views.toLocaleString()} views</span>
        </div>
      </div>
    </div>
  );
};

export default VideoTutorial;