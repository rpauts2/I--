import Icon from '@/components/ui/AppIcon';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  milestone: boolean;
  category: string;
}

interface TimelineItemProps {
  event: TimelineEvent;
  isLast: boolean;
}

const TimelineItem = ({ event, isLast }: TimelineItemProps) => {
  return (
    <div className="relative flex items-start space-x-4 pb-8">
      {!isLast && (
        <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-toxic-lime"></div>
      )}
      
      <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center border-2 z-10 ${
        event.milestone 
          ? 'bg-toxic-magenta border-toxic-magenta' :'bg-toxic-lime border-toxic-lime'
      }`}>
        <Icon 
          name={event.milestone ? 'StarIcon' : 'CheckIcon'} 
          size={16} 
          variant="solid"
          className={event.milestone ? 'text-foreground' : 'text-primary'}
        />
      </div>
      
      <div className="flex-1 bg-card border-2 border-border hover:border-toxic-lime transition-smooth p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-toxic-lime">{event.date}</span>
          <span className="px-2 py-1 bg-surface text-text-secondary text-xs font-semibold border border-border">
            {event.category}
          </span>
        </div>
        
        <h4 className="text-base font-bold text-foreground mb-2">
          {event.title}
        </h4>
        
        <p className="text-sm text-text-secondary">
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default TimelineItem;