import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { WorkoutPlan } from './workout_plan';
import { Exercise } from './exercise';
import { DayOfWeek } from './enum';

@Entity('workout_day')
export class WorkoutDay {
    @PrimaryGeneratedColumn()
    workout_day_id: number;

    @Column()
    workout_plan_id: number;

    @Column({ type: 'varchar', length: 40,})
    workout_day_name: string;

    @Column({
        type: 'enum',
        enum: DayOfWeek
    })
    day_of_week: DayOfWeek;

    @Column({ type: 'smallint',})
    set: number;

    @Column({
        type: 'smallint',
        array: true, // Đánh dấu rằng đây là một mảng
    })
    reps: number[]; // Mảng các giá trị smallint

    @ManyToOne(() => WorkoutPlan, workoutPlan => workoutPlan.workout_day)
    @JoinColumn({ name: 'workout_plan_id' })
    workout_plan: WorkoutPlan;

    @OneToMany(() => Exercise, exercise => exercise.workout_day)
    exercise: Exercise[];
}
