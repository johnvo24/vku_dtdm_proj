import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Gender, FitnessGoal } from './enum';  // Import các enum đã tạo
import { DietPlan } from './diet_plan';
import { UserWorkoutPlan } from './user_workout_plan';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: 'varchar', length: 40 })
    fullname: string;

    @Column({ type: 'varchar', length: 32 })
    username: string;

    @Column({ type: 'varchar', length: 32 })
    password: string;

    @Column({
        type: 'enum',
        enum: Gender,
    })
    gender: Gender;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 10 })
    phone_number: string;

    @Column({
        type: 'enum',
        enum: FitnessGoal,
    })
    fitness_goal: FitnessGoal;

    @Column({ type: 'smallint' })
    age: number;

    @Column({ type: 'decimal' })
    weight: number;

    @Column({ type: 'decimal' })
    height: number;

    @Column({ type: 'smallint', default: 0 })
    streak: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    advance_data: string;

    @OneToMany(() => DietPlan, dietPlan => dietPlan.user)
    dietPlans: DietPlan[];

    // Quan hệ 1-n với user_workout_plan
    @OneToMany(() => UserWorkoutPlan, userWorkoutPlan => userWorkoutPlan.user)
    workoutPlans: UserWorkoutPlan[];
}
