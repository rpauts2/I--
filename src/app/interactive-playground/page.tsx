import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import PlaygroundInteractive from './components/PlaygroundInteractive';

export const metadata: Metadata = {
  title: 'Интерактивная Площадка - AI Creator Hub',
  description: 'Играйте с AI-созданными интерактивными проектами и играми. Погрузитесь в мир творений, где искусственный интеллект встречается с игровым дизайном.',
};

export default function InteractivePlaygroundPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <PlaygroundInteractive />
      </div>
    </main>
  );
}