import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { ExerciseProfile } from './exercise_profile';
import { WorkoutDay } from './workout_day';
import { ExerciseDay } from './exercise_day';

@Entity('exercise')
export class Exercise {
    @PrimaryGeneratedColumn()
    exercise_id: number;

    @Column({ length: 50 })
    title: string;

    // @Column()
    // exer_profile_id: number;

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
    @JoinColumn({ name: 'exer_profile_id' })
    exercise_profile: ExerciseProfile;  // Sửa thành đối tượng duy nhất thay vì một danh sách
}