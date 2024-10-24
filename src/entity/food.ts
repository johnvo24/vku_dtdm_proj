import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { FoodCategory } from './enum';
import { DietPlanDetail } from './diet_plan_detail';

@Entity('food')
export class Food {
    @PrimaryGeneratedColumn()
    food_id: number;

    @Column({ length: 60 })
    food_name: string;

    @Column({
        type: 'enum',
        enum: FoodCategory
    })
    category_food: string;

    @Column({ nullable: true })
    calories: number;

    @Column({ type: 'float', nullable: true })
    protein: number;

    @Column({ type: 'float', nullable: true })
    carb: number;

    @Column({ type: 'float', nullable: true })
    fat: number;

    @Column({ type: 'float', nullable: true })
    cooking_time: number;

    @Column({ type: 'text', nullable: true })
    ingredient: string;

    @Column({ type: 'text', nullable: true })
    cooking_instruction: string;

    @Column({ nullable: true, type:"bytea" })
    cover_image: string;

    @OneToOne(() => DietPlanDetail, dietPlanDetail => dietPlanDetail.food)
    dietPlanDetail: DietPlanDetail;
}
