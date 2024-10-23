import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WorkoutPlan } from './workout_plan';
import { ExperienceLevel, FitnessGoal, Gender, WorkoutType } from './enum';

@Entity('workout_summary')
export class WorkoutSummary {
    @PrimaryGeneratedColumn()
    workout_summary_id: number;

    @Column({
        type: 'enum',
        enum: FitnessGoal
    })
    main_goal: string;

    @Column()
    program_duration: number;

    @Column({
        type: 'enum',
        enum: WorkoutType
    })
    workout_type: string;

    @Column({
        type: 'enum',
        enum: ExperienceLevel
    })
    training_level: string;

    @Column()
    day_per_week: number;

    @Column()
    time_per_workout: number;

    @Column({
        type: 'enum',
        enum: Gender
    })
    target_gender: string;

    @ManyToOne(() => WorkoutPlan, workoutPlan => workoutPlan.workout_summaries)
    workout_plan: WorkoutPlan;
}
