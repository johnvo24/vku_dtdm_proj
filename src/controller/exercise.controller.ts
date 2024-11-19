import { Request, Response, NextFunction } from 'express';
import { ExerciseService } from '../services/exercise/exercise.service';
import { OK } from '../core/success.response';
import { NotFoundError } from '../core/error.response';

class ExerciseController {
    static exerciseService = new ExerciseService();

    // Hàm lấy danh sách bài tập
    static getListExercise = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { experience_level, target_muscle, offset } = req.query;
    
            // Chuyển query params thành kiểu dữ liệu phù hợp
            const filter = {
                experience_level: experience_level ? Number(experience_level) : undefined,
                target_muscle: target_muscle ? Number(target_muscle) : undefined,
                offset: offset ? Number(offset) : 0,
            };
    
            console.log('Received filters:', { experience_level, target_muscle, offset });
    
            // Lấy danh sách bài tập từ service
            const exercises = await this.exerciseService.getListExercise(filter);
            console.log('Exercises fetched:', exercises);
    
            // Trả về kết quả với status 200
            return new OK('Exercise list retrieved successfully', exercises).send(res);
        } catch (error) {
            // Chuyển lỗi tới middleware xử lý lỗi
            next(error);
        }
    };

    static getExercise = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { exercise_id } = req.query;
    
            // Lấy danh sách bài tập từ service
            const exercises = await this.exerciseService.getExerciseDetail(Number(exercise_id));
            console.log('Exercises fetched: '+ exercise_id + "|", exercises);
    
            // Trả về kết quả với status 200
            return new OK('Exercise list retrieved successfully', exercises).send(res);
        } catch (error) {
            // Chuyển lỗi tới middleware xử lý lỗi
            next(error);
        }
    };
    
}

export default ExerciseController;
