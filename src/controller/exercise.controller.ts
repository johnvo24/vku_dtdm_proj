import { Request, Response } from 'express';
import { ExerciseService } from '../services/exercise/exercise.services'; 
import { OK } from '../core/success.response';

export class ExerciseController {
    private exerciseService: ExerciseService;

    constructor() {
        this.exerciseService = new ExerciseService();
        console.log('ExerciseService initialized:', this.exerciseService); // Kiểm tra khởi tạo service
    }

    // Hàm lấy danh sách bài tập
    async getListExercise(req: Request, res: Response): Promise<Response> {
        const { experience_level, target_muscle, offset } = req.query;

        // Chuyển query params thành kiểu dữ liệu phù hợp
        const filter = {
            experience_level: experience_level ? Number(experience_level) : undefined,
            target_muscle: target_muscle ? Number(target_muscle) : undefined,
            offset: offset ? Number(offset) : 0,
        };

        try {
            console.log('Received filters:', { experience_level, target_muscle, offset });

            // Lấy danh sách bài tập từ service
            const exercises = await this.exerciseService.getListExercise(filter);
            console.log('Exercises fetched:', exercises);

            // Trả về kết quả với status 200
            return new OK('Exercise list retrieved successfully', exercises).send(res);
        } catch (error) {
            console.error('Error fetching exercises:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
