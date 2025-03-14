//

import { NextFunction, Request, Response } from "express";
import * as chalk from 'chalk';
import logger from "src/common/logger/logger";



const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {method, url, ip} = req;
    const userAgent = req.headers['user-agent'] || 'Unknown agent';

    const startTime = Date.now();
    const formattedDate = new Date().toLocaleString();

    // Log incoming request details
    logger.info(
        `${chalk.green(method)} ${chalk.yellow(url)} - ${chalk.blue('Agent:')} ${chalk.green(userAgent)}`
    );

    // Intercept the response to log after it's sent
    res.on('finish', () => {
        const statusCode = res.statusCode;
        const contentLength = res.get('content-length') || '0';
        const timeTaken = Date.now() - startTime;

        // Log response details after response is sent
        logger.info(
            `${chalk.green(method)} ${chalk.yellow(url)} - ${chalk.blue('Status:')} ${chalk.green(statusCode)} - ${chalk.blue('Content-Length:')} ${chalk.green(contentLength)} - ${chalk.blue('Time Taken:')} ${chalk.green(timeTaken + 'ms')}`
        );
    });

    next(); 
};

export default loggerMiddleware

