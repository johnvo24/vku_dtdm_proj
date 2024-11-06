import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user';
import { DietPlanDetail } from './diet_plan_detail';

@Entity('diet_plan')
export class DietPlan {
    @PrimaryGeneratedColumn()
    diet_plan_id: number;

    @Column({ length: 80 })
    diet_name: string;

    @ManyToOne(() => User, user => user.diet_plans)
    @JoinColumn({ name: 'user_id' })
    user: User;  // Sử dụng đối tượng User thay vì user_id

    @OneToMany(() => DietPlanDetail, dietPlanDetail => dietPlanDetail.dietPlan)
    dietPlanDetails: DietPlanDetail[];  // Sử dụng đối tượng DietPlanDetail thay vì diet_plan_details_id
}
