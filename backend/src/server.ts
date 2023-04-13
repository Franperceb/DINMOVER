import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import errorHandler from './middleware/error';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db';
import AuthRoutes from './routes/auth';
import UserRoutes from './routes/user';
import PropertyRoutes from './routes/property';
import express, { Request, Response, NextFunction } from 'express';
import config from 'config';


export const app = express();


// Body Parser
app.use(express.json({ limit: '10kb' }));

//cookie Parser
app.use(cookieParser());

//logger
if (process.env.NODE_ENV === 'development')
  app.use(morgan('dev'))

//route connections
app.use('/api/auth', AuthRoutes);
app.use('/api/properties', PropertyRoutes);
app.use('/api/users', UserRoutes);

app.get('/', (_, res) => {
  res.send('api running');
});

//middlewares
app.use(errorHandler);


// UnKnown Routes
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

const PORT = config.get<number>('port');
export const server = app.listen(PORT, () => {
  console.log(`server running on port  ${PORT}`)
  connectDB();
}
);

process.on('unhandledRejection', (err: any) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

