import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/db.config';
import routes from './routes/index';
import cors from 'cors';
import {errorHandler} from './middleware/error_app.middleware';
// Load environment variables
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;


// Configure CORS
const corsOptions = {
  origin: '*', // Allow all origins (you can change this to a specific domain if needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Define allowed headers
};
app.use(cors(corsOptions));

// Middleware for JSON request body parsing
app.use(express.json());

app.use(routes)



// Connect to PostgreSQL using TypeORM
AppDataSource.initialize()
  .then(() => {
    console.log('PostgreSQL connected');
  })
  .catch((error) => {
    console.error('Error connecting to PostgreSQL', error);
  });

// Middleware xử lý lỗi
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
