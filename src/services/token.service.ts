import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

// Chuỗi private key, nên lấy từ file .env
const PRIVATE_KEY_APP = process.env.PRIVATE_KEY_APP || 'PRIVATE_KEY_APP@123123';

/**
 * Tạo token từ UUID, id user và private key
 * @param userId - ID của người dùng
 * @returns Token dạng JWT
 */
export const generateToken = (userId: number): string => {
    // Sinh UUID
    const uuid = uuidv4();

    // Payload của token
    const payload = {
        userId,
        uuid, // Gắn UUID để tạo token duy nhất mỗi lần
    };

    // Tùy chọn cấu hình token
    const options = {
        expiresIn: '3h', // Token hết hạn sau 1 giờ
    };

    // Sinh token JWT
    const token = jwt.sign(payload, PRIVATE_KEY_APP, options);

    return token;
};

/**
 * Kiểm tra và giải mã token
 * @param token - Token cần kiểm tra
 * @returns Payload đã giải mã nếu hợp lệ
 * @throws Error nếu token không hợp lệ hoặc đã hết hạn
 */
export const verifyToken = (token: string): any => {
    try {
        const decoded = jwt.verify(token, PRIVATE_KEY_APP);
        return decoded; // Trả về payload đã giải mã
    } catch (error) {
        throw new Error('Token không hợp lệ hoặc đã hết hạn');
    }
};
