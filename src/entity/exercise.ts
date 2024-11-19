import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ExerciseProfile } from './exercise_profile';
import { ExerciseDay } from './exercise_day';

@Entity('exercise')
export class Exercise {
    @PrimaryGeneratedColumn()
    exercise_id: number;

    @Column({ length: 50 })
    title: string;

    @Column('text', { array: true })
    instruction: string[];

    @Column('text', { array: true })
    tip: string[];

    @Column({ nullable: true })
    cover_image: string;

    @Column({ default: false })
    is_delete: boolean;

    @OneToOne(() => ExerciseDay, exerciseDay => exerciseDay.exercise)
    exercise_day: ExerciseDay;

    @OneToOne(() => ExerciseProfile, exerciseProfile => exerciseProfile.exercise)
    @JoinColumn({ name: 'exer_profile_id' }) // Ensure the correct join column is used
    exercise_profile: ExerciseProfile;

    // // Optional: Add the column for `exer_profile_id` if you need it explicitly
    // @Column({ nullable: true })
    // exer_profile_id: number;
}
