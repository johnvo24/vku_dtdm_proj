import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user';
import { WorkoutPlan } from './workout_plan';

@Entity('user_workout_plan')
export class UserWorkoutPlan {
    @PrimaryColumn()
    user_id: number; // Khóa ngoại tới bảng User

    @PrimaryColumn()
    workout_plan_id: number; // Khóa ngoại tới bảng WorkoutPlan

    @Column()
    start_date: Date; // Ngày bắt đầu

    @Column({ type: 'smallint' })
    completed_session: number; // Số buổi đã hoàn thành

    // Quan hệ n-1 với bảng User
    @ManyToOne(() => User, user => user.user_workout_plans)
    @JoinColumn({ name: 'user_id' })
    user: User;

    // Quan hệ n-1 với bảng WorkoutPlan
    @ManyToOne(() => WorkoutPlan, workoutPlan => workoutPlan.user_workout_plans)
    @JoinColumn({ name: 'workout_plan_id' })
    workoutPlan: WorkoutPlan;
}
