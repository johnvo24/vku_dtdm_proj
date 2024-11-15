import { OK } from "../core/success.response";
import { Request, Response } from 'express';
import { WorkoutService } from "../services/workout/workout.services";

export class WorkoutController {
    private workoutService: WorkoutService;

    constructor() {
        this.workoutService = new WorkoutService();
    }

    async getListWorkoutPlan(req: Request, res: Response): Promise<Response> {
        const { offset, limit } = req.query;

        const filter = {
            offset: offset ? Number(offset) : 0,
            limit: limit ? Number(limit) : 10
        };

        try {
            const workoutPlans = await this.workoutService.getWorkoutPlans(filter.offset, filter.limit);
            return new OK('Workout plan list retrieved successfully', workoutPlans).send(res);
        } catch (error) {
            console.error('Error fetching workout plans:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    async getWorkoutDetail(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const workoutPlan = await this.workoutService.getWorkoutByIdShortVer(Number(id));
            return new OK('Workout plan retrieved successfully', workoutPlan).send(res);
        } catch (error) {
            console.error('Error fetching workout plan:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

}