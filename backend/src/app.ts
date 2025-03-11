//


import * as express from 'express';
import userRoutes from './routes/userRoutes'
import * as dotenv from 'dotenv';
import * as cors from 'cors'
import helmet from 'helmet'
import artistRoutes from './routes/artistRoutes';
import musicRoutes from './routes/musicRoutes';
import authRoutes from './routes/authRoutes';
import errorHandler from './middlewares/errorHandler';
import loggerMiddleware from './middlewares/loggerMiddleware';
import responseMiddleware from './middlewares/responseMiddleware';
import { rateLimit } from 'express-rate-limit'
import appConfig from './config/app.config';

const app = express()
app.use(express.json())

// Initialize environment variables
dotenv.config();

app.use(express.urlencoded({ extended: true })); 

app.use(helmet()); 

app.use(cors({ origin: appConfig.client_origin }));


const limiter = rateLimit({  // in 15 mins window, it will accept 100 request from each IP
   windowMs: 15 * 60 * 1000,
   max: 100,
   message: 'Too many requests, please try again later.',
 });


 app.use(limiter);

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/artist', artistRoutes)
app.use('/api/v1/music', musicRoutes)
app.use('/api/v1/auth', authRoutes)


// Middlewares
app.use(responseMiddleware)
app.use(loggerMiddleware)
app.use(errorHandler)

app.listen(appConfig.port, ()=> {
   console.log(`Server started at ${process.env.PORT}`);
})