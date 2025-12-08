'use client';

import Icon from '@/components/ui/AppIcon';

interface PremiumBannerProps {
  onSubscribe: () => void;
}

const PremiumBanner = ({ onSubscribe }: PremiumBannerProps) => {
  return (
    <div className="relative bg-gradient-to-r from-toxic-lime via-toxic-magenta to-toxic-gold p-1 overflow-hidden">
      <div className="bg-primary p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-2">
                <Icon name="SparklesIcon" size={24} className="text-toxic-gold" variant="solid" />
                <span className="text-sm font-bold text-toxic-gold font-cta uppercase tracking-wider">
                  ПРЕМИУМ ДОСТУП
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground leading-tight">
                Получите доступ к эксклюзивным ресурсам
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Расширенные промпты, профессиональные шаблоны, эксклюзивные инструменты и приоритетная поддержка для серьезных создателей.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircleIcon" size={20} className="text-toxic-lime" variant="solid" />
                  <span className="text-sm font-semibold text-foreground">500+ премиум ресурсов</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircleIcon" size={20} className="text-toxic-lime" variant="solid" />
                  <span className="text-sm font-semibold text-foreground">Еженедельные обновления</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircleIcon" size={20} className="text-toxic-lime" variant="solid" />
                  <span className="text-sm font-semibold text-foreground">Приоритетная поддержка</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={onSubscribe}
                className="px-8 py-4 bg-toxic-lime text-primary text-lg font-bold font-cta hover:bg-toxic-gold transition-smooth border-2 border-toxic-lime hover:border-toxic-gold shadow-toxic-lime hover:shadow-toxic-gold flex items-center space-x-3"
              >
                <span>ПОДПИСАТЬСЯ СЕЙЧАС</span>
                <Icon name="ArrowRightIcon" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumBanner;