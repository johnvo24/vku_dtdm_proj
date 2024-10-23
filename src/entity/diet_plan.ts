import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user';
import { DietPlanDetail } from './diet_plan_detail';

@Entity('diet_plan')
export class DietPlan {
    @PrimaryGeneratedColumn()
    diet_plan_id: number;

    @Column({ length: 80 })
    diet_name: string;

    @Column()
    user_id: number;

    @ManyToOne(() =>  User, user => user.dietPlans)
    @JoinColumn({ name: 'user_id' }) // Kết nối đến trường user_id trong bảng diet_plan
    user: User;

    @OneToMany(() => DietPlanDetail, dietPlanDetail => dietPlanDetail.dietPlan)
    dietPlanDetails: DietPlanDetail[];
}
