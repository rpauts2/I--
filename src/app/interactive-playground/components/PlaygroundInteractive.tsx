'use client';

import { useState, useEffect } from 'react';
import GameCard from './GameCard';
import GameModal from './GameModal';
import FilterBar from './FilterBar';

import StatsDisplay from './StatsDisplay';
import LoadingSkeleton from './LoadingSkeleton';

interface Game {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  category: string;
  plays: number;
  rating: number;
  iframeUrl: string;
  tags: string[];
}

const PlaygroundInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Популярные');
  const [isLoading, setIsLoading] = useState(true);

  const mockGames: Game[] = [
  {
    id: 1,
    title: 'Нейро-Пазл: Квантовая Головоломка',
    description: 'Решайте сложные головоломки, созданные нейросетью. Каждый уровень генерируется уникально на основе ваших предыдущих решений.',
    thumbnail: "https://images.unsplash.com/photo-1724331340965-44fee57d5baa",
    thumbnailAlt: 'Colorful puzzle pieces arranged in abstract pattern with glowing neon edges',
    category: 'Головоломки',
    plays: 15420,
    rating: 4.8,
    iframeUrl: 'https://www.example.com/game1',
    tags: ['AI', 'логика', 'стратегия']
  },
  {
    id: 2,
    title: 'Токсичный Раннер: Неоновый Побег',
    description: 'Бесконечный раннер в киберпанк-стиле с процедурно генерируемыми уровнями. Уклоняйтесь от препятствий под электронную музыку.',
    thumbnail: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d",
    thumbnailAlt: 'Futuristic neon-lit corridor with electric lime and magenta lighting effects',
    category: 'Аркады',
    plays: 28750,
    rating: 4.6,
    iframeUrl: 'https://www.example.com/game2',
    tags: ['раннер', 'киберпанк', 'музыка']
  },
  {
    id: 3,
    title: 'AI Художник: Интерактивная Галерея',
    description: 'Создавайте уникальные произведения искусства в реальном времени. Ваши движения мышью управляют нейросетью для генерации абстрактных картин.',
    thumbnail: "https://images.unsplash.com/photo-1674682778004-cfc1d05df542",
    thumbnailAlt: 'Abstract digital art with vibrant colors and fluid shapes on dark background',
    category: 'Творчество',
    plays: 12340,
    rating: 4.9,
    iframeUrl: 'https://www.example.com/game3',
    tags: ['искусство', 'генерация', 'креатив']
  },
  {
    id: 4,
    title: 'Квантовый Шахматы 2077',
    description: 'Классические шахматы с квантовой механикой. Фигуры могут находиться в суперпозиции, создавая непредсказуемые комбинации.',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1f857ebeb-1765041524994.png",
    thumbnailAlt: 'Futuristic chess board with glowing holographic pieces in neon colors',
    category: 'Стратегия',
    plays: 9870,
    rating: 4.7,
    iframeUrl: 'https://www.example.com/game4',
    tags: ['шахматы', 'квантовая', 'мультиплеер']
  },
  {
    id: 5,
    title: 'Ритм Лаборатории: Синтез Битов',
    description: 'Музыкальная игра, где вы создаете электронные треки, нажимая на ноты в такт. AI адаптирует сложность под ваш уровень.',
    thumbnail: "https://images.unsplash.com/photo-1720962158789-9389a4f399da",
    thumbnailAlt: 'Electronic music production interface with colorful waveforms and neon controls',
    category: 'Музыка',
    plays: 18920,
    rating: 4.8,
    iframeUrl: 'https://www.example.com/game5',
    tags: ['музыка', 'ритм', 'синтез']
  },
  {
    id: 6,
    title: 'Код Взломщик: Хакерский Симулятор',
    description: 'Взламывайте виртуальные системы, решая логические задачи. Реалистичный интерфейс терминала с настоящими командами.',
    thumbnail: "https://images.unsplash.com/photo-1672788944093-846bc0677aae",
    thumbnailAlt: 'Computer terminal screen with green matrix-style code and hacking interface',
    category: 'Симуляторы',
    plays: 21450,
    rating: 4.5,
    iframeUrl: 'https://www.example.com/game6',
    tags: ['хакинг', 'программирование', 'логика']
  },
  {
    id: 7,
    title: 'Нейро-Змейка: Эволюция',
    description: 'Классическая змейка с AI-противниками, которые учатся на ваших стратегиях. Чем дольше играете, тем умнее становятся соперники.',
    thumbnail: "https://images.unsplash.com/photo-1654742200980-12573077006d",
    thumbnailAlt: 'Retro-style snake game with neon green snake on dark grid background',
    category: 'Аркады',
    plays: 16780,
    rating: 4.4,
    iframeUrl: 'https://www.example.com/game7',
    tags: ['классика', 'AI', 'эволюция']
  },
  {
    id: 8,
    title: 'Токсичный Тетрис: Хаос Блоков',
    description: 'Тетрис с непредсказуемыми формами блоков, генерируемых нейросетью. Каждая партия уникальна и требует новых стратегий.',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1411fa1eb-1764746287709.png",
    thumbnailAlt: 'Colorful tetris blocks falling in chaotic pattern with neon glow effects',
    category: 'Головоломки',
    plays: 24560,
    rating: 4.6,
    iframeUrl: 'https://www.example.com/game8',
    tags: ['тетрис', 'хаос', 'генерация']
  },
  {
    id: 9,
    title: 'Лабиринт Алгоритмов',
    description: 'Программируйте путь робота через процедурно генерируемые лабиринты. Изучайте основы алгоритмов в игровой форме.',
    thumbnail: "https://images.unsplash.com/photo-1723612955177-96010a7a0cc0",
    thumbnailAlt: 'Isometric view of complex maze with glowing pathways and robotic character',
    category: 'Обучение',
    plays: 11230,
    rating: 4.9,
    iframeUrl: 'https://www.example.com/game9',
    tags: ['программирование', 'алгоритмы', 'обучение']
  }];


  const categories = ['Все', 'Головоломки', 'Аркады', 'Творчество', 'Стратегия', 'Музыка', 'Симуляторы', 'Обучение'];

  useEffect(() => {
    setIsHydrated(true);
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayGame = (gameId: number) => {
    const game = mockGames.find((g) => g.id === gameId);
    if (game) {
      setSelectedGame(game);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedGame(null), 300);
  };

  const handleRateGame = (gameId: number, rating: number) => {
    console.log(`Game ${gameId} rated: ${rating} stars`);
  };

  const filteredGames = mockGames.
  filter((game) => {
    const matchesCategory = selectedCategory === 'Все' || game.category === selectedCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).
  sort((a, b) => {
    switch (sortBy) {
      case 'Популярные':
        return b.plays - a.plays;
      case 'Новые':
        return b.id - a.id;
      case 'Рейтинг':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const totalPlays = mockGames.reduce((sum, game) => sum + game.plays, 0);
  const averageRating = mockGames.reduce((sum, game) => sum + game.rating, 0) / mockGames.length;

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="w-full px-6 lg:px-8">
          <LoadingSkeleton />
        </div>
      </div>);

  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-primary border-b-4 border-toxic-lime py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-toxic-lime"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-toxic-magenta"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-toxic-gold"></div>
        </div>
        
        <div className="relative w-full px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-toxic-lime border-2 border-toxic-lime mb-4">
              <span className="text-primary font-bold text-sm font-mono uppercase tracking-wider">
                Интерактивная Площадка
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Играйте с <span className="text-toxic-lime">AI Творениями</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Погрузитесь в мир интерактивных проектов, созданных с помощью искусственного интеллекта. Каждая игра — это уникальный эксперимент на стыке технологий и творчества.
            </p>

            {/* Stats */}
            <div className="pt-8">
              <StatsDisplay
                totalGames={mockGames.length}
                totalPlays={totalPlays}
                averageRating={averageRating} />

            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-secondary border-b-2 border-border py-8">
        <div className="w-full px-6 lg:px-8">
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy} />

        </div>
      </section>

      {/* Games Grid */}
      <section className="py-16">
        <div className="w-full px-6 lg:px-8">
          {isLoading ?
          <LoadingSkeleton /> :
          filteredGames.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) =>
            <GameCard
              key={game.id}
              game={game}
              onPlay={handlePlayGame}
              onRate={handleRateGame} />

            )}
            </div> :

          <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">🎮</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Игры не найдены</h3>
              <p className="text-text-secondary">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          }
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-toxic-lime via-toxic-magenta to-toxic-gold py-16">
        <div className="w-full px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
              Хотите создать свою игру?
            </h2>
            <p className="text-lg text-primary/90 max-w-2xl mx-auto">
              Посетите Лабораторию Создателя и узнайте, как я использую AI для разработки интерактивных проектов
            </p>
            <a
              href="/creator-s-lab"
              className="inline-block px-8 py-4 bg-primary text-toxic-lime font-bold text-lg font-cta hover:bg-secondary transition-smooth border-4 border-primary hover:border-toxic-lime shadow-modal">

              Перейти в Лабораторию
            </a>
          </div>
        </div>
      </section>

      {/* Game Modal */}
      <GameModal
        game={selectedGame}
        isOpen={isModalOpen}
        onClose={handleCloseModal} />

    </>);

};

export default PlaygroundInteractive;