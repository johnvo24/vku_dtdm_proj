// src/routes/test/test.route.ts
import { Router } from 'express';
import { TestUserController } from '../../controller/test.controller';

const testRouter = Router();
const userController = new TestUserController();

// Route cho đăng ký
testRouter.post('/register', async (req, res) => {
    try {
        await userController.register(req, res); // Gọi hàm register
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

export default testRouter;
