import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { WorkoutPlan } from './workout_plan';
import { ExperienceLevel, FitnessGoal, Gender, WorkoutType } from './enum';

@Entity('workout_summary')
export class WorkoutSummary {
    @PrimaryGeneratedColumn()
    workout_summary_id: number;

    @Column({
        type: 'smallint',
        enum: FitnessGoal
    })
    main_goal: FitnessGoal;  // Đổi sang kiểu FitnessGoal (int)

    @Column({ type: 'smallint' })
    program_duration: number;

    @Column({
        type: 'smallint',
        enum: WorkoutType
    })
    workout_type: WorkoutType;  // Đổi sang kiểu WorkoutType (int)

    @Column({
        type: 'smallint',
        enum: ExperienceLevel
    })
    training_level: ExperienceLevel;  // Đổi sang kiểu ExperienceLevel (int)

    @Column()
    day_per_week: number;

    @Column()
    time_per_workout: number;

    @Column({
        type: 'smallint',
        enum: Gender
    })
    target_gender: Gender;  // Đổi sang kiểu Gender (int)

    @OneToMany(() => WorkoutPlan, workoutPlan => workoutPlan.workout_summary)
    workout_plans: WorkoutPlan[];
}
