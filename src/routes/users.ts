/**
 * @module routes/users
 * @description Модуль, экспортирующий роутер и маршруты для пользователей.
 *
 */

import { Router } from 'express';
import validate from '../middlewares/validate';
import { updateAvatarSchema, updateProfileSchema } from '../validators';
import {
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateAvatar,
  updateProfile,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/me', getCurrentUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', validate(updateProfileSchema), updateProfile);
userRouter.patch('/me/avatar', validate(updateAvatarSchema), updateAvatar);

export default userRouter;
