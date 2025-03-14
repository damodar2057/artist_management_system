//  backend/src/middlewares/errorHandler.ts


import { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from 'src/common/constants/error-codes.enum';
import appConfig from 'src/config/app.config';

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(error); // If headers are already sent, pass to the default error handler
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  // Send a structured error response
  res.status(statusCode).json({
    success: 'false',
    code: error.code || ErrorCodes.INTERNAL_ERROR,
    statusCode,
    message,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    details: appConfig.node_env === 'development' ? error.stack.split('\n').slice(0,2).join(' ') : null
  });
}

export default errorHandler;
