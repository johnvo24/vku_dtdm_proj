import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Exercise } from './exercise';
import { WorkoutDay } from './workout_day';

@Entity('exercise_day')
export class ExerciseDay {
    @PrimaryGeneratedColumn()
    exercise_day_id: number;  // Khoá chính tự động tăng (không ảnh hưởng đến khoá ngoại)

    @Column({ type: 'smallint' })
    set: number;

    @Column({
        type: 'smallint',
        array: true,
    })
    reps: number[];

    @OneToOne(() => Exercise)
    @JoinColumn({ name: 'exercise_id' })
    exercise: Exercise;

    @ManyToOne(() => WorkoutDay, workoutDay => workoutDay.workout_day_id)
    @JoinColumn({ name: 'workout_day_id' })
    workout_day: WorkoutDay;
}
