import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'gym_app',
  //synchronize: true,  // Chỉ sử dụng ở môi trường phát triển, tắt ở production
  synchronize: false,  
 // migrations: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  extra: {
    max: 10,           // Số lượng kết nối tối đa trong pool
    idleTimeoutMillis: 30000,  // Thời gian chờ tối đa trước khi một kết nối không hoạt động bị đóng
  },
});
