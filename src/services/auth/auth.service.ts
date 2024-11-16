import { User } from "../../entity/";
import { AppDataSource } from "../../config/db.config";
import { generateToken } from "../../utils/auth.util";
import bcrypt from "bcrypt"
import { AuthFailureError, BadRequestError } from "../../core/error.response";

interface promiseAuth {
    user_id: number
    access_token: string
}

export class AuthService {
    private authRepository = AppDataSource.getRepository(User);

    /**
     * Tạo người dùng và trả về ID cùng token
     * @param fullname - Tên đầy đủ
     * @param username - Tên đăng nhập
     * @param email - Email của người dùng
     * @param password - Mật khẩu
     * @returns Object chứa idUser và token
     */

    async createUser(fullname: string, username: string, email: string, password: string,): Promise<promiseAuth> {
        
        if (!fullname || !username || !email || !password) 
            throw new BadRequestError('Some field is missing!')

        try {
            //hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = User.forRegistration(fullname, username, email, hashedPassword);
            // Lưu người dùng vào cơ sở dữ liệu
            const newUser = await this.authRepository.save(user);

            const token = generateToken(newUser.user_id);

            const dataReturn: promiseAuth = {
                user_id: user.user_id,
                access_token: token
            }

            return dataReturn;
        } catch (error) {
            console.error('Error saving user:', error); // Log lỗi
            throw error; // Ném lại lỗi
        }
    }
    async loginUser(username: string, password: string): Promise<promiseAuth> {
        // Kiểm tra các trường bắt buộc
        if (!username || !password) {
            throw new BadRequestError("Username and password are required!");
        }

        try {
            // Tìm kiếm người dùng theo username
            const user = await this.authRepository.findOne({
                where: { username },
                select: ["user_id", "username", "password"], // Chỉ lấy các trường cần thiết
            });

            if (!user) {
                throw new AuthFailureError("Invalid username or password!");
            }

            // Kiểm tra mật khẩu
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new AuthFailureError("Invalid username or password!");
            }

            // Tạo token
            const token = generateToken(user.user_id);

            const dataReturn: promiseAuth = {
                user_id: user.user_id,
                access_token: token
            }

            return dataReturn;
        } catch (error) {
            console.error("Error during login:", error);
            throw error; // Ném lại lỗi để xử lý ở lớp ngoài
        }
    }
}
