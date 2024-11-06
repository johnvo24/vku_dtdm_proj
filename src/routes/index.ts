// src/routes/index.ts

import { Router } from 'express';
import testRouter from './test/test.route';
import exerciseRouter from './exercise/exercise.route';
const router = Router();

// Import các route



// Sử dụng các route
//test
router.use('/api/test', testRouter);
router.use('/api/exercises', exerciseRouter);


export default router;
