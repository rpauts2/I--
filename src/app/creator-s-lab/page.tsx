import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import CreatorLabInteractive from './components/CreatorLabInteractive';

export const metadata: Metadata = {
  title: "Creator's Lab - AI Creator Hub",
  description: "Explore behind-the-scenes creative processes, AI tools, experiments, and workflows. Transparent documentation of AI-assisted creation techniques and collaborative projects.",
};

export default function CreatorLabPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <CreatorLabInteractive />
      </div>
    </main>
  );
}