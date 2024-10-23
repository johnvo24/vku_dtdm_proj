import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Exercise } from './exercise';

@Entity('exercise_profile')
export class ExerciseProfile {
    @PrimaryGeneratedColumn()
    exer_profile_id: number;

    @Column({
        type: 'enum',
        enum: ['Abductors', 'Abs', 'Adductors', 'Biceps', 'Calves', 'Chest', 'Forearms', 'Glutes', 'Hamstrings', 'HipFlexors', 'ITBand', 'Lats', 'LowerBack', 'UpperBack', 'Neck', 'Obliques', 'PalmarFascia', 'PlantarFascia', 'Quads', 'Shouders', 'Traps', 'Triceps']
    })
    target_muscle: string;

    @Column({
        type: 'enum',
        enum: ['Aerobic', 'Strength', 'Stretching', 'Balance']
    })
    exercise_type: string;

    @Column({
        type: 'enum',
        enum: ['Beginner', 'Intermediate', 'Advanced']
    })
    experience_level: string;

    @Column({
        type: 'enum',
        enum: ['Pull', 'Static', 'Isometric', 'Push'],
        nullable: true
    })
    force_type: string;

    @Column({
        type: 'enum',
        enum: ['Dumbbell', 'Barbell', 'Bodyweight', 'Cable', 'Machine', 'Exercise', 'EZ Bar', 'Kettle Bells', 'Lacrosse Ball'],
        nullable: true
    })
    equipment_required: string;

    @Column({
        type: 'enum',
        enum: ['Compound', 'Isolation'],
        nullable: true
    })
    mechanic: string;

    @OneToOne(() => Exercise, exercise => exercise.exerciseProfiles)
    @JoinColumn({ name: 'exer_profile_id' })
    exercise: Exercise;
}
