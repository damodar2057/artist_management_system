//  


import { Request, Response, NextFunction } from "express";
import { format } from "date-fns";
import { IBaseResponse } from "../common/interfaces/base-response.interface";



function responseMiddleware(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json.bind(res); // Preserve original res.json

    res.json = (data: any) => {
        const baseResponse: IBaseResponse = {
            message: (data && data.message) || "Success",
            path: req.originalUrl,
            statusCode: res.statusCode || 200,
            timestamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        };

        if (data && typeof data === "object" && "pagination" in data) {
            return originalJson({
                ...baseResponse,
                data: data.data || {},
                pagination: data.pagination,
            });
        } else {
            return originalJson({
                ...baseResponse,
                data,
            });
        }
    };

    next();
}

export default responseMiddleware;
