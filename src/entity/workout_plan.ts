import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { WorkoutSummary } from './workout_summary';
import { UserWorkoutPlan } from './user_workout_plan';
import { WorkoutDay } from './workout_day';
import { WorkoutCategory } from './enum';

@Entity('workout_plan')
export class WorkoutPlan {
    @PrimaryGeneratedColumn()
    plan_id: number;

    @Column({ length: 255 })
    plan_name: string;

    @Column({ type: 'text', nullable: true })
    plan_details: string;

    @Column('smallint', { array: true })
    workout_categories: WorkoutCategory[];  // Đổi sang kiểu array của int

    @Column({ nullable: true })
    cover_image: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_at: Date;

    @Column({ default: false })
    is_delete: boolean;

    @ManyToOne(() => WorkoutSummary, workoutSummary => workoutSummary.workout_plans)
    @JoinColumn({ name: 'workout_summary_id' })
    workout_summary: WorkoutSummary;

    @OneToMany(() => UserWorkoutPlan, userWorkoutPlan => userWorkoutPlan.workout_plan_id)
    user_workout_plans: UserWorkoutPlan[];

    @OneToMany(() => WorkoutDay, workoutDay => workoutDay.workout_plan)
    workout_day: WorkoutDay[];
}
