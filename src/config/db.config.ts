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
  url: process.env.DATABASE_URL || 'postgres://postgres:000000@127.0.0.1:5432/gym_app',
  // host: process.env.DB_HOST || '127.0.0.1',  // Địa chỉ host cơ sở dữ liệu
  // port: Number(process.env.DB_PORT) || 5432,  // Cổng kết nối cơ sở dữ liệu
  // username: process.env.DB_USERNAME || 'postgres',  // Tên người dùng
  // password: process.env.DB_PASSWORD || '000000',  // Mật khẩu
  // database: process.env.DB_NAME || 'gym_app',  // Tên cơ sở dữ liệu
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
  ssl: { 
    // Chạy trên production environment cần có SSL certificate
    rejectUnauthorized: false 
  }
});
