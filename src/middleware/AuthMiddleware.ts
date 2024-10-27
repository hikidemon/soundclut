import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Определяем тип запроса с информацией о пользователе
interface AuthRequest extends Request {
  user?: any; // Лучше использовать конкретный тип вместо 'any'
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
    req.user = decoded;  // Присваиваем декодированное значение полю user
    next();  // Передаем управление следующему middleware
  } catch (err) {
    res.status(401).json({ message: 'Неверный токен' });
  }
};

export default authMiddleware;
