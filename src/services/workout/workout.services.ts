import { log } from "console";
import { AppDataSource } from "../../config/db.config";
import { Exercise, WorkoutDay, WorkoutPlan, WorkoutSummary } from "../../entity";
import { ExerciseDay } from "../../entity/exercise_day";

export class WorkoutService {
    private workoutRepository = AppDataSource.getRepository(WorkoutPlan);
    private workoutSummaryRepository = AppDataSource.getRepository(WorkoutSummary);

    async getWorkoutPlans(offset: number, limit: number): Promise<any[]> {
        const queryBuilder = AppDataSource.createQueryBuilder()
            .select('*')
            .from(WorkoutPlan, 'wp')
            .innerJoin(WorkoutSummary, 'ws', 'wp.workout_summary_id = ws.workout_summary_id')
            .offset(offset)
            .limit(limit);

        return await queryBuilder.getRawMany();
    }

    async getWorkoutByIdShortVer(id: number): Promise<any> { 
        const queryBuilder = AppDataSource.createQueryBuilder()
        .select([
            'wp.plan_id AS wp_plan_id',
            'wp.plan_name AS wp_plan_name',
            'wp.cover_image AS wp_cover_image',
            'wd.workout_day_id AS wd_workout_day_id', 
            'wd.workout_day_name AS wd_workout_day_name', 
            'wd.day_of_week AS wd_day_of_week',
            'subquery.ed_exercise_day_id AS subquery_exercise_day_id', 
            'subquery.e_title AS subquery_title', 
            'subquery.ed_reps AS subquery_reps', 
            'subquery.ed_set AS subquery_set'
        ])
        .from(WorkoutDay, 'wd')
        .innerJoin(
            qb=>qb
            .select([
                'ed.exercise_day_id AS ed_exercise_day_id',
                'ed.workout_day_id AS ed_workout_day_id',
                'e.title AS e_title',
                'ed.reps AS ed_reps',
                'ed.set AS ed_set'
            ])
            .from(ExerciseDay, 'ed')
            .innerJoin(Exercise, 'e', 'ed.exercise_id = e.exercise_id'),
            'subquery',
            'wd.workout_day_id = subquery.ed_workout_day_id'
        )
        .innerJoin('wd.workout_plan', 'wp')
        .where('wp.plan_id = :id', { id });

        const rawResults = await queryBuilder.getRawMany();
        log('rawResults', rawResults);

        if (rawResults.length === 0) {
            return null; // No workout plan found
        }

        const { wp_plan_id, wp_plan_name, wp_cover_image, wd_workout_day_name, wd_day_of_week, ed_exercise_id, e_title, ed_reps, ed_set } = rawResults[0];
        log('rawResults', rawResults[0]);

        const workoutDays = rawResults.reduce((acc, row) => {
            const { wd_workout_day_id, wd_workout_day_name, wd_day_of_week, subquery_exercise_day_id, subquery_title, subquery_reps, subquery_set } = row;
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
            });
            return acc;
        }, {});

        return {
            workout_plan: {
                wp_plan_id,
                wp_plan_name,
                wp_cover_image,
                workout_day: Object.values(workoutDays),
            },
        };


    }
}
