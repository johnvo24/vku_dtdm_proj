// src/routes/index.ts

import { Router } from 'express';
import authRouter from './auth/auth.route';
import exerciseRouter from './exercise/exercise.route';
import workoutRouter from './workout/workout.route';
const router = Router();

// Import các route



// Sử dụng các route
//test
router.use('/api/auth', authRouter);
router.use('/api/exercises', exerciseRouter);
router.use('/api/workouts', workoutRouter);


export default router;
