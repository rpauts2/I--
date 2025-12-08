import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Experiment {
  id: number;
  title: string;
  date: string;
  status: 'Success' | 'In Progress' | 'Failed';
  description: string;
  image: string;
  alt: string;
  learnings: string[];
}

interface ExperimentCardProps {
  experiment: Experiment;
  onViewDetails: (id: number) => void;
}

const ExperimentCard = ({ experiment, onViewDetails }: ExperimentCardProps) => {
  const statusConfig = {
    Success: { color: 'bg-toxic-lime text-primary', icon: 'CheckCircleIcon' },
    'In Progress': { color: 'bg-toxic-gold text-primary', icon: 'ClockIcon' },
    Failed: { color: 'bg-toxic-magenta text-foreground', icon: 'XCircleIcon' },
  };

  const config = statusConfig[experiment.status];

  return (
    <div className="bg-card border-2 border-border hover:border-toxic-gold transition-smooth">
      <div className="relative h-56 overflow-hidden">
        <AppImage
          src={experiment.image}
          alt={experiment.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <div className={`flex items-center space-x-2 px-3 py-1.5 ${config.color}`}>
            <Icon name={config.icon as any} size={16} />
            <span className="text-xs font-bold">{experiment.status}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground">
            {experiment.title}
          </h3>
          <span className="text-xs text-text-secondary font-semibold">
            {experiment.date}
          </span>
        </div>
        
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {experiment.description}
        </p>
        
        <div className="mb-4">
          <h4 className="text-xs font-bold text-toxic-lime mb-2">Key Learnings:</h4>
          <ul className="space-y-1">
            {experiment.learnings.slice(0, 2).map((learning, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="CheckIcon" size={14} className="text-toxic-lime flex-shrink-0 mt-0.5" />
                <span className="text-xs text-text-secondary">{learning}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <button
          onClick={() => onViewDetails(experiment.id)}
          className="w-full px-4 py-2 bg-toxic-gold text-primary font-bold text-sm hover:bg-toxic-lime transition-smooth border-2 border-toxic-gold hover:border-toxic-lime"
        >
          View Full Report
        </button>
      </div>
    </div>
  );
};

export default ExperimentCard;