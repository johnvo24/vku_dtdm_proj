import { OK } from "../core/success.response";
import { NextFunction, Request, Response } from 'express';
import { WorkoutService } from "../services/workout/workout.services";
import { log } from "console";

export class WorkoutController {
    static workoutService = new WorkoutService();


    static checkMyPlanExist = async (req: Request, res: Response, next: NextFunction) => {
        const {user_id} = req.body;
        log("At check my plan exist", req.body);

        try{
            const myPlan = await this.workoutService.getMyPlan(Number(user_id));
            if(myPlan){
                return new OK('Your already have plan', myPlan).send(res);
            }
            return res.status(404).json({ message: 'No plan found for this user' });
        }catch(error){
            console.error('Error fetching my plan:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    
    static createRecommendation = async (req: Request, res: Response, next: NextFunction) => {
        const {gender, fitness_goal, age_avg, bmi_avg} = req.body;
        log(req.body);

        try{
            const recommendation = await this.workoutService.createRecommendation(gender, fitness_goal, age_avg, bmi_avg);
            return new OK('Recommendation created successfully', recommendation).send(res);
        }catch(error){
            console.error('Error fetching recommendation:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static choosePlan = async (req: Request, res: Response, next: NextFunction) => {
        const {plan_id} = req.body;
        const {userId} = res.locals.user_id;
        log(req.body);
        log(userId);

        try{
            const plan = await this.workoutService.choosePlan(userId, plan_id);
            return new OK('Plan chosen successfully', plan).send(res);
        }catch(error){
            console.error('Error choosing plan:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    static getListWorkoutPlan = async (req: Request, res: Response, next: NextFunction) =>{
        const { offset, limit, fitness_goal } = req.params;

        const filter = {
            offset: offset ? Number(offset) : 0,
            limit: limit ? Number(limit) : 10,
            fitness_goal: fitness_goal ? Number(fitness_goal) : 0
        };

        try {
            const workoutPlans = await this.workoutService.getWorkoutPlans(filter.offset, filter.limit, filter.fitness_goal);
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