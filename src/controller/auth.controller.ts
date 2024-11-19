import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '../core/success.response';
import { AuthService } from '../services/auth/auth.service';

export class AuthController {
    private authService: AuthService;

    // Nhận đối tượng AuthService qua constructor
    constructor(authService: AuthService) {
        this.authService = authService;
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { fullname, username, email, password } = req.body;
            console.log('Register data:', { fullname, username, email, password });

            const data = await this.authService.createUser(fullname, username, email, password);

            return new CREATED({
                message: 'Registered successfully',
                metadata: data,
            }).send(res);
        } catch (error) {
            next(error); // Chuyển lỗi tới middleware xử lý lỗi
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            console.log('Login data:', { username, password });

            const data = await this.authService.loginUser(username, password);

            return new OK('Login successful', data).send(res);
        } catch (error) {
            next(error); // Chuyển lỗi tới middleware xử lý lỗi
        }
    }
}
