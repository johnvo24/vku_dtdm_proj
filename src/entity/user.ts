import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Gender, FitnessGoal } from './enum';
import { DietPlan } from './diet_plan';
import { UserWorkoutPlan } from './user_workout_plan';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: 'varchar', length: 40, nullable: false })
    fullname: string;

    @Column({ type: 'varchar', length: 16, nullable: false })
    username: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    password: string;

    @Column({
        type: 'smallint',
        enum: Gender,
        nullable: true,
    })
    gender: Gender | null;

    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    phone_number: string | null;

    @Column({
        type: 'smallint',
        enum: FitnessGoal,
        nullable: true,
    })
    fitness_goal: FitnessGoal | null;

    @Column({ type: 'smallint', nullable: true })
    age: number | null;

    @Column({ type: 'float', nullable: true })
    weight: number | null;

    @Column({ type: 'float', nullable: true })
    height: number | null;

    @Column({ type: 'smallint', default: 0 })
    streak: number;

    @Column({ type: 'text', nullable: true })
    advance_data: string | null;

    @OneToMany(() => DietPlan, dietPlan => dietPlan.user)
    diet_plans: DietPlan[]; // No array initialization here

    @OneToMany(() => UserWorkoutPlan, userWorkoutPlan => userWorkoutPlan.user)
    user_workout_plans: UserWorkoutPlan[]; // No array initialization here


    // Constructor 2: Chỉ dùng cho đăng ký
    static forRegistration(fullname: string, username: string, email: string, password: string): User {
        const user = new User();
        user.fullname = fullname;
        user.username = username;
        user.email = email;
        user.password = password;
        return user;
    }
}
