import Icon from '@/components/ui/AppIcon';

interface StatsOverviewProps {
  stats: Array<{
    label: string;
    value: string;
    icon: string;
    color: string;
  }>;
}

const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border-2 border-border hover:border-toxic-lime transition-smooth p-6 group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-3 bg-${stat.color}/10 border-2 border-${stat.color}`}>
              <Icon name={stat.icon as any} size={24} className={`text-${stat.color}`} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground font-mono">{stat.value}</p>
            <p className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;