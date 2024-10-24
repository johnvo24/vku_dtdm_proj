import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Exercise } from './exercise';
import { EquipmentRequired, ExerciseType, ExperienceLevel, ForceType, Mechanic, TargetMuscle } from './enum';

@Entity('exercise_profile')
export class ExerciseProfile {
    @PrimaryGeneratedColumn()
    exer_profile_id: number;

    @Column({
        type: 'enum',
        enum: TargetMuscle
    })
    target_muscle: string;

    @Column({
        type: 'enum',
        enum: ExerciseType
    })
    exercise_type: string;

    @Column({
        type: 'enum',
        enum: ExperienceLevel
    })
    experience_level: string;

    @Column({
        type: 'enum',
        enum: ForceType,
        nullable: true
    })
    force_type: string;

    @Column({
        type: 'enum',
        enum: EquipmentRequired,
        nullable: true
    })
    equipment_required: string;

    @Column({
        type: 'enum',
        enum: Mechanic,
        nullable: true
    })
    mechanic: string;

    @OneToOne(() => Exercise, exercise => exercise.exerciseProfiles)
    @JoinColumn({ name: 'exer_profile_id' })
    exercise: Exercise;
}
