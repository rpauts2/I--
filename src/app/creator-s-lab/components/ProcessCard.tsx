import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface ProcessCardProps {
  process: ProcessStep;
  onViewDetails: (id: number) => void;
}

const ProcessCard = ({ process, onViewDetails }: ProcessCardProps) => {
  const difficultyColors = {
    Beginner: 'bg-toxic-lime text-primary',
    Intermediate: 'bg-toxic-gold text-primary',
    Advanced: 'bg-toxic-magenta text-foreground',
  };

  return (
    <div className="bg-card border-2 border-border hover:border-toxic-lime transition-smooth group">
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={process.image}
          alt={process.alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
        />
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <span className={`px-3 py-1 text-xs font-bold ${difficultyColors[process.difficulty]}`}>
            {process.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground group-hover:text-toxic-lime transition-smooth">
            {process.title}
          </h3>
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="ClockIcon" size={16} />
            <span className="text-xs font-semibold">{process.duration}</span>
          </div>
        </div>
        
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {process.description}
        </p>
        
        <button
          onClick={() => onViewDetails(process.id)}
          className="w-full px-4 py-2 bg-toxic-lime text-primary font-bold text-sm hover:bg-toxic-gold transition-smooth border-2 border-toxic-lime hover:border-toxic-gold flex items-center justify-center space-x-2"
        >
          <span>View Process</span>
          <Icon name="ArrowRightIcon" size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProcessCard;