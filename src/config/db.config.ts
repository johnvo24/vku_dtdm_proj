import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import {
  DietPlanDetail,
  DietPlan,
  Exercise,
  ExerciseProfile,
  ExerciseDay,
  Food,
  UserWorkoutPlan,
  User,
  WorkoutDay,
  WorkoutPlan,
  WorkoutSummary
} from '../entity';

// Tải các biến môi trường
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',  // Sử dụng PostgreSQL
  host: process.env.DB_HOST || 'dpg-cur7gi9opnds73c51mjg-a',  // Địa chỉ host cơ sở dữ liệu
  port: Number(process.env.DB_PORT) || 5432,  // Cổng kết nối cơ sở dữ liệu
  username: process.env.DB_USERNAME || 'gym_app_dd48_user',  // Tên người dùng
  password: process.env.DB_PASSWORD || 'oDf8rxEXm5XKNPRutLwV3NS94kKt00lY',  // Mật khẩu
  database: process.env.DB_NAME || 'gym_app_dd48',  // Tên cơ sở dữ liệu
  synchronize: false,  // Tắt synchronize trong môi trường sản xuất
  migrations: ['src/migration/**/*.ts'],  // Đường dẫn đến migrations
  logging: false,  // Tắt logging SQL
  entities: [
    DietPlanDetail,
    DietPlan,
    Exercise,
    ExerciseProfile,
    ExerciseDay,
    Food,
    UserWorkoutPlan,
    User,
    WorkoutDay,
    WorkoutPlan,
    WorkoutSummary
  ],
  extra: {
    max: 10,  // Tối đa 10 kết nối trong pool
    idleTimeoutMillis: 30000,  // Thời gian tối đa để đóng kết nối không hoạt động
  },
});
