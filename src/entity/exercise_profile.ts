import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Exercise } from './exercise';
import { EquipmentRequired, ExerciseType, ExperienceLevel, ForceType, Mechanic, TargetMuscle } from './enum';

@Entity('exercise_profile')
export class ExerciseProfile {
    @PrimaryGeneratedColumn()
    exer_profile_id: number;

    @Column({
        type: 'smallint',
        enum: TargetMuscle
    })
    target_muscle: TargetMuscle;

    @Column({
        type: 'smallint',
        enum: ExerciseType
    })
    exercise_type: ExerciseType;

    @Column({
        type: 'smallint',
        enum: ExperienceLevel
    })
    experience_level: ExperienceLevel;

    @Column({
        type: 'smallint',
        enum: ForceType,
        nullable: true
    })
    force_type: ForceType;

    @Column({
        type: 'smallint',
        enum: EquipmentRequired,
        nullable: true
    })
    equipment_required: EquipmentRequired;

    @Column({
        type: 'smallint',
        enum: Mechanic,
        nullable: true
    })
    mechanic: Mechanic;

    @OneToOne(() => Exercise, exercise => exercise.exercise_profile)
    exercise: Exercise;
}
