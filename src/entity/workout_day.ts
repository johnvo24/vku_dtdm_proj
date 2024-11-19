import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { WorkoutPlan } from './workout_plan';
import { Exercise } from './exercise';
import { DayOfWeek } from './enum';
import { ExerciseDay } from './exercise_day';

@Entity('workout_day')
export class WorkoutDay {
    @PrimaryGeneratedColumn()
    workout_day_id: number;

    @Column({ type: 'varchar', length: 40 })
    workout_day_name: string;

    @Column({
        type: 'smallint',
        enum: DayOfWeek
    })
    day_of_week: DayOfWeek;  // Đổi sang kiểu DayOfWeek (int)


    @ManyToOne(() => WorkoutPlan, workoutPlan => workoutPlan.workout_day)
    @JoinColumn({ name: 'workout_plan_id' })
    workout_plan: WorkoutPlan;

    @OneToMany(() => ExerciseDay, exerciseDay => exerciseDay.workout_day)
    exercise_day: Exercise[];
}
