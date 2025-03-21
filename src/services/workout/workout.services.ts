import { log } from "console";
import { AppDataSource } from "../../config/db.config";
import { Exercise, UserWorkoutPlan, WorkoutDay, WorkoutPlan, WorkoutSummary } from "../../entity";
import { ExerciseDay } from "../../entity/exercise_day";
const axios = require('axios');

export class WorkoutService {


    async choosePlan(user_id: number, plan_id: number): Promise<any> {
        await AppDataSource.createQueryBuilder()
            .delete()
            .from(UserWorkoutPlan)
            .where('user_id = :user_id', { user_id })
            .execute();
        const queryBuilder = AppDataSource.createQueryBuilder()
            .insert()
            .into(UserWorkoutPlan)
            .values({
            user_id: user_id,
            workout_plan_id: plan_id,
            start_date: new Date(),
            completed_session: 0
            })
            .returning('*');

        const result = await queryBuilder.execute();

        if (result.raw.length === 0) {
            throw new Error('Failed to choose plan');
        }

        return result.raw[0];
    }

    async createRecommendation(gender: number, fitness_goal: number, age_avg: number, bmi_avg: number): Promise<any> {
        const data = { gender, fitness_goal, age_avg, bmi_avg };
        log('data', data);

        try {
            const response = await axios.post('http://localhost:8000/predict', data, { timeout: 5000 });
            return response.data;
        } catch (error) {
            log('Error fetching recommendation:', error);
            throw new Error('Failed to fetch recommendation');
        }
    }

    async getMyPlan(userId: number): Promise<any> {
        const queryBuilder = AppDataSource.createQueryBuilder()
            .select('*')
            .from(UserWorkoutPlan, 'uwp')
            .orderBy('uwp.start_date','DESC')
            .where('uwp.user_id = :userId', { userId: userId })
        
        const rawResults = await queryBuilder.getRawOne();
        log('rawResults', rawResults);
        if (!rawResults) {
            return null;
        }else{
            const workout_plan = await this.getWorkoutDetail(rawResults.workout_plan_id);
            log('workout_plan', workout_plan);
            return {
                user_id: userId,
                start_date : rawResults.start_date,
                completed_session: rawResults.completed_session,
                workout_plan : workout_plan.workout_plan,
            }
        }
        
        
        
        
    }

    async getWorkoutPlans(offset: number, limit: number, fitness_goal: number): Promise<any[]> {
        const queryBuilder = AppDataSource.createQueryBuilder()
            .select('*')
            .from(WorkoutPlan, 'wp')
            .innerJoin(WorkoutSummary, 'ws', 'wp.workout_summary_id = ws.workout_summary_id')
            .where('ws.main_goal = :fitness_goal', { fitness_goal })
            .offset(offset)
            .limit(limit);
        
            const workoutPlans = await queryBuilder.getRawMany();
            log('list workout_plan', workoutPlans);
            return workoutPlans;

        return await queryBuilder.getRawMany();
    }

    async getWorkoutPlanById(id: number): Promise<any> {
        const queryBuilder = AppDataSource.createQueryBuilder()
        .select([
            'wp.plan_id',
            'wp.plan_name',
            'wp.cover_image',
            'ws.program_duration'
        ])
        .from(WorkoutPlan, 'wp')
        .innerJoin(WorkoutSummary, 'ws', 'wp.workout_summary_id = ws.workout_summary_id')
        .where('wp.plan_id = :id', { id })

        return await queryBuilder.getRawOne();
    }

    async getWorkoutDetail(id: number): Promise<any> { 
        const queryBuilder = AppDataSource.createQueryBuilder()
        .select([
            'wp.plan_id AS wp_plan_id',
            'wp.plan_name AS wp_plan_name',
            'wp.cover_image AS wp_cover_image',
            'wp.plan_details AS wp_plan_details',
            'wd.workout_day_id AS wd_workout_day_id', 
            'wd.workout_day_name AS wd_workout_day_name', 
            'wd.day_of_week AS wd_day_of_week',
            'ws.program_duration AS ws_program_duration',
            'ws.day_per_week AS ws_day_per_week',
            'ws.main_goal AS ws_main_goal',
            'ws.target_gender AS ws_target',
            'ws.time_per_workout AS ws_time_per_workout',
            'ws.training_level AS ws_training_level',
            'ws.workout_type AS ws_workout_type',
            'subquery.ed_exercise_day_id AS subquery_exercise_day_id', 
            'subquery.e_title AS subquery_title', 
            'subquery.ed_reps AS subquery_reps', 
            'subquery.ed_set AS subquery_set',
            'subquery.e_cover_image AS subquery_cover_image'
        ])
        .from(WorkoutDay, 'wd')
        .innerJoin(
            qb=>qb
            .select([
                'ed.exercise_day_id AS ed_exercise_day_id',
                'ed.workout_day_id AS ed_workout_day_id',
                'e.title AS e_title',
                'e.cover_image AS e_cover_image',
                'ed.reps AS ed_reps',
                'ed.set AS ed_set'
            ])
            .from(ExerciseDay, 'ed')
            .innerJoin(Exercise, 'e', 'ed.exercise_id = e.exercise_id'),
            'subquery',
            'wd.workout_day_id = subquery.ed_workout_day_id'
        )
        .innerJoin('wd.workout_plan', 'wp')
        .innerJoin('wp.workout_summary', 'ws')
        .where('wp.plan_id = :id', { id });

        const rawResults = await queryBuilder.getRawMany();
        log('rawResults', rawResults);

        if (rawResults.length === 0) {
            return null; // No workout plan found
        }

        const { wp_plan_id, wp_plan_name, wp_cover_image, wp_plan_details, ws_program_duration,ws_day_per_week,ws_main_goal,ws_target,ws_time_per_workout,ws_training_level,ws_workout_type, wd_workout_day_name, wd_day_of_week, ed_exercise_id, e_title, ed_reps, ed_set } = rawResults[0];
        log('rawResults', rawResults[0]);

        const workoutDays = rawResults.reduce((acc, row) => {
            const { wd_workout_day_id, wd_workout_day_name, wd_day_of_week, subquery_exercise_day_id, subquery_title, subquery_reps, subquery_set, subquery_cover_image } = row;
            if (!acc[wd_workout_day_id]) {
                acc[wd_workout_day_id] = {
                    wd_workout_day_id,
                    wd_workout_day_name,
                    wd_day_of_week,
                    exercises: []
                };
            }
            acc[wd_workout_day_id].exercises.push({
                ed_exercise_day_id: subquery_exercise_day_id,
                e_title: subquery_title,
                ed_reps: subquery_reps,
                ed_set: subquery_set,
                e_cover_image: subquery_cover_image,
            });
            return acc;
        }, {});

        return {
            workout_plan: {
                wp_plan_id,
                wp_plan_name,
                wp_cover_image,
                wp_plan_details,
                ws_program_duration,
                ws_day_per_week,
                ws_main_goal,
                ws_target,
                ws_time_per_workout,
                ws_training_level,
                ws_workout_type,
                workout_day: Object.values(workoutDays),
            },
        };
    }
}
