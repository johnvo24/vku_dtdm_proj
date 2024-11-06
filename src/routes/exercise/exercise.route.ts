// src/routes/test/test.route.ts
import { Router } from 'express';
import { ExerciseController } from '../../controller/exercise.controller'; 

const exerciseRouter = Router();
const exerciseController = new ExerciseController();

exerciseRouter.get('/list', async (req, res) => {
    try {
       await exerciseController.getListExercise(req, res)
    } catch (error) {
        throw error
    }
});

export default exerciseRouter;
