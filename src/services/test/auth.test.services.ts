// src/services/test/auth.test.services.ts
import { AppDataSource } from "../../config/db.config";
import { TestUser } from "../../entity/test/user.test.entity";

export class UserService {
    private userRepository = AppDataSource.getRepository(TestUser);

    async createUser(username: string, password: string, role: string): Promise<TestUser> {
        const user = new TestUser(username, password, role);
        
        try {
            // Lưu người dùng vào cơ sở dữ liệu
            return await this.userRepository.save(user);
        } catch (error) {
            console.error('Error saving user:', error); // Log lỗi
            throw error; // Ném lại lỗi
        }
    }
}
