import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';
import { WorkoutPlan } from './workout_plan';

@Entity('user_workout_plan')
export class UserWorkoutPlan {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    start_date: Date;

    @Column({ default: 0 })
    completed_session: number;

    @ManyToOne(() => User, user => user.workoutPlans)
    @JoinColumn({ name: 'user_id' })
    user: User;


    @ManyToOne(() => WorkoutPlan, workoutPlan => workoutPlan.user_workout_plans)
    workout_plan_id: WorkoutPlan;

}
