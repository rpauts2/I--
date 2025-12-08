'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
  onSubmit: (email: string) => void;
}

const EmailCaptureModal = ({ isOpen, onClose, resourceTitle, onSubmit }: EmailCaptureModalProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSubmit(email);
    setIsSubmitting(false);
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-card border-2 border-toxic-lime max-w-md w-full shadow-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-toxic-lime/10 border-2 border-toxic-lime">
              <Icon name="EnvelopeIcon" size={24} className="text-toxic-lime" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Получить ресурс</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-foreground hover:bg-muted transition-smooth border-2 border-transparent hover:border-toxic-lime"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">
              Вы скачиваете:
            </p>
            <p className="text-lg font-bold text-foreground">{resourceTitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email адрес
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-input text-foreground placeholder:text-text-secondary border-2 border-border focus:border-toxic-lime focus:outline-none transition-smooth font-semibold"
              />
            </div>

            <div className="flex items-start space-x-2 p-4 bg-muted border border-border">
              <Icon name="InformationCircleIcon" size={20} className="text-toxic-lime flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary leading-relaxed">
                Мы отправим ссылку для скачивания на ваш email. Никакого спама, только полезные обновления о новых ресурсах.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3.5 bg-toxic-lime text-primary font-bold font-cta hover:bg-toxic-gold transition-smooth border-2 border-toxic-lime hover:border-toxic-gold shadow-toxic-lime hover:shadow-toxic-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                  <span>ОТПРАВКА...</span>
                </>
              ) : (
                <>
                  <span>ПОЛУЧИТЬ РЕСУРС</span>
                  <Icon name="ArrowRightIcon" size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailCaptureModal;