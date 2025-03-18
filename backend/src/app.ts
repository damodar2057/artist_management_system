//


import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import  helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import db from 'src/db/index'

// Routes
import userRoutes from './routes/userRoutes';
import artistRoutes from './routes/artistRoutes';
import musicRoutes from './routes/musicRoutes';
import authRoutes from './routes/authRoutes';

// Middlewares
import errorHandler from './middlewares/errorHandler';
import loggerMiddleware from './middlewares/loggerMiddleware';
import responseMiddleware from './middlewares/responseMiddleware';

// Config
import appConfig from './config/app.config';
import logger from './common/logger/logger';
import { authMiddleware } from './middlewares/authMiddleware';

// Initialize environment variables
dotenv.config();

async function startServer() {
  try {
    
    const app = express();
    // Trust proxy headers (important when behind a reverse proxy)
    app.set('trust proxy', 1); // 1 means trusting the first proxy
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(cors({ origin: '*' }));
    
    // Rate limiting
    const limiter = rateLimit({
      windowMs: 115 * 60 * 1000, // 15 minutes window
      max: 10000, // 100 requests per windowMs per IP
      message: 'Too many requests, please try again later.',
    });
    app.use(limiter);
    app.use(loggerMiddleware);
    app.use(responseMiddleware);
    
    // Application routes
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/user', authMiddleware, userRoutes);
    app.use('/api/v1/artist',authMiddleware,  artistRoutes);
    app.use('/api/v1/music',authMiddleware, musicRoutes);
    
    app.use(errorHandler);
  
    try {
      await db.initialize()
      app.listen(appConfig.port, () => {
        logger.info(`Server started at port ${appConfig.port}`);
      });
    } catch (error) {
      logger.error(`Database initialization failed: ${error}`);

    }
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();