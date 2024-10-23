import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { FoodCategory } from './enum';
import { DietPlanDetail } from './diet_plan_detail';

@Entity('food')
export class Food {
    @PrimaryGeneratedColumn()
    food_id: number;

    @Column({ length: 50 })
    food_name: string;

    @Column({
        type: 'enum',
        enum: FoodCategory
    })
    category_food_id: string;

    @Column({ nullable: true })
    calories: number;

    @Column({ type: 'decimal', nullable: true })
    protein: number;

    @Column({ type: 'decimal', nullable: true })
    carb: number;

    @Column({ type: 'decimal', nullable: true })
    fat: number;

    @Column({ type: 'decimal', nullable: true })
    cooking_time: number;

    @Column({ type: 'text', nullable: true })
    ingredient: string;

    @Column({ type: 'text', nullable: true })
    cooking_instruction: string;

    @Column({ nullable: true })
    cover_image: string;

    @OneToOne(() => DietPlanDetail, dietPlanDetail => dietPlanDetail.food)
    dietPlanDetail: DietPlanDetail;
}
