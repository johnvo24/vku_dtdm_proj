// workoutRoutes.ts
import { Router } from 'express';

const router = Router();

router.post('/create', (req, res) => {
    const { gender, fitnessGoal, yearOfBirth, heigh, weight, gymLocation } = req.body;


    res.status(201).json({ message: 'Workout plan created successfully', data: { gender, fitnessGoal, yearOfBirth, heigh, weight, gymLocation } });
});


export default router;