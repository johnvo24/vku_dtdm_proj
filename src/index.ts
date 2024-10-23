import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/db.config';
import routes from './routes/index';

// Load environment variables
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

app.use(routes)

// Connect to PostgreSQL using TypeORM
AppDataSource.initialize().then(() => {
  console.log('PostgreSQL connected');
}).catch((error) => console.log('Error connecting to PostgreSQL', error));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
