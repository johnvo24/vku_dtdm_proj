import { NextFunction, Request, Response } from 'express';
import { CREATED, OK } from '../core/success.response';
import { AuthService } from '../services/auth/auth.service';

export class AuthController {
    static authService = new AuthService();

    // Đăng ký người dùng
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { fullname, username, email, password } = req.body;

            console.log('Register data:', { fullname, username, email, password }); // Log dữ liệu yêu cầu

            // Gọi service register
            const data = await this.authService.createUser(fullname, username, email, password);

            return new CREATED({
                message: 'Registered successfully',
                metadata: data,
            }).send(res);
        } catch (error) {
            next(error); // Chuyển lỗi tới middleware xử lý lỗi
        }
    }

    // Đăng nhập người dùng
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;

            console.log('Login data:', { username, password }); // Log dữ liệu yêu cầu

            // Gọi service login
            const data = await this.authService.loginUser(username, password);

            return new OK('Login successful', data).send(res);
        } catch (error) {
            next(error); // Chuyển lỗi tới middleware xử lý lỗi
        }
    }
}
