import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateAvatar,
  updateProfile,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateAvatar);

export default userRouter;
