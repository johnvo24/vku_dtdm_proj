import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ExerciseProfile } from './exercise_profile';
import { WorkoutDay } from './workout_day';

@Entity('exercise')
export class Exercise {
    @PrimaryGeneratedColumn()
    exercise_id: number;

    @Column({ length: 50 })
    title: string;

    @Column()
    exer_profile_id: number;

    @Column('text', { array: true })
    instruction: string[];

    @Column('text', { array: true })
    tip: string[];

    @Column({ nullable: true })
    cover_image: string;

    @Column({ default: false })
    is_delete: boolean;

    @ManyToOne(() => WorkoutDay, workoutDay => workoutDay.exercise)
    workout_day: WorkoutDay;

    @OneToMany(() => ExerciseProfile, exerciseProfile => exerciseProfile.exercise)
    exerciseProfiles: ExerciseProfile[];
}
