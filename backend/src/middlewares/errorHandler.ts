//  backend/src/middlewares/errorHandler.ts

import { format } from 'date-fns';
import { Request, Response, NextFunction } from 'express';
import { BaseException } from '../common/exceptions/base.exception';
import { ErrorCodes } from '../common/constants/error-codes.enum';

export const errorHandler = (err: Error, req: Request, res: any, next: NextFunction) => {
  const baseErrorRes = {
    success: false,
    path: req.path, 
    timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  };

  if (err instanceof BaseException) {
    return res.status(err.statusCode).json({
      ...baseErrorRes, 
      message: err.message,
      code: err.code,
      details: process.env.NODE_ENV === 'development' ? err.details : null,
    });
  }

  return res.status(500).json({
    ...baseErrorRes,
    message: "Internal Server Error",
    code: ErrorCodes.INTERNAL_ERROR,
  });
};

export default errorHandler;
