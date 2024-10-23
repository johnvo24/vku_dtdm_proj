import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { DietPlan } from "./diet_plan";
import { DayOfWeek } from "./enum";
import { Food } from "./food";

@Entity('diet_plan_detail')
export class DietPlanDetail {
    @PrimaryGeneratedColumn()
    diet_plan_detail_id: number;

    @Column()
    food_id: number; // Khóa ngoại tới food

    @Column()
    diet_plan_id: number; // Khóa ngoại tới diet_plan

    @Column({
        type: 'enum',
        enum: DayOfWeek
    })
    day_of_week: DayOfWeek;

    // Quan hệ 1-1 với food
    @OneToOne(() => Food, food => food.dietPlanDetail)
    @JoinColumn({ name: 'food_id' })
    food: Food;

    // Quan hệ n-1 với diet_plan
    @ManyToOne(() => DietPlan,)
    @JoinColumn({ name: 'diet_plan_id' })
    dietPlan: DietPlan;
}