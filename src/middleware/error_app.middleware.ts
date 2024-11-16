import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): Response => {
    console.error('Error:', err);

    if (err.status) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message,
        });
    }

    return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
    });
};
