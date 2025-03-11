//

import { NextFunction, Request, Response } from "express";
import chalk from 'chalk';



const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {method, url, ip} = req;
    const userAgent = req.headers['user-agent'] || 'Unknown agent';

    const startTime = Date.now();
    const formattedDate = new Date().toLocaleString();

    // Log incoming request details
    console.log(
        `${chalk.green(method)} ${chalk.yellow(url)} - ${chalk.blue('Agent:')} ${chalk.green(userAgent)}`
    );

    // Intercept the response to log after it's sent
    res.on('finish', () => {
        const statusCode = res.statusCode;
        const contentLength = res.get('content-length') || '0';
        const timeTaken = Date.now() - startTime;

        // Log response details after response is sent
        console.log(
            `${chalk.green(method)} ${chalk.yellow(url)} - ${chalk.blue('Status:')} ${chalk.green(statusCode)} - ${chalk.blue('Content-Length:')} ${chalk.green(contentLength)} - ${chalk.blue('Time Taken:')} ${chalk.green(timeTaken + 'ms')}`
        );
    });

    next(); 
};

export default loggerMiddleware

