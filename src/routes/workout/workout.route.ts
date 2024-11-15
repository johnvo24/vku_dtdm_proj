// workoutRoutes.ts
import { Router } from 'express';
import { WorkoutController } from '../../controller/workout.controller';

const workoutRouter = Router();
const workoutController = new WorkoutController();

workoutRouter.get('/', async (req, res) => {
    try{
        await workoutController.getListWorkoutPlan(req, res);

    }catch(error){
        throw error;
    }
});

workoutRouter.get('/:id', async (req, res) => {
    try {
        await workoutController.getWorkoutDetail(req, res);
    } catch (error) {
        throw error;
    }
});


export default workoutRouter;