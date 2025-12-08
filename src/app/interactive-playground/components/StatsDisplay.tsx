interface StatsDisplayProps {
  totalGames: number;
  totalPlays: number;
  averageRating: number;
}

const StatsDisplay = ({ totalGames, totalPlays, averageRating }: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Games */}
      <div className="bg-card border-2 border-toxic-lime p-6 text-center">
        <div className="text-4xl font-bold text-toxic-lime font-mono mb-2">
          {totalGames}
        </div>
        <div className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
          Интерактивных проектов
        </div>
      </div>

      {/* Total Plays */}
      <div className="bg-card border-2 border-toxic-magenta p-6 text-center">
        <div className="text-4xl font-bold text-toxic-magenta font-mono mb-2">
          {totalPlays.toLocaleString('ru-RU')}
        </div>
        <div className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
          Всего запусков
        </div>
      </div>

      {/* Average Rating */}
      <div className="bg-card border-2 border-toxic-gold p-6 text-center">
        <div className="text-4xl font-bold text-toxic-gold font-mono mb-2">
          {averageRating.toFixed(1)}
        </div>
        <div className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
          Средний рейтинг
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;