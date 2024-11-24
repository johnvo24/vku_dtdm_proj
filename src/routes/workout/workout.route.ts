// workoutRoutes.ts
import { Router } from 'express';
import { WorkoutController } from '../../controller/workout.controller';
import { log } from 'console';
import { checkJwt } from '../../middleware/token.middleware';

const workoutRouter = Router();

workoutRouter.get('/', [], WorkoutController.getListWorkoutPlan);

workoutRouter.get('/get/:id', [], WorkoutController.getWorkoutDetail);

workoutRouter.get('/get_for_card/:id', [], WorkoutController.getWorkoutPlanByID);

workoutRouter.get('/my_plan/:id', [checkJwt], WorkoutController.getMyPlan);

workoutRouter.post('/create_recommendation', [], WorkoutController.createRecommendation);


export default workoutRouter;