import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/AuthRoutes';
import sequelize from './config/dbConfig';
import path from 'path';
import postRoutes from './routes/PostRoutes';
import cors from 'cors';

const app = express();

app.use(cors());


// Парсинг тела запросов в формате JSON
app.use(bodyParser.json());


// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, '../public'))); // Обслуживание статических файлов

// Подключение маршрутов для аутентификации
app.use('/auth', authRoutes);
app.use('/api', postRoutes);
// Тестовый маршрут для проверки работы сервера
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html')); // Отправка главной страницы
});
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'home.html')); // Отправка страницы с постами
});


// Функция для синхронизации с базой данных и запуска сервера
export const startApp = async () => {
  try {
    // Подключаемся к базе данных
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Синхронизируем модели с базой данных
    await sequelize.sync();
    console.log('Models synchronized with database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return app;
};
