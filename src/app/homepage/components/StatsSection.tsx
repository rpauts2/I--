'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  id: number;
  label: string;
  value: number;
  displayValue: string;
  suffix: string;
  icon: string;
  color: string;
  description: string;
  prefix?: string;
}

const StatsSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    projects: 0,
    creators: 0,
    experiments: 0,
    tools: 0
  });
  const sectionRef = useRef<HTMLElement>(null);

  const targets = {
    projects: 1247,
    creators: 582,
    experiments: 342,
    tools: 28
  };

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    setIsHydrated(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Animated counter with easing
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500;
    const steps = 80;
    const interval = duration / steps;
    let currentStep = 0;

    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const counter = setInterval(() => {
      currentStep++;
      const progress = easeOutQuart(currentStep / steps);

      setCounts({
        projects: Math.floor(targets.projects * progress),
        creators: Math.floor(targets.creators * progress),
        experiments: Math.floor(targets.experiments * progress),
        tools: Math.floor(targets.tools * progress)
      });

      if (currentStep >= steps) {
        clearInterval(counter);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(counter);
  }, [isVisible]);

  const stats: Stat[] = [
    {
      id: 1,
      label: "Проектов",
      value: counts.projects,
      displayValue: counts.projects.toString(),
      suffix: "+",
      icon: "DocumentDuplicateIcon",
      color: "toxic-lime",
      description: "AI-генерированных креаций",
      prefix: ""
    },
    {
      id: 2,
      label: "Создателей",
      value: counts.creators,
      displayValue: counts.creators.toString(),
      suffix: "+",
      icon: "UsersIcon",
      color: "toxic-magenta",
      description: "Активных участников",
      prefix: ""
    },
    {
      id: 3,
      label: "Экспериментов",
      value: counts.experiments,
      displayValue: counts.experiments.toString(),
      suffix: "+",
      icon: "BeakerIcon",
      color: "toxic-gold",
      description: "Креативных исследований",
      prefix: ""
    },
    {
      id: 4,
      label: "Инструментов",
      value: counts.tools,
      displayValue: counts.tools.toString(),
      suffix: "",
      icon: "WrenchScrewdriverIcon",
      color: "toxic-orange",
      description: "AI платформ",
      prefix: ""
    }
  ];

  if (!isHydrated) {
    return (
      <section className="py-16 bg-primary">
        <div className="w-full px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-40 bg-surface animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-24 bg-secondary overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-toxic-lime/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-toxic-magenta/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 50px,
                  rgba(16, 185, 129, 0.1) 50px,
                  rgba(16, 185, 129, 0.1) 52px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 50px,
                  rgba(16, 185, 129, 0.1) 50px,
                  rgba(16, 185, 129, 0.1) 52px
                )
              `,
              backgroundSize: '100% 100%'
            }}
          ></div>
        </div>

        {/* Animated lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-toxic-lime to-transparent animate-shimmer"
            style={{
              top: `${20 + i * 20}%`,
              left: 0,
              right: 0,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          ></div>
        ))}
      </div>

      <div className="relative w-full px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <h2 className={`text-5xl lg:text-6xl font-extrabold text-foreground mb-4 font-cta transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Наша <span className="text-toxic-lime relative inline-block">
                Экосистема
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0,4 Q25,0 50,4 T100,4" fill="none" stroke="currentColor" strokeWidth="2" className="text-toxic-lime"/>
                </svg>
              </span>
            </h2>
            <p className={`text-xl text-text-secondary max-w-2xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '0.1s' }}>
              Растущее сообщество AI-энтузиастов и креативных экспериментов
            </p>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`group relative text-center p-8 bg-surface border-2 border-border hover:border-${stat.color} transition-all duration-500 shadow-card hover:shadow-${stat.color} overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Animated background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}/0 to-${stat.color}/0 group-hover:from-${stat.color}/10 group-hover:to-${stat.color}/5 transition-all duration-500`}></div>
                
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with pulse effect */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 mb-6 bg-${stat.color} border-2 border-${stat.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-[0_0_0_0_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_0_20px_rgba(16,185,129,0)] animate-[pulse_2s_ease-in-out_infinite]`}>
                    <Icon 
                      name={stat.icon} 
                      size={40} 
                      className="text-primary group-hover:scale-110 transition-transform" 
                    />
                  </div>

                  {/* Animated counter */}
                  <div className="relative mb-3">
                    <div className={`text-5xl lg:text-6xl font-extrabold text-foreground font-cta group-hover:text-${stat.color} transition-all duration-300 relative inline-block`}>
                      {stat.prefix}
                      <span className="tabular-nums">{stat.displayValue}</span>
                      {stat.suffix}
                      {/* Glow effect behind number */}
                      <span className={`absolute inset-0 blur-2xl bg-${stat.color} opacity-0 group-hover:opacity-30 transition-opacity`}></span>
                    </div>
                    {/* Progress bar under number */}
                    <div className="mt-2 h-1 bg-border overflow-hidden">
                      <div 
                        className={`h-full bg-${stat.color} transition-all duration-1000 ease-out`}
                        style={{ 
                          width: isVisible ? `${(stat.value / (stat.id === 1 ? 1500 : stat.id === 2 ? 600 : stat.id === 3 ? 400 : 30)) * 100}%` : '0%',
                          transitionDelay: `${index * 0.1}s`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-lg font-bold text-foreground mb-2 font-accent group-hover:scale-105 transition-transform">
                    {stat.label}
                  </div>

                  {/* Description with icon */}
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-2 h-2 bg-${stat.color} rounded-full animate-glow-pulse`}></div>
                    <p className="text-sm text-text-secondary">
                      {stat.description}
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${stat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>

          {/* Achievement badges */}
          <div className={`mt-16 flex flex-wrap items-center justify-center gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '0.4s' }}>
            <div className="group flex items-center space-x-3 px-6 py-3 bg-surface border-2 border-toxic-lime hover:bg-toxic-lime hover:scale-105 transition-all duration-300 cursor-pointer">
              <Icon name="TrophyIcon" size={24} className="text-toxic-lime group-hover:text-primary transition-colors" />
              <div className="text-left">
                <div className="text-xs text-text-secondary group-hover:text-primary/80 font-accent">Рейтинг</div>
                <div className="text-sm font-bold text-foreground group-hover:text-primary font-accent">#1 AI Платформа</div>
              </div>
            </div>
            
            <div className="group flex items-center space-x-3 px-6 py-3 bg-surface border-2 border-toxic-magenta hover:bg-toxic-magenta hover:scale-105 transition-all duration-300 cursor-pointer">
              <Icon name="StarIcon" size={24} className="text-toxic-magenta group-hover:text-primary transition-colors fill-current" />
              <div className="text-left">
                <div className="text-xs text-text-secondary group-hover:text-primary/80 font-accent">Оценка</div>
                <div className="text-sm font-bold text-foreground group-hover:text-primary font-accent">4.9 / 5.0</div>
              </div>
            </div>

            <div className="group flex items-center space-x-3 px-6 py-3 bg-surface border-2 border-toxic-gold hover:bg-toxic-gold hover:scale-105 transition-all duration-300 cursor-pointer">
              <Icon name="BoltIcon" size={24} className="text-toxic-gold group-hover:text-primary transition-colors" />
              <div className="text-left">
                <div className="text-xs text-text-secondary group-hover:text-primary/80 font-accent">Активность</div>
                <div className="text-sm font-bold text-foreground group-hover:text-primary font-accent">24/7 Онлайн</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;