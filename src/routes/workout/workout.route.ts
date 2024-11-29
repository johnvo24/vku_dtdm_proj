// workoutRoutes.ts
import { Router } from 'express';
import { WorkoutController } from '../../controller/workout.controller';
import { log } from 'console';
import { checkJwt } from '../../middleware/token.middleware';

const workoutRouter = Router();

workoutRouter.get('/:fitness_goal', [], WorkoutController.getListWorkoutPlan);

workoutRouter.get('/get/:id', [], WorkoutController.getWorkoutDetail);

workoutRouter.get('/get_for_card/:id', [], WorkoutController.getWorkoutPlanByID);

workoutRouter.get('/my_plan/:id', [checkJwt], WorkoutController.getMyPlan);

workoutRouter.post('/create_recommendation', [], WorkoutController.createRecommendation);

workoutRouter.post('/choose_plan', [checkJwt], WorkoutController.choosePlan);

workoutRouter.post('/check_my_plan_exist', [checkJwt], WorkoutController.checkMyPlanExist);



export default workoutRouter;