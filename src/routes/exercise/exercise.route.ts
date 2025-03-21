// src/routes/test/test.route.ts
import { Router } from 'express';
import  ExerciseController  from '../../controller/exercise.controller'; 
import { checkJwt } from '../../middleware/token.middleware';

const exerciseRouter = Router();



exerciseRouter.get('/list', [checkJwt], ExerciseController.getListExercise )
// exerciseRouter.get('/list', ExerciseController.getListExercise )

export default exerciseRouter