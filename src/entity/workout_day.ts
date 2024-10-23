import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { WorkoutPlan } from './workout_plan';
import { Exercise } from './exercise';

@Entity('workout_day')
export class WorkoutDay {
    @PrimaryGeneratedColumn()
    day_id: number;

    @Column()
    workout_plan_id: number;

    @ManyToOne(() => WorkoutPlan, workoutPlan => workoutPlan.workout_day)
    workout_plan: WorkoutPlan;

    @OneToMany(() => Exercise, exercise => exercise.exercise_id)
    exercise: Exercise[];

    @Column()
    sequence: number;
}
