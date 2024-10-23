import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WorkoutSummary } from './workout_summary';
import { UserWorkoutPlan } from './user_workout_plan';
import { WorkoutDay } from './workout_day';

@Entity('workout_plan')
export class WorkoutPlan {
    @PrimaryGeneratedColumn()
    plan_id: number;

    @Column({ length: 255 })
    plan_name: string;

    @Column({ type: 'text', nullable: true })
    plan_details: string;

    @Column('text', { array: true })
    workout_categories: string[];

    @Column({ nullable: true })
    cover_image: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_at: Date;

    @Column({ default: false })
    is_delete: boolean;

    @OneToMany(() => WorkoutSummary, workoutSummary => workoutSummary.workout_plan)
    workout_summaries: WorkoutSummary[];

    @OneToMany(() => UserWorkoutPlan, userWorkoutPlan => userWorkoutPlan.workout_plan_id)
    user_workout_plans: UserWorkoutPlan[];

    @OneToMany(() => WorkoutDay, workoutDay => workoutDay.workout_plan_id)
    workout_day: WorkoutDay[];
}
