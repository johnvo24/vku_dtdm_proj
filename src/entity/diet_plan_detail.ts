import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { DietPlan } from './diet_plan';
import { Food } from './food';
import { DayOfWeek } from './enum';

@Entity('diet_plan_detail')
export class DietPlanDetail {
    @PrimaryGeneratedColumn()
    diet_plan_detail_id: number;

    @Column({
        type: 'smallint',
        enum: DayOfWeek
    })
    day_of_week: DayOfWeek;

    @OneToOne(() => Food, food => food.dietPlanDetail)
    @JoinColumn({ name: 'food_id' })
    food: Food;  // Thay food_id bằng đối tượng Food

    @ManyToOne(() => DietPlan, dietPlan => dietPlan.dietPlanDetails)
    @JoinColumn({ name: 'diet_plan_id' })
    dietPlan: DietPlan;  // Thay diet_plan_id bằng đối tượng DietPlan
}
