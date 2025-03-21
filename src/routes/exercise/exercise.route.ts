// src/routes/test/test.route.ts
import { Router } from 'express';
import  ExerciseController  from '../../controller/exercise.controller'; 
import { checkJwt } from '../../middleware/token.middleware';

const exerciseRouter = Router();



exerciseRouter.get('/list', [], ExerciseController.getListExercise)
exerciseRouter.get('/', [], ExerciseController.getExercise)

export default exerciseRouter