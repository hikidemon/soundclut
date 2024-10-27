import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

// Регистрация нового пользователя
// Регистрация нового пользователя
// Регистрация нового пользователя
export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким именем
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Перенаправление на страницу входа после успешной регистрации
    return res.redirect('/login.html'); // Завершаем функцию после redirect
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при регистрации', error }); // Добавлено return
  }
};


// Аутентификация (логин) пользователя
// Аутентификация (логин) пользователя
// Аутентификация (логин) пользователя
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  // Попытка найти пользователя
  const user = await User.findOne({ where: { username } });

  // Проверка, существует ли пользователь
  if (!user) {
    throw new Error('Пользователь не найден');
  }

  // Проверка пароля (пример, измените на вашу логику проверки пароля)
  const isPasswordValid = await bcrypt.compare(password, user.password); // Предполагается, что вы используете bcrypt для хеширования паролей

  if (!isPasswordValid) {
    throw new Error('Неверные учетные данные');
  }

  // Если все верно, возвращаем данные пользователя
  return { message: 'Login successful', user };
};


// Пример защищенного маршрута для получения профиля пользователя
export const getProfile = async (req: any, res: Response) => {
  try {
    // req.user был добавлен authMiddleware
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }, // Исключаем пароль из ответа
    });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении профиля', error });
  }
};
