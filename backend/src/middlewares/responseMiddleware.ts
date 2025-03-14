//  


import { Request, Response, NextFunction } from "express";
import { format } from "date-fns";
import { IBaseResponse } from "../common/interfaces/base-response.interface";

function responseMiddleware(err: any,req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json.bind(res); // Preserve original res.json
    res.json = (data: any) => {
        if (res.headersSent) return;  // Prevent sending response if headers are already sent

        const baseResponse: IBaseResponse = {
            message: (data && data.message) || "success",
            statusCode: res.statusCode || 200,
            path: req.originalUrl,
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

}

export default responseMiddleware;
