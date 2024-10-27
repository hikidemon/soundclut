import express, { Request, Response, Router } from 'express';
import { register, login, getProfile } from '../controllers/AuthController';
import authMiddleware from '../middleware/AuthMiddleware';

const router = express.Router();

// Маршрут для регистрации пользователя
router.post('/register', async (req: Request, res: Response) => {
  try {
    const result = await register(req, res); // Ваша функция register
    res.status(201).json(result); // Этот вызов может привести к ошибке, если register уже отправляет ответ
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации', error });
  }
});

// Маршрут для логина пользователя
router.post('/login', async (req: Request, res: Response) => {
  try {
    const result = await login(req, res); // Ваша функция login
    res.status(200).json(result); // Этот вызов может привести к ошибке, если login уже отправляет ответ
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при логине', error });
  }
});

router.get('/profile', authMiddleware, async (req: Request, res: Response) => {
  try {
    const profile = await getProfile(req, res); // Этот вызов может привести к ошибке, если getProfile уже отправляет ответ
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении профиля', error });
  }
});

export default router;
