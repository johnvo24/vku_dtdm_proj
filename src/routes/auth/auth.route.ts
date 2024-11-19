import { Router } from 'express';
import { AuthController } from '../../controller/auth.controller';
import { AuthService } from '../../services/auth/auth.service';

const authRouter = Router();

// Khởi tạo AuthService và AuthController
const authService = new AuthService();
const authController = new AuthController(authService);

// Đăng ký route cho đăng ký và đăng nhập
authRouter.post('/register', (req, res, next) => authController.register(req, res, next));
authRouter.post('/login', (req, res, next) => authController.login(req, res, next));

export default authRouter;
