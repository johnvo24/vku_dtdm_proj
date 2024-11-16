// src/routes/test/test.route.ts
import { Router } from 'express';
import { AuthController } from '../../controller/auth.controller';

const authRouter = Router();
const authController = new AuthController();

// Route cho đăng ký
authRouter.post('/register', AuthController.register)
authRouter.post('/login', AuthController.login)

export default authRouter;
