import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/AuthRoutes';
import sequelize from './config/dbConfig';
import path from 'path';
import postRoutes from './routes/PostRoutes';
import cors from 'cors';
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydatabase',
  password: 'password',
  port: 5432,
});
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// Сохранение нового комментария
app.post('/comments', async (req, res) => {
  console.log(req.body); // Отладка
  const { postId, comment } = req.body;
  try {
      await pool.query('INSERT INTO comments (post_id, text) VALUES ($1, $2)', [postId, comment]);
      res.json({ success: true });
  } catch (error) {
      console.error('Error saving comment:', error);
      res.status(500).json({ error: 'Failed to save comment' });
  }
});


// Получение комментариев по postId
app.get('/comments/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
      const result = await pool.query('SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC', [postId]);
      res.json(result.rows);
  } catch (error) {
      console.error('Error retrieving comments:', error);
      res.status(500).json({ error: 'Failed to retrieve comments' });
  }
});


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
