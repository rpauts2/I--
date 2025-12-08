import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import GalleryInteractive from './components/GalleryInteractive';

export const metadata: Metadata = {
  title: 'AI Creation Gallery - AI Creator Hub',
  description: 'Explore comprehensive showcase of AI-generated creations organized by intelligent auto-categorization.',
};

export default function AICreationGalleryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <GalleryInteractive />
    </main>
  );
}