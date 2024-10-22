// src/controller/test.controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/test/auth.test.services';
import { CREATED } from '../core/success.response';

export class TestUserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        console.log('UserService initialized:', this.userService); // Log để kiểm tra
    }

    async register(req: Request, res: Response): Promise<Response> {
        const { username, password, role } = req.body;

        console.log('Register data:', { username, password, role }); // Log dữ liệu yêu cầu

        // Tạo người dùng mới
        const newUser = await this.userService.createUser(username, password, role);
        
        return new CREATED({
            message: 'Registered successfully',
            metadata: newUser
        }).send(res);
    }
}
