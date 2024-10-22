// src/routes/index.ts

import { Router } from 'express';
import testRouter from './test/test.route';

const router = Router();

// Import các route



// Sử dụng các route
router.use('/api/test', testRouter);


export default router;
