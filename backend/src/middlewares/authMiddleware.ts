//  backend/src/middlewares/authMiddleware.ts

import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "src/common/exceptions/badRequest.exception";
import { IJwtPayload } from "src/common/interfaces/jwt.payload";
import { UserModel } from "src/models/userModels";
import { verifyJwtToken } from "src/utils/jwt.util";

/**
 * Description:: This middleware is responsible for validating APIs for proper access control
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        // Extract token from Authorization header
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new BadRequestException("Authorization token missing or malformed");
        }
        const accessToken = authorization.split(' ')[1];
        if (!accessToken) {  
            return;  
        }
        // Validate JWT Token
        let payload: IJwtPayload;
        try {
            payload = await verifyJwtToken(accessToken);
        } catch (error) {
            throw new BadRequestException(`Invalid access token: ${error.message}`);
        }

        // Get user information from the database using the payload
        const userRepository = UserModel.getInstance();
        const currentUser = await userRepository.findByEmail(payload.email);
        if (!currentUser) {
            throw new BadRequestException("User not found");
        }

        // Attach user information to request
        req['user'] = currentUser;
        next();
    } catch (error) {
        next(error);
    }
}
