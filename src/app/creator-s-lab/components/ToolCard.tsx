import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Tool {
  id: number;
  name: string;
  category: string;
  description: string;
  logo: string;
  alt: string;
  rating: number;
  usageCount: number;
}

interface ToolCardProps {
  tool: Tool;
  onLearnMore: (id: number) => void;
}

const ToolCard = ({ tool, onLearnMore }: ToolCardProps) => {
  return (
    <div className="bg-card border-2 border-border hover:border-toxic-magenta transition-smooth p-6 group">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 flex-shrink-0 bg-surface border-2 border-toxic-lime p-2">
          <AppImage
            src={tool.logo}
            alt={tool.alt}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-foreground group-hover:text-toxic-magenta transition-smooth mb-1">
            {tool.name}
          </h3>
          <span className="inline-block px-2 py-1 bg-surface text-toxic-lime text-xs font-semibold border border-toxic-lime">
            {tool.category}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
        {tool.description}
      </p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <Icon
              key={index}
              name="StarIcon"
              size={16}
              variant={index < tool.rating ? 'solid' : 'outline'}
              className={index < tool.rating ? 'text-toxic-gold' : 'text-muted'}
            />
          ))}
        </div>
        <span className="text-xs text-text-secondary font-semibold">
          {tool.usageCount} uses
        </span>
      </div>
      
      <button
        onClick={() => onLearnMore(tool.id)}
        className="w-full px-4 py-2 bg-transparent text-toxic-magenta font-bold text-sm border-2 border-toxic-magenta hover:bg-toxic-magenta hover:text-foreground transition-smooth"
      >
        Learn More
      </button>
    </div>
  );
};

export default ToolCard;