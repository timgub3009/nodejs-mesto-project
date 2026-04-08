/**
 * @module routes/users
 * @description Модуль, экспортирующий роутер и маршруты для пользователей.
 *
 */

import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateAvatar,
  updateProfile,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateAvatar);

export default userRouter;
