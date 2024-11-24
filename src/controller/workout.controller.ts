import { OK } from "../core/success.response";
import { NextFunction, Request, Response } from 'express';
import { WorkoutService } from "../services/workout/workout.services";
import { log } from "console";

export class WorkoutController {
    static workoutService = new WorkoutService();

    static createRecommendation = async (req: Request, res: Response, next: NextFunction) => {
        const {gender, fitness_goal, age, bmi} = req.body;
        log(req.body);

        try{
            const recommendation = await this.workoutService.createRecommendation(gender, fitness_goal, age, bmi);
            return new OK('Recommendation created successfully', recommendation).send(res);
        }catch(error){
            console.error('Error fetching recommendation:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    static getListWorkoutPlan = async (req: Request, res: Response, next: NextFunction) =>{
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
    static getWorkoutDetail = async (req: Request, res: Response, next: NextFunction)=>{
        const { id } = req.params;
        try {
            const workoutPlan = await this.workoutService.getWorkoutDetail(Number(id));
            return new OK('Workout plan retrieved successfully', workoutPlan).send(res);
        } catch (error) {
            console.error('Error fetching workout plan:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    static getWorkoutPlanByID = async (req: Request, res: Response, next: NextFunction)=>{
        const { id } = req.params;
        try {
            const workoutPlan = await this.workoutService.getWorkoutPlanById(Number(id));
            return new OK('Workout plan retrieved successfully', workoutPlan).send(res);
        } catch (error) {
            console.error('Error fetching workout plan:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static getMyPlan = async (req: Request, res: Response, next: NextFunction)=>{ 
        const {id} = req.params;
        log('user_id', id);

        try{
            const myPlan = await this.workoutService.getMyPlan(Number(id));
            return new OK('My plan retrieved successfully', myPlan).send(res);
        }
        catch(error){
            console.error('Error fetching my plan:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

     }

}
export default WorkoutController;