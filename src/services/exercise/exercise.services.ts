import { Exercise, ExerciseProfile } from "../../entity/";
import { AppDataSource } from "../../config/db.config";

export class ExerciseService {
    private exerciseRepository = AppDataSource.getRepository(Exercise);
    private exerciseProfileRepository = AppDataSource.getRepository(ExerciseProfile);

    // Hàm lấy danh sách bài tập với các filter
    async getListExercise(filter: {
        experience_level?: number;
        target_muscle?: number;
        offset?: number;
        limit?: number;
    } = {}): Promise<any[]> {  // Trả về dữ liệu dạng raw

        const { experience_level, target_muscle, offset = 0, limit = 8 } = filter;

        // Truy vấn với `LEFT JOIN` và điều kiện
        const queryBuilder = AppDataSource.createQueryBuilder()
            .select([
                'exercise.exercise_id',
                'exercise.title',
                'exercise.cover_image',
                'exercise_profile.exer_profile_id'
            ])
            .from(Exercise, 'exercise')
            .leftJoin(ExerciseProfile, 'exercise_profile', 'exercise_profile.exer_profile_id = exercise.exer_profile_id')
            .where('exercise_profile.experience_level = :experience_level', { experience_level })
            .andWhere('exercise_profile.target_muscle = :target_muscle', { target_muscle })
            .andWhere('exercise.is_delete = :is_delete', { is_delete: false })
            .skip(offset)
            .take(limit);

        // Trả về dữ liệu raw
        return await queryBuilder.getRawMany();
    }
}
