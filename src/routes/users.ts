import { Router } from 'express';
import { createUser, getAllUsers, getUserById } from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);

export default userRouter;
