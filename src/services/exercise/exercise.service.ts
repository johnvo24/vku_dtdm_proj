import { Exercise } from "../../entity/";
import { AppDataSource } from "../../config/db.config";
import { BadRequestError, NotFoundError } from "../../core/error.response";

export class ExerciseService {
    private exerciseRepository = AppDataSource.getRepository(Exercise);

    // Hàm lấy danh sách bài tập với các filter
    async getListExercise(filter: {
        experience_level?: number;
        target_muscle?: number;
        offset?: number;
        limit?: number;
    } = {}): Promise<any> {  // Trả về dữ liệu dạng raw

        const { experience_level, target_muscle, offset = 0, limit = 8 } = filter;

        try {
            // Tạo query để tìm các bài tập
            const query = this.exerciseRepository
                .createQueryBuilder('exercise')
                .leftJoinAndSelect('exercise.exercise_profile', 'exercise_profile')  // Dùng relation thay vì join thủ công
                .where('exercise.is_delete = :is_delete', { is_delete: false });

            if (experience_level) {
                query.andWhere('exercise_profile.experience_level = :experience_level', { experience_level });
            }

            if (target_muscle) {
                query.andWhere('exercise_profile.target_muscle = :target_muscle', { target_muscle });
            }

            // Áp dụng offset và limit cho paginated results
            query.skip(offset).take(limit);

            // Lấy kết quả từ query
            const exercises = await query.getMany();

            if (exercises.length === 0) {
                throw new NotFoundError('No exercises found matching the criteria');
                // return next(new NotFoundError('No exercises found matching the criteria'));
            }

            // Trả về danh sách bài tập
            return exercises.map(exercise => ({
                exercise_id: exercise.exercise_id,
                title: exercise.title,
                cover_image: exercise.cover_image,
                exer_profile_id: exercise.exercise_profile?.exer_profile_id
            }));
        } catch (error) {
            throw error
        }
    }
    async getExerciseDetail(exercise_id: number): Promise<any> {
        if (!exercise_id) {
            throw new BadRequestError("Missing exercise_id!");
        }
        try {
            // Tìm kiếm người dùng theo username
            // const exercise = await this.exerciseRepository.findOne({
            //     where: { exercise_id },
            //     select: ["exercise_id", "instruction", "tip", ], // Chỉ lấy các trường cần thiết
            // });

            const exercise = await this.exerciseRepository
                .createQueryBuilder('exercise')
                .leftJoinAndSelect('exercise.exercise_profile', 'exercise_profile')
                .where('exercise.exercise_id = :exercise_id', { exercise_id })
                .select([
                    'exercise.instruction',
                    'exercise.tip',
                    'exercise_profile.exer_profile_id',
                    'exercise_profile.exercise_type',
                    'exercise_profile.force_type',
                    'exercise_profile.equipment_required',
                    'exercise_profile.mechanic',
                ])  // Chọn các trường cần thiết từ exercise và exercise_profile
                .getOne();

            return exercise
        } catch (error) {
            throw error
        }
    }
}
