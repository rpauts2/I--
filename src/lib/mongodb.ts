import mongoose from 'mongoose';

// Получаем строку подключения из переменных окружения
const MONGODB_URI = process.env.MONGODB_URI;

// Проверяем наличие строки подключения
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI не определена в .env.local');
}

// Объявляем глобальный тип для кеширования подключения
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Инициализируем кеш
let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  // Если подключение уже есть в кеше, используем его
  if (cached.conn) {
    console.log('Используем кешированное подключение к БД');
    return cached.conn;
  }

  // Если нет промиса подключения, создаем новое подключение
  if (!cached.promise) {
    console.log('Создаем новое подключение к MongoDB...');
    try {
      // Создаем промис подключения
      cached.promise = mongoose.connect(MONGODB_URI!);
      console.log('Подключение к БД установлено');
    } catch (error) {
      console.error('Ошибка подключения к БД:', error);
      throw error;
    }
  }

  try {
    // Ждем завершения подключения
    cached.conn = await cached.promise;
    console.log('MongoDB успешно подключена');
  } catch (e) {
    // В случае ошибки сбрасываем промис
    console.error('Не удалось подключиться к MongoDB:', e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;