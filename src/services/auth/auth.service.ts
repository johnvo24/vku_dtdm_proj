import { User } from "../../entity/";
import { AppDataSource } from "../../config/db.config";
import { generateToken } from "../../utils/auth.util";
import bcrypt from "bcryptjs";
import { AuthFailureError, BadRequestError } from "../../core/error.response";

export class AuthService {
    private authRepository = AppDataSource.getRepository(User);

    async createUser(fullname: string, username: string, email: string, password: string) {
        if (!fullname || !username || !email || !password)
            throw new BadRequestError('Some field is missing!');

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = User.forRegistration(fullname, username, email, hashedPassword);
            const newUser = await this.authRepository.save(user);

            const token = generateToken(newUser.user_id);

            return {
                user_id: user.user_id,
                access_token: token
            };
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    }

    async loginUser(username: string, password: string) {
        if (!username || !password) {
            throw new BadRequestError("Username and password are required!");
        }

        try {
            const user = await this.authRepository.findOne({
                where: { username },
                select: ["user_id", "username", "password"],
            });

            if (!user) {
                throw new AuthFailureError("Invalid username or password!");
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new AuthFailureError("Invalid username or password!");
            }

            const token = generateToken(user.user_id);

            return {
                user_id: user.user_id,
                access_token: token
            };
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }
}
