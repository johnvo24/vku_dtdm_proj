// src/helper/asyncHandler.ts
import { Request, Response, NextFunction } from 'express';

// Middleware handle async and catch err
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default asyncHandler;
