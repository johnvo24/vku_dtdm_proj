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
  host: process.env.DB_HOST || 'localhost',  // Địa chỉ host cơ sở dữ liệu
  port: Number(process.env.DB_PORT) || 5432,  // Cổng kết nối cơ sở dữ liệu
  username: process.env.DB_USERNAME || 'admin',  // Tên người dùng
  password: process.env.DB_PASSWORD || '1234',  // Mật khẩu
  database: process.env.DB_NAME || 'gym_app',  // Tên cơ sở dữ liệu
  synchronize: true,  // Tắt synchronize trong môi trường sản xuất
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
