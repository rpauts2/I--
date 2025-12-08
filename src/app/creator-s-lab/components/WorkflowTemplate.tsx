import Icon from '@/components/ui/AppIcon';

interface Template {
  id: number;
  name: string;
  description: string;
  steps: number;
  downloads: number;
  category: string;
}

interface WorkflowTemplateProps {
  template: Template;
  onDownload: (id: number) => void;
}

const WorkflowTemplate = ({ template, onDownload }: WorkflowTemplateProps) => {
  return (
    <div className="bg-card border-2 border-border hover:border-toxic-orange transition-smooth p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground group-hover:text-toxic-orange transition-smooth mb-2">
            {template.name}
          </h3>
          <p className="text-sm text-text-secondary mb-3">
            {template.description}
          </p>
        </div>
        <div className="w-12 h-12 flex-shrink-0 bg-toxic-orange flex items-center justify-center ml-4">
          <Icon name="DocumentTextIcon" size={24} className="text-primary" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mb-4 text-xs text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="ListBulletIcon" size={14} />
          <span>{template.steps} steps</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="ArrowDownTrayIcon" size={14} />
          <span>{template.downloads} downloads</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="px-2 py-1 bg-surface text-toxic-orange text-xs font-semibold border border-toxic-orange">
          {template.category}
        </span>
        <button
          onClick={() => onDownload(template.id)}
          className="px-4 py-2 bg-toxic-orange text-primary font-bold text-sm hover:bg-toxic-gold transition-smooth border-2 border-toxic-orange hover:border-toxic-gold flex items-center space-x-2"
        >
          <Icon name="ArrowDownTrayIcon" size={16} />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default WorkflowTemplate;