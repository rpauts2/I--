import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ResourceHubInteractive from './components/ResourceHubInteractive';

export const metadata: Metadata = {
  title: 'Хранилище ресурсов - AI Creator Hub',
  description: 'Коллекция промптов, шаблонов, инструментов и туториалов для создания с помощью искусственного интеллекта. Скачивайте бесплатные и премиум ресурсы для AI-творчества.',
};

export default function ResourceHubPage() {
  return (
    <>
      <Header />
      <main>
        <ResourceHubInteractive />
      </main>
    </>
  );
}