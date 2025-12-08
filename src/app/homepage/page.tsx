import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProjects from './components/FeaturedProjects';
import WhatsNew from './components/WhatsNew';
import StatsSection from './components/StatsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Homepage - AI Creator Hub',
  description: 'Цифровая лаборатория креативных экспериментов. Исследуйте AI-генерированные проекты, интерактивные игры, генеративное искусство и инновационные веб-дизайны в живой экосистеме творчества.',
};

export default function Homepage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <div className="py-16 bg-primary">
        <div className="w-full px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>
      <CategoryGrid />
      <FeaturedProjects />
      <StatsSection />
      <WhatsNew />
      <CTASection />
      <Footer />
    </main>
  );
}