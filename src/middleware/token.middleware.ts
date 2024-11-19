import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth.util';
import { AuthFailureError } from '../core/error.response';

const HEADER = {
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
}

// Middleware kiểm tra token
export const checkJwt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers['authorization'];

    if (!token) {
        return next(new AuthFailureError("Missing authentication token"));
    }

    try {
        const decoded = await verifyToken(token); // Giải mã token
        res.locals.user_id = decoded;  // Gán decoded vào res.locals để có thể truy cập sau
        next();
    } catch (error) {
        return next(new AuthFailureError("Error verifying token"));
    }
};
